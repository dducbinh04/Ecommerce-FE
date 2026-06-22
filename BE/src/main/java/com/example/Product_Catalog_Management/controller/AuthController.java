package com.example.Product_Catalog_Management.controller;

import com.example.Product_Catalog_Management.dto.request.AuthRequest;
import com.example.Product_Catalog_Management.dto.request.AutoAuthRequest;
import com.example.Product_Catalog_Management.dto.request.LogoutRequest;
import com.example.Product_Catalog_Management.dto.request.RefreshRequest;
import com.example.Product_Catalog_Management.dto.response.AuthResponse;
import com.example.Product_Catalog_Management.dto.response.TokenResponse;
import com.example.Product_Catalog_Management.helper.AuthHelper;
import com.example.Product_Catalog_Management.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.example.Product_Catalog_Management.constant.ApiPath.AUTH;

@RestController
@RequestMapping(AUTH)
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
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
