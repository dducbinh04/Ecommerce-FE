package com.application.auth_service.service;

import com.application.auth_service.dto.request.AuthRequest;
import com.application.auth_service.dto.request.AutoAuthRequest;
import com.application.auth_service.dto.request.LogoutRequest;
import com.application.auth_service.dto.request.RefreshRequest;
import com.application.auth_service.dto.response.AuthResponse;
import com.application.auth_service.dto.response.TokenResponse;

public interface AuthService {
    AuthResponse signUp(AuthRequest req);
    AuthResponse signIn(AuthRequest req);
    AuthResponse autoSignIn(AutoAuthRequest req);
    void signOut(String accessToken, LogoutRequest request);
    TokenResponse refreshToken(RefreshRequest request);
}
