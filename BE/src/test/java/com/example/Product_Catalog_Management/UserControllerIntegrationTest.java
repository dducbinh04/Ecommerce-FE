package com.example.Product_Catalog_Management;

import com.example.Product_Catalog_Management.config.SecurityConfig;
import com.example.Product_Catalog_Management.controller.UserController;
import com.example.Product_Catalog_Management.dto.request.UpdateUserProfileRequest;
import com.example.Product_Catalog_Management.dto.response.GetUserProfileResponse;
import com.example.Product_Catalog_Management.dto.response.UpdateUserProfileResponse;
import com.example.Product_Catalog_Management.enums.Gender;
import com.example.Product_Catalog_Management.enums.Role;
import com.example.Product_Catalog_Management.exception.ResourceNotFoundException;
import com.example.Product_Catalog_Management.security.CustomUserDetails;
import com.example.Product_Catalog_Management.security.JwtAuthenticationFilter;
import com.example.Product_Catalog_Management.service.JwtService;
import com.example.Product_Catalog_Management.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.resttestclient.autoconfigure.AutoConfigureRestTestClient;
import org.springframework.boot.security.autoconfigure.SecurityAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.UUID;

import static com.example.Product_Catalog_Management.constant.ApiPath.USERS;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DisplayName("UserController Integration Tests")
class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    private ObjectMapper objectMapper;

    private UUID userId;
    private CustomUserDetails userPrincipal;
    private CustomUserDetails adminPrincipal;

    private GetUserProfileResponse profileResponse;
    private UpdateUserProfileResponse updateResponse;
    private UpdateUserProfileRequest updateRequest;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        userId = UUID.randomUUID();

        userPrincipal = new CustomUserDetails(
            userId,
            "user@example.com",
            "encodedPass",
            Role.CUSTOMER
        );

        adminPrincipal = new CustomUserDetails(
            UUID.randomUUID(),
            "admin@example.com",
            "encodedPass",
            Role.ADMIN
        );

        profileResponse = new GetUserProfileResponse(
            userId,
            "user@example.com",
            "Nguyen Van A",
            "123 Le Loi, Q1",
            LocalDate.of(2000, 1, 15),
            Gender.MALE,
            Role.CUSTOMER
        );

        updateRequest = new UpdateUserProfileRequest(
            "Nguyen Van A",
            "123 Le Loi, Q1",
            LocalDate.of(2000, 1, 15),
            Gender.MALE
        );

        updateResponse = new UpdateUserProfileResponse(
            userId,
            "Nguyen Van A",
            "123 Le Loi, Q1",
            LocalDate.of(2000, 1, 15),
            Gender.MALE
        );
    }

    // ===================================================
    // GET /api/v1/users/me
    // ===================================================
    @Nested
    @DisplayName("GET /api/v1/users/me")
    class GetMyProfile {

        @Test
        @DisplayName("200 - Returns profile when authenticated")
        void getMyProfile_Authenticated_Returns200() throws Exception {
            when(userService.getUserProfile(userId)).thenReturn(profileResponse);

            mockMvc.perform(get(USERS + "/me")
                    .with(user(userPrincipal)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(userId.toString()))
                .andExpect(jsonPath("$.email").value("user@example.com"))
                .andExpect(jsonPath("$.fullName").value("Nguyen Van A"))
                .andExpect(jsonPath("$.gender").value("MALE"))
                .andExpect(jsonPath("$.role").value("CUSTOMER"));

            verify(userService).getUserProfile(userId);
        }

        @Test
        @DisplayName("401 - Returns unauthorized when not authenticated")
        void getMyProfile_Unauthenticated_Returns401() throws Exception {
            mockMvc.perform(get(USERS + "/me"))
                .andDo(print())
                .andExpect(status().isUnauthorized());

            verify(userService, never()).getUserProfile(any());
        }

        @Test
        @DisplayName("404 - Returns not found when user does not exist")
        void getMyProfile_UserNotFound_Returns404() throws Exception {
            when(userService.getUserProfile(userId))
                .thenThrow(new ResourceNotFoundException("User not found"));

            mockMvc.perform(get(USERS + "/me")
                    .with(user(userPrincipal)))
                .andDo(print())
                .andExpect(status().isNotFound());
        }
    }

    // ===================================================
    // PUT /api/v1/users/me
    // ===================================================
    @Nested
    @DisplayName("PUT /api/v1/users/me")
    class UpdateMyProfile {

        @Test
        @DisplayName("200 - Returns updated profile when request is valid")
        void updateProfile_ValidRequest_Returns200() throws Exception {
            when(userService.updateProfile(eq(userId), any(UpdateUserProfileRequest.class)))
                .thenReturn(updateResponse);

            mockMvc.perform(put(USERS + "/me")
                    .with(user(userPrincipal))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(updateRequest)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userId.toString()))
                .andExpect(jsonPath("$.fullName").value("Nguyen Van A"))
                .andExpect(jsonPath("$.gender").value("MALE"));

            verify(userService).updateProfile(eq(userId), any(UpdateUserProfileRequest.class));
        }

        @Test
        @DisplayName("400 - Returns bad request when fullName is blank")
        void updateProfile_BlankFullName_Returns400() throws Exception {
            UpdateUserProfileRequest badRequest = new UpdateUserProfileRequest(
                "",
                "123 Le Loi",
                LocalDate.of(2000, 1, 15),
                Gender.MALE
            );

            mockMvc.perform(put(USERS + "/me")
                    .with(user(userPrincipal))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(badRequest)))
                .andDo(print())
                .andExpect(status().isBadRequest());

            verify(userService, never()).updateProfile(any(), any());
        }

        @Test
        @DisplayName("400 - Returns bad request when gender is null")
        void updateProfile_NullGender_Returns400() throws Exception {
            UpdateUserProfileRequest badRequest = new UpdateUserProfileRequest(
                "Nguyen Van A",
                "123 Le Loi",
                LocalDate.of(2000, 1, 15),
                null
            );

            mockMvc.perform(put(USERS + "/me")
                    .with(user(userPrincipal))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(badRequest)))
                .andDo(print())
                .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("400 - Returns bad request when birthDate is in the future")
        void updateProfile_FutureBirthDate_Returns400() throws Exception {
            UpdateUserProfileRequest badRequest = new UpdateUserProfileRequest(
                "Nguyen Van A",
                "123 Le Loi",
                LocalDate.now().plusDays(1),
                Gender.MALE
            );

            mockMvc.perform(put(USERS + "/me")
                    .with(user(userPrincipal))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(badRequest)))
                .andDo(print())
                .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("401 - Returns unauthorized when not authenticated")
        void updateProfile_Unauthenticated_Returns401() throws Exception {
            mockMvc.perform(put(USERS + "/me")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(updateRequest)))
                .andDo(print())
                .andExpect(status().isUnauthorized());
        }
    }

    // ===================================================
    // GET /api/v1/users/{userId}  (ADMIN only)
    // ===================================================
    @Nested
    @DisplayName("GET /api/v1/users/{userId} - ADMIN only")
    class GetUserProfileById {

        @Test
        @DisplayName("200 - Returns profile when called by ADMIN")
        void getUserProfile_AsAdmin_Returns200() throws Exception {
            when(userService.getUserProfile(userId)).thenReturn(profileResponse);

            mockMvc.perform(get(USERS + "/" + userId)
                    .with(user(adminPrincipal)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userId.toString()))
                .andExpect(jsonPath("$.email").value("user@example.com"));

            verify(userService).getUserProfile(userId);
        }

        @Test
        @DisplayName("403 - Returns forbidden when called by regular user")
        void getUserProfile_AsUser_Returns403() throws Exception {
            mockMvc.perform(get(USERS + "/" + userId)
                    .with(user(userPrincipal)))
                .andDo(print())
                .andExpect(status().isForbidden());

            verify(userService, never()).getUserProfile(any());
        }

        @Test
        @DisplayName("401 - Returns unauthorized when not authenticated")
        void getUserProfile_Unauthenticated_Returns401() throws Exception {
            mockMvc.perform(get(USERS + "/" + userId))
                .andDo(print())
                .andExpect(status().isUnauthorized());
        }

        @Test
        @DisplayName("404 - Returns not found when user does not exist")
        void getUserProfile_AdminUserNotFound_Returns404() throws Exception {
            when(userService.getUserProfile(userId))
                .thenThrow(new ResourceNotFoundException("User not found"));

            mockMvc.perform(get(USERS + "/" + userId)
                    .with(user(adminPrincipal)))
                .andDo(print())
                .andExpect(status().isNotFound());
        }

        @Test
        @DisplayName("400 - Returns bad request when userId is not a valid UUID")
        void getUserProfile_InvalidUUID_Returns400() throws Exception {
            mockMvc.perform(get(USERS + "/not-a-uuid")
                    .with(user(adminPrincipal)))
                .andDo(print())
                .andExpect(status().isBadRequest());
        }
    }
}