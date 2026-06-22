package com.example.Product_Catalog_Management.payload;

import com.example.Product_Catalog_Management.enums.Role;
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
