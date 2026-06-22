package com.example.Product_Catalog_Management.service;

import com.example.Product_Catalog_Management.dto.request.AuthRequest;
import com.example.Product_Catalog_Management.dto.request.AutoAuthRequest;
import com.example.Product_Catalog_Management.dto.request.LogoutRequest;
import com.example.Product_Catalog_Management.dto.request.RefreshRequest;
import com.example.Product_Catalog_Management.dto.response.AuthResponse;
import com.example.Product_Catalog_Management.dto.response.TokenResponse;
import com.example.Product_Catalog_Management.dto.response.VerificationResponse;

public interface AuthService {
    AuthResponse signUp(AuthRequest req);
    AuthResponse signIn(AuthRequest req);
    AuthResponse autoSignIn(AutoAuthRequest req);
    void signOut(String accessToken, LogoutRequest request);
    TokenResponse refreshToken(RefreshRequest request);
}
