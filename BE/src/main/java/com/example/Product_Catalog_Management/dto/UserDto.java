package com.example.Product_Catalog_Management.dto;

import com.example.Product_Catalog_Management.enums.Gender;
import com.example.Product_Catalog_Management.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
    private UUID id;
    private String email;
    private String fullName;
    private String address;
    private LocalDate birthDate;
    private Gender gender;
    private Role role;
}
