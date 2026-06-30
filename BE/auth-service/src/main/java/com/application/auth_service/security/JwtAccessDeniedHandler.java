package com.application.auth_service.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAccessDeniedHandler
    implements AccessDeniedHandler {

    @Override
    public void handle(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull AccessDeniedException ex
    ) throws IOException {

        String origin = request.getHeader("Origin");
        if (origin != null) {
            response.setHeader("Access-Control-Allow-Origin", origin);
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "*");
        }

        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("application/json");

        response.getWriter().write("""
            {
                "status": 403,
                "message": "Access denied"
            }
            """);
    }
}