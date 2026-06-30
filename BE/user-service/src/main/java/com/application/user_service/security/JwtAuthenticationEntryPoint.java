package com.application.user_service.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint
    implements AuthenticationEntryPoint {

    @Override
    public void commence(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull AuthenticationException ex
    ) throws IOException {

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");

        response.getWriter().write("""
            {
                "status": 401,
                "message": "Unauthorized"
            }
            """);
    }
}