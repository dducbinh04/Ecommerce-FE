package com.application.auth_service.service.imp;

import com.application.auth_service.dto.request.AuthRequest;
import com.application.auth_service.entity.User;
import com.application.auth_service.exception.ConflictException;
import com.application.auth_service.exception.ResourceNotFoundException;
import com.application.auth_service.mapper.UserMapper;
import com.application.auth_service.repository.UserRepository;
import com.application.auth_service.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ApplicationEventPublisher publisher;

    @Transactional
    @Override
    public User createUser(AuthRequest req, String encodedPassword) {
        if (existsUser(req.getEmail()))
            throw new ConflictException("Email already exists");

        var user = userMapper.toEntity(req);
        user.setHashedPassword(encodedPassword);

        userRepository.save(user);

        var signUpMsg = userMapper.toSignUpMsg(user);
        publisher.publishEvent(signUpMsg);

        return user;
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

    @Override
    public User getUserById(UUID id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

}
