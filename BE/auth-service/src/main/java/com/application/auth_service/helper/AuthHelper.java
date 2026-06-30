package com.application.auth_service.helper;

import com.application.auth_service.enums.Role;
import com.application.auth_service.enums.TokenType;
import com.application.auth_service.exception.BadRequestException;
import com.application.auth_service.payload.BlackListPayload;
import com.application.auth_service.payload.CacheRefreshPayload;
import com.application.auth_service.payload.TokenPayload;
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
