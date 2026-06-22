package com.example.Product_Catalog_Management.helper;

import com.example.Product_Catalog_Management.enums.Role;
import com.example.Product_Catalog_Management.enums.TokenType;
import com.example.Product_Catalog_Management.exception.BadRequestException;
import com.example.Product_Catalog_Management.payload.BlackListPayload;
import com.example.Product_Catalog_Management.payload.CacheRefreshPayload;
import com.example.Product_Catalog_Management.payload.TokenPayload;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class AuthHelper {

    public String extractAccessToken(String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            throw new BadRequestException("Missing access token");
        }

        return header.substring(7);
    }

    public BlackListPayload generateBlackListPayload(UUID sub, String jti, Role role) {
        return new BlackListPayload(sub, jti, role);
    }

    public TokenPayload generateTokenPayload(
        CacheRefreshPayload payload,
        TokenType type
    ) {
        return new TokenPayload(
            payload.getSub(),
            payload.getRole(),
            type
        );
    }

    public TokenPayload generateTokenPayload(
        UUID userId,
        Role role,
        TokenType type
    ) {
        return new TokenPayload(userId, role, type);
    }
}
