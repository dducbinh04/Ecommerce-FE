package com.application.user_service.controller;

import com.application.user_service.dto.ProfileDto;
import com.application.user_service.dto.request.GetProfilesRequest;
import com.application.user_service.dto.request.UpdateProfileRequest;
import com.application.user_service.dto.response.GetProfileResponse;
import com.application.user_service.dto.response.UpdateProfileResponse;
import com.application.user_service.security.CustomUserDetails;
import com.application.user_service.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import static com.application.user_service.constant.ApiPath.USERS;

@RestController
@RequestMapping(USERS)
@RequiredArgsConstructor
public class UserController {

    private final ProfileService profileService;

    @GetMapping("/me")
    public ResponseEntity<GetProfileResponse> getMyProfile(
        @AuthenticationPrincipal CustomUserDetails user
    ) {
        var response = profileService.getUserProfile(user.id());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    public ResponseEntity<UpdateProfileResponse> updateProfile(
        @AuthenticationPrincipal CustomUserDetails user,
        @Valid @RequestBody UpdateProfileRequest request
    ) {
        var response = profileService.updateProfile(user.id(), request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GetProfileResponse> getUserProfile(
        @PathVariable UUID userId
    ) {
        var response = profileService.getUserProfile(userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/profiles")
    public ResponseEntity<List<ProfileDto>> getUserProfiles(
        @RequestBody GetProfilesRequest request
    ) {
        var response = profileService.getUserProfiles(request);
        return ResponseEntity.ok(response);
    }
}
