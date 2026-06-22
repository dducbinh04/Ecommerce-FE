package com.example.Product_Catalog_Management.dto.response;

import com.example.Product_Catalog_Management.enums.Gender;
import com.example.Product_Catalog_Management.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetUserProfileResponse {
    private UUID id;
    private String email;
    private String fullName;
    private String address;
    private LocalDate birthDate;
    private Gender gender;
    private Role role;
}
