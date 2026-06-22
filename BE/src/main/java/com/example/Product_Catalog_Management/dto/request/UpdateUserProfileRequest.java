package com.example.Product_Catalog_Management.dto.request;

import com.example.Product_Catalog_Management.enums.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateUserProfileRequest {

    @NotBlank(message = "Full name must not be blank")
    @Size(min = 2, max = 100, message = "Full name must be 2-100 characters")
    private String fullName;

    @Size(max = 255, message = "Address must not exceed 255 characters")
    private String address;

    @Past(message = "Birth date must be in the past")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate birthDate;

    @NotNull(message = "Gender is required")
    private Gender gender;
}
