package com.example.Product_Catalog_Management.service.imp;

import com.example.Product_Catalog_Management.dto.request.AuthRequest;
import com.example.Product_Catalog_Management.dto.request.UpdateUserProfileRequest;
import com.example.Product_Catalog_Management.dto.response.GetUserProfileResponse;
import com.example.Product_Catalog_Management.dto.response.UpdateUserProfileResponse;
import com.example.Product_Catalog_Management.entity.User;
import com.example.Product_Catalog_Management.exception.ConflictException;
import com.example.Product_Catalog_Management.exception.ResourceNotFoundException;
import com.example.Product_Catalog_Management.mapper.UserMapper;
import com.example.Product_Catalog_Management.repository.UserRepository;
import com.example.Product_Catalog_Management.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional
    @Override
    public User createUser(AuthRequest req, String encodedPassword) {
        if (existsUser(req.getEmail()))
            throw new ConflictException("Email already exists");

        User user = userMapper.toEntity(req);
        user.setEncryptedPassword(encodedPassword);

        userRepository.save(user);

        return user;
    }

    @Transactional
    @Override
    public UpdateUserProfileResponse updateProfile(UUID userId, UpdateUserProfileRequest req) {
        var user = getUserById(userId);
        userMapper.updateUserFromDto(req, user);

        return userMapper.toUpdateResponse(user);
    }

    @Override
    public GetUserProfileResponse getUserProfile(UUID userId) {
        var user = getUserById(userId);
        return userMapper.toProfileResponse(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public boolean existsUser(String email) {
        return userRepository.existsByEmail(email);
    }

    private User getUserById(UUID id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

}
