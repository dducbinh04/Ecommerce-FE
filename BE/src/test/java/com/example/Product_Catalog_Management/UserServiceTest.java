package com.example.Product_Catalog_Management;

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
import com.example.Product_Catalog_Management.service.imp.UserServiceImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserServiceImp Tests")
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserServiceImp userService;

    // ───── Shared data ─────
    private UUID userId;
    private User mockUser;
    private AuthRequest authRequest;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();

        mockUser = new User();
        mockUser.setId(userId);

        authRequest = new AuthRequest();
        authRequest.setEmail("test@example.com");
        authRequest.setPassword("rawPassword");
    }

    // ═══════════════════════════════════════════
    //  createUser
    // ═══════════════════════════════════════════
    @Nested
    @DisplayName("createUser()")
    class CreateUser {

        @Test
        @DisplayName("Create new user when email not exists")
        void createUser_Success() {
            // Arrange
            when(userRepository.existsByEmail(authRequest.getEmail())).thenReturn(false);
            when(userMapper.toEntity(authRequest)).thenReturn(mockUser);

            // Act
            User result = userService.createUser(authRequest, "encodedPassword");

            // Assert
            assertThat(result).isNotNull();
            assertThat(result.getEncryptedPassword()).isEqualTo("encodedPassword");

            verify(userRepository).existsByEmail(authRequest.getEmail());
            verify(userMapper).toEntity(authRequest);
            verify(userRepository).save(mockUser);
        }

        @Test
        @DisplayName("Throw ConflictException when email exists")
        void createUser_EmailAlreadyExists_ThrowConflictException() {
            // Arrange
            when(userRepository.existsByEmail(authRequest.getEmail())).thenReturn(true);

            // Act & Assert
            assertThatThrownBy(() -> userService.createUser(authRequest, "encodedPassword"))
                .isInstanceOf(ConflictException.class)
                .hasMessage("Email already exists");

            // Đảm bảo KHÔNG gọi mapper hay save
            verify(userMapper, never()).toEntity(any());
            verify(userRepository, never()).save(any());
        }
    }

    // ═══════════════════════════════════════════
    //  updateProfile
    // ═══════════════════════════════════════════
    @Nested
    @DisplayName("updateProfile()")
    class UpdateProfile {

        @Test
        @DisplayName("Update profile successfully")
        void updateProfile_Success() {
            // Arrange
            UpdateUserProfileRequest req = new UpdateUserProfileRequest();
            UpdateUserProfileResponse expectedResponse = new UpdateUserProfileResponse();

            when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));
            doNothing().when(userMapper).updateUserFromDto(req, mockUser);
            when(userMapper.toUpdateResponse(mockUser)).thenReturn(expectedResponse);

            // Act
            UpdateUserProfileResponse result = userService.updateProfile(userId, req);

            // Assert
            assertThat(result).isEqualTo(expectedResponse);

            verify(userRepository).findById(userId);
            verify(userMapper).updateUserFromDto(req, mockUser);
            verify(userMapper).toUpdateResponse(mockUser);
        }

        @Test
        @DisplayName("Throw ResourceNotFoundException when userId not exists")
        void updateProfile_UserNotFound_ThrowException() {
            // Arrange
            when(userRepository.findById(userId)).thenReturn(Optional.empty());

            // Act & Assert
            assertThatThrownBy(() -> userService.updateProfile(userId, new UpdateUserProfileRequest()))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("User not found");

            verify(userMapper, never()).updateUserFromDto(any(), any());
        }
    }

    // ═══════════════════════════════════════════
    //  getUserProfile
    // ═══════════════════════════════════════════
    @Nested
    @DisplayName("getUserProfile()")
    class GetUserProfile {

        @Test
        @DisplayName("Get profile successfully")
        void getUserProfile_Success() {
            // Arrange
            GetUserProfileResponse expectedResponse = new GetUserProfileResponse();

            when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));
            when(userMapper.toProfileResponse(mockUser)).thenReturn(expectedResponse);

            // Act
            GetUserProfileResponse result = userService.getUserProfile(userId);

            // Assert
            assertThat(result).isEqualTo(expectedResponse);
            verify(userRepository).findById(userId);
            verify(userMapper).toProfileResponse(mockUser);
        }

        @Test
        @DisplayName("Throw ResourceNotFoundException when userId not exists")
        void getUserProfile_UserNotFound_ThrowException() {
            // Arrange
            when(userRepository.findById(userId)).thenReturn(Optional.empty());

            // Act & Assert
            assertThatThrownBy(() -> userService.getUserProfile(userId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("User not found");

            verify(userMapper, never()).toProfileResponse(any());
        }
    }

    // ═══════════════════════════════════════════
    //  getUserByEmail
    // ═══════════════════════════════════════════
    @Nested
    @DisplayName("getUserByEmail()")
    class GetUserByEmail {

        @Test
        @DisplayName("Found user by email successfully")
        void getUserByEmail_Found() {
            // Arrange
            when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(mockUser));

            // Act
            User result = userService.getUserByEmail("test@example.com");

            // Assert
            assertThat(result).isNotNull().isEqualTo(mockUser);
            verify(userRepository).findByEmail("test@example.com");
        }

        @Test
        @DisplayName("Throw ResourceNotFoundException when email not exists")
        void getUserByEmail_NotFound_ThrowException() {
            // Arrange
            when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

            // Act & Assert
            assertThatThrownBy(() -> userService.getUserByEmail("notfound@example.com"))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("User not found");
        }
    }

    // ═══════════════════════════════════════════
    //  existsUser
    // ═══════════════════════════════════════════
    @Nested
    @DisplayName("existsUser()")
    class ExistsUser {

        @Test
        @DisplayName("Return true when email exists")
        void existsUser_ReturnsTrue() {
            when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

            assertThat(userService.existsUser("test@example.com")).isTrue();
        }

        @Test
        @DisplayName("Return false if email not exists")
        void existsUser_ReturnsFalse() {
            when(userRepository.existsByEmail("new@example.com")).thenReturn(false);

            assertThat(userService.existsUser("new@example.com")).isFalse();
        }
    }

    // ═══════════════════════════════════════════
    //  getUserById
    // ═══════════════════════════════════════════
    @Nested
    @DisplayName("getUserById()")
    class GetUserById {

        @Test
        @DisplayName("Found user by id")
        void getUserById_Found() {
            // Arrange
            when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

            // Act
            User result = userService.getUserById(userId);

            // Assert
            assertThat(result).isNotNull().isEqualTo(mockUser);
            verify(userRepository).findById(userId);
        }

        @Test
        @DisplayName("Throw ResourceNotFoundException when id not exists")
        void getUserById_NotFound_ThrowException() {
            // Arrange
            when(userRepository.findById(userId)).thenReturn(Optional.empty());

            // Act & Assert
            assertThatThrownBy(() -> userService.getUserById(userId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("User not found");
        }
    }
}