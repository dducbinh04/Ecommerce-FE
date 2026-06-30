package com.application.auth_service.payload;

import com.application.auth_service.enums.Role;
import com.application.auth_service.enums.TokenType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TokenPayload {
    private UUID sub;
    private Role role;
    private TokenType type;
}
