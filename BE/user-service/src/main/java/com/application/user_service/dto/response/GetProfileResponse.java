package com.application.user_service.dto.response;

import com.application.user_service.dto.model.Image;
import com.application.user_service.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetProfileResponse {
    private UUID id;
    private String fullName;
    private Image avatar;
    private String address;
    private LocalDate birthDate;
    private Gender gender;
}
