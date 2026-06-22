package com.example.Product_Catalog_Management.dto.response;

import com.example.Product_Catalog_Management.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateUserProfileResponse {
    private UUID id;
    private String fullName;
    private String address;
    private LocalDate birthDate;
    private Gender gender;
}
