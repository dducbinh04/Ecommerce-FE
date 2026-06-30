package com.application.auth_service.controller;

import com.application.auth_service.dto.request.AuthRequest;
import com.application.auth_service.dto.request.AutoAuthRequest;
import com.application.auth_service.dto.request.LogoutRequest;
import com.application.auth_service.dto.request.RefreshRequest;
import com.application.auth_service.dto.response.AuthResponse;
import com.application.auth_service.dto.response.TokenResponse;
import com.application.auth_service.helper.AuthHelper;
import com.application.auth_service.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static com.application.auth_service.constant.ApiPath.AUTH;

@RestController
@RequestMapping(AUTH)
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthHelper authHelper;

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refreshToken(
        @Valid @RequestBody RefreshRequest request
    ) {
        var response = authService.refreshToken(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(
        @Valid @RequestBody AuthRequest request
    ) {
        var response = authService.signUp(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(
        @Valid @RequestBody AuthRequest request
    ) {
        var response = authService.signIn(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/auto-signin")
    public ResponseEntity<AuthResponse> autoSignIn(
        @Valid @RequestBody AutoAuthRequest request
    ) {
        var response = authService.autoSignIn(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signout")
    public ResponseEntity<Void> signOut(
        @RequestHeader(value = HttpHeaders.AUTHORIZATION) String authHeader,
        @Valid @RequestBody LogoutRequest request
    ) {
        var accessToken = authHelper.extractAccessToken(authHeader);
        authService.signOut(accessToken, request);

        return ResponseEntity.noContent().build();
    }

}
