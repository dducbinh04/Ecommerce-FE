package com.example.Product_Catalog_Management.dto.response;

import com.example.Product_Catalog_Management.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VerificationResponse {
    private UUID userId;
    private Role role;
}
