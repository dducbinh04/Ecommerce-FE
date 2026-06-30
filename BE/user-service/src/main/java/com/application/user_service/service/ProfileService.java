package com.application.user_service.service;

import com.application.user_service.dto.ProfileDto;
import com.application.user_service.dto.request.GetProfilesRequest;
import com.application.user_service.dto.request.UpdateProfileRequest;
import com.application.user_service.dto.response.GetProfileResponse;
import com.application.user_service.dto.response.UpdateProfileResponse;
import com.application.user_service.entity.Profile;
import com.application.user_service.payload.UserSignUpMessage;

import java.util.List;
import java.util.UUID;

public interface ProfileService {
    void createProfile(UserSignUpMessage msg);
    UpdateProfileResponse updateProfile(UUID userId, UpdateProfileRequest req);
    GetProfileResponse getUserProfile(UUID userId);
    Profile getProfileByUserId(UUID userId);
    List<ProfileDto> getUserProfiles(GetProfilesRequest req);
    boolean existsProfile(UUID userId);
}
