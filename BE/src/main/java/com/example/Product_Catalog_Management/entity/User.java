package com.example.Product_Catalog_Management.entity;

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
@Table(name = "users")
@Entity
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true)
    private String email;

    private String encryptedPassword;
    private String fullName;
    private String address;
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private Role role;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @LastModifiedDate
    private OffsetDateTime updatedAt = OffsetDateTime.now();
}
