package com.example.Product_Catalog_Management.service;

import com.example.Product_Catalog_Management.dto.request.AuthRequest;
import com.example.Product_Catalog_Management.dto.request.UpdateUserProfileRequest;
import com.example.Product_Catalog_Management.dto.response.GetUserProfileResponse;
import com.example.Product_Catalog_Management.dto.response.UpdateUserProfileResponse;
import com.example.Product_Catalog_Management.entity.User;

import java.util.UUID;

public interface UserService {
    User createUser(AuthRequest req, String encodedPassword);
    UpdateUserProfileResponse updateProfile(UUID userId, UpdateUserProfileRequest req);
    GetUserProfileResponse getUserProfile(UUID userId);
    User getUserByEmail(String email);
    boolean existsUser(String email);
}
