package com.application.user_service.entity;

import com.application.user_service.dto.model.Image;
import com.application.user_service.enums.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "profiles")
@Entity
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID userId;
    private String fullName;

    @Embedded
    private Image avatar;

    private String address;
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    private Gender gender;
}
