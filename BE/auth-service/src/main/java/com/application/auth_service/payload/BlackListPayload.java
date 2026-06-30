package com.application.auth_service.payload;

import com.application.auth_service.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BlackListPayload {
    private UUID sub;
    private String jti;
    private Role role;
}
