package com.application.user_service.service.imp;

import com.application.user_service.dto.ProfileDto;
import com.application.user_service.dto.request.GetProfilesRequest;
import com.application.user_service.dto.request.UpdateProfileRequest;
import com.application.user_service.dto.response.GetProfileResponse;
import com.application.user_service.dto.response.UpdateProfileResponse;
import com.application.user_service.entity.Profile;
import com.application.user_service.exception.ResourceNotFoundException;
import com.application.user_service.mapper.ProfileMapper;
import com.application.user_service.payload.UserSignUpMessage;
import com.application.user_service.repository.ProfileRepository;
import com.application.user_service.service.ProfileService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceImp implements ProfileService {

    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;

    @Override
    public void createProfile(UserSignUpMessage msg) {
        var profile = profileMapper.toEntity(msg);
        profileRepository.save(profile);
    }

    @Transactional
    @Override
    public UpdateProfileResponse updateProfile(UUID userId, UpdateProfileRequest req) {
        var user = getProfileByUserId(userId);
        profileMapper.updateProfileFromDto(req, user);

        return profileMapper.toUpdateResponse(user);
    }

    @Override
    public GetProfileResponse getUserProfile(UUID userId) {
        var user = getProfileByUserId(userId);
        return profileMapper.toProfileResponse(user);
    }

    @Override
    public List<ProfileDto> getUserProfiles(GetProfilesRequest req) {
        var profiles = profileRepository.findAllById(req.getUserIds());
        return profileMapper.toDto(profiles);
    }

    @Override
    public boolean existsProfile(UUID userId) {
        return profileRepository.existsByUserId(userId);
    }

    @Override
    public Profile getProfileByUserId(UUID userId) {
        return profileRepository.findByUserId(userId)
            .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
    }

}
