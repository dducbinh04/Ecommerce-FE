package com.example.Product_Catalog_Management.controller;

import com.example.Product_Catalog_Management.dto.request.UpdateUserProfileRequest;
import com.example.Product_Catalog_Management.dto.response.GetUserProfileResponse;
import com.example.Product_Catalog_Management.dto.response.UpdateUserProfileResponse;
import com.example.Product_Catalog_Management.helper.AuthHelper;
import com.example.Product_Catalog_Management.security.CustomUserDetails;
import com.example.Product_Catalog_Management.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.example.Product_Catalog_Management.constant.ApiPath.USERS;

@RestController
@RequestMapping(USERS)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<GetUserProfileResponse> getMyProfile(
        @AuthenticationPrincipal CustomUserDetails user
    ) {
        var response = userService.getUserProfile(user.getId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    public ResponseEntity<UpdateUserProfileResponse> updateProfile(
        @AuthenticationPrincipal CustomUserDetails user,
        @Valid @RequestBody UpdateUserProfileRequest request
    ) {
        var response = userService.updateProfile(user.getId(), request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GetUserProfileResponse> getUserProfile(
        @PathVariable UUID userId
    ) {
        var response = userService.getUserProfile(userId);
        return ResponseEntity.ok(response);
    }
}
