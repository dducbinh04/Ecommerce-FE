package com.example.Product_Catalog_Management.service;

import com.example.Product_Catalog_Management.enums.Role;
import com.example.Product_Catalog_Management.payload.TokenPayload;

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
