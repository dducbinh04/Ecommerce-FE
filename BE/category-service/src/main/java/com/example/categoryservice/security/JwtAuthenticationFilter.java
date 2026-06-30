package com.example.categoryservice.security;

import com.example.categoryservice.enums.Role;
import com.example.categoryservice.service.JwtService;
import com.example.categoryservice.service.RedisService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final RedisService redisService;
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userId;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);

        if (!jwtService.isTokenValid(jwt)) {
            filterChain.doFilter(request, response);
            return;
        }

        if (isBlackListed(jwt)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            userId = jwtService.extractUserId(jwt);

            if (userId == null)
                throw new BadCredentialsException("Invalid token");

            Role role = jwtService.extractRole(jwt);
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));

            UserDetails userDetails = new CustomUserDetails(UUID.fromString(userId), role);

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                authorities
            );

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);

        } catch (JwtException exception) {
            SecurityContextHolder.clearContext();

            authenticationEntryPoint.commence(
                request,
                response,
                new BadCredentialsException(
                    "Invalid token",
                    exception
                )
            );

            log.warn("JWT validation failed: {}", exception.getMessage());

            return;
        }

        filterChain.doFilter(request, response);
    }

    private boolean isBlackListed(String token) {
        try {
            var jti = jwtService.extractJti(token);
            var key = "blacklist:" + jti;
            return redisService.exists(key);
        } catch (Exception e) {
            log.warn("Redis unavailable, skip blacklist check: {}", e.getMessage());
            return false;
        }
    }
}