package com.example.Product_Catalog_Management.dto.response;

import com.example.Product_Catalog_Management.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private Role role;
    private Boolean isNewUser;
}
