package com.application.auth_service.service;

import com.application.auth_service.dto.request.AuthRequest;
import com.application.auth_service.entity.User;

import java.util.UUID;

public interface UserService {
    User createUser(AuthRequest req, String encodedPassword);
    User getUserByEmail(String email);
    User getUserById(UUID id);
    boolean existsUser(String email);
}
