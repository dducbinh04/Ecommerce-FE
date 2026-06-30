package com.application.auth_service.service.imp;


import com.application.auth_service.dto.request.AuthRequest;
import com.application.auth_service.dto.request.AutoAuthRequest;
import com.application.auth_service.dto.request.LogoutRequest;
import com.application.auth_service.dto.request.RefreshRequest;
import com.application.auth_service.dto.response.AuthResponse;
import com.application.auth_service.dto.response.TokenResponse;
import com.application.auth_service.enums.Role;
import com.application.auth_service.exception.BadRequestException;
import com.application.auth_service.helper.AuthHelper;
import com.application.auth_service.payload.CacheRefreshPayload;
import com.application.auth_service.payload.TokenPayload;
import com.application.auth_service.security.CustomUserDetails;
import com.application.auth_service.service.AuthService;
import com.application.auth_service.service.JwtService;
import com.application.auth_service.service.RedisService;
import com.application.auth_service.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;
import static com.application.auth_service.enums.TokenType.ACCESS;
import static com.application.auth_service.enums.TokenType.REFRESH;

@Service
@RequiredArgsConstructor
public class AuthServiceImp implements AuthService {

    private final JwtService jwtService;
    private final RedisService redisService;
    private final UserService userService;
    private final AuthHelper authHelper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Transactional
    @Override
    public AuthResponse signUp(AuthRequest req) {
        var hashedPassword = passwordEncoder.encode(req.getPassword());
        var newUser = userService.createUser(req, hashedPassword);

        return generateAuthResponse(
            newUser.getId(),
            req.getRole(),
            true
        );
    }

    @Transactional
    @Override
    public AuthResponse signIn(AuthRequest req) {
        Authentication auth = authenticate(req.getEmail(), req.getPassword());

        if (!(auth.getPrincipal() instanceof CustomUserDetails principal)) {
            throw new IllegalStateException("Authentication failed");
        }

        return generateAuthResponse(
            principal.getId(),
            principal.getRole(),
            false
        );
    }

    @Transactional
    @Override
    public AuthResponse autoSignIn(AutoAuthRequest req) {
        var refreshToken = req.getRefreshToken();

        if (!jwtService.isTokenValid(refreshToken))
            throw new BadCredentialsException("Invalid Refresh Token");

        var jti = jwtService.extractJti(refreshToken);
        var key = "refresh:" + jti;

        var payload = redisService.get(key, CacheRefreshPayload.class);
        if (payload == null)
            throw new BadRequestException("Invalid Refresh Token");

        redisService.delete(key);

        return generateAuthResponse(
            payload.getSub(),
            payload.getRole(),
            false
        );
    }

    @Transactional
    @Override
    public void signOut(String accessToken, LogoutRequest request) {
        var refreshToken = request.getRefreshToken();
        var refreshJti = jwtService.extractJti(refreshToken);
        var key = "refresh:" + refreshJti;

        var payload = redisService.get(key, CacheRefreshPayload.class);
        if (payload ==  null)
            throw new BadRequestException("Invalid Refresh Token");

        redisService.delete(key);

        var accessJti = jwtService.extractJti(accessToken);
        var accessExpr = jwtService.extractExpr(accessToken).getTime();

        var role = jwtService.extractRole(accessToken);
        var ttl = accessExpr - System.currentTimeMillis();

        var blacklistKey = "blacklist:" + accessJti;
        var blackListPayload = authHelper.generateBlackListPayload(
            payload.getSub(),
            accessJti,
            role
        );

        redisService.set(blacklistKey, blackListPayload, ttl);
    }

    @Transactional
    @Override
    public TokenResponse refreshToken(RefreshRequest request) {
        var refreshToken = request.getRefreshToken();

        if (!jwtService.isTokenValid(refreshToken)) {
            throw new BadCredentialsException("Invalid Refresh Token");
        }

        var jti = jwtService.extractJti(refreshToken);
        var key = "refresh:" + jti;
        var payload = redisService.get(key, CacheRefreshPayload.class);

        if (payload == null)
            throw new BadRequestException("Invalid Refresh Token");

        redisService.delete(key);

        var accessPayload = authHelper.generateTokenPayload(payload, ACCESS);
        var refreshPayload = authHelper.generateTokenPayload(payload, REFRESH);

        var newAccessToken = jwtService.generateAccessToken(accessPayload);
        var newRefreshToken = jwtService.generateRefreshToken(refreshPayload);

        cacheToken(newRefreshToken, refreshPayload);

        return new TokenResponse(newAccessToken, newRefreshToken);
    }

    private Authentication authenticate(String email, String password) {
        return authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );
    }

    private CacheRefreshPayload generateCacheRefreshPayload(
        UUID sub,
        Role role
    ) {
        var payload = new CacheRefreshPayload();
        payload.setSub(sub);
        payload.setRole(role);
        return payload;
    }

    private void cacheToken(String refreshToken, TokenPayload payload) {
        var jti = jwtService.extractJti(refreshToken);
        var key = "refresh:" + jti;
        var cachePayload = generateCacheRefreshPayload(
            payload.getSub(),
            payload.getRole()
        );
        redisService.set(key, cachePayload, 7 * 60 * 60 * 24);
    }

    private AuthResponse generateAuthResponse(
        UUID userId,
        Role role,
        boolean isNewUser
    ) {
        var accessPayload = authHelper.generateTokenPayload(userId, role, ACCESS);
        var refreshPayload = authHelper.generateTokenPayload(userId, role, REFRESH);
        var accessToken = jwtService.generateAccessToken(accessPayload);
        var refreshToken = jwtService.generateRefreshToken(refreshPayload);
        cacheToken(refreshToken, refreshPayload);
        return new AuthResponse(accessToken, refreshToken, role, isNewUser);
    }

}
