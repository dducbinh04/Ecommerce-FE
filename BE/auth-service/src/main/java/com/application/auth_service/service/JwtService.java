package com.application.auth_service.service;

import com.application.auth_service.enums.Role;
import com.application.auth_service.payload.TokenPayload;

import java.util.Date;

public interface JwtService {
    String generateAccessToken(TokenPayload payload);
    String generateRefreshToken(TokenPayload payload);
    String extractUserId(String token);
    String extractJti(String token);
    Date extractExpr(String token);
    Role extractRole(String token);
    boolean isTokenValid(String token);
}
