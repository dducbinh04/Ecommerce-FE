package com.example.Product_Catalog_Management.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LogoutRequest {
    @NotBlank(message = "Refresh token is required")
    private String refreshToken;
}
