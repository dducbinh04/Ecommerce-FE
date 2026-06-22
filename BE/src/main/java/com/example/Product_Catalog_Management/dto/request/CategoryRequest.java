package com.example.Product_Catalog_Management.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequest {
    @NotBlank(message = "Refresh token is required")
    private String name;
}