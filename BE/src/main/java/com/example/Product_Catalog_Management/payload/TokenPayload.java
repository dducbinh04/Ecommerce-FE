package com.example.Product_Catalog_Management.payload;

import com.example.Product_Catalog_Management.enums.Role;
import com.example.Product_Catalog_Management.enums.TokenType;
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
