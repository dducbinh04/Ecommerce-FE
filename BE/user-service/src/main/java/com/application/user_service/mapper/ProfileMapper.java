package com.application.user_service.mapper;

import com.application.user_service.dto.ProfileDto;
import com.application.user_service.dto.request.UpdateProfileRequest;
import com.application.user_service.dto.response.GetProfileResponse;
import com.application.user_service.dto.response.UpdateProfileResponse;
import com.application.user_service.entity.Profile;
import com.application.user_service.payload.UserSignUpMessage;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Profile toEntity(UserSignUpMessage msg);

    GetProfileResponse toProfileResponse(Profile profile);
    UpdateProfileResponse toUpdateResponse(Profile profile);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProfileFromDto(UpdateProfileRequest dto, @MappingTarget Profile entity);

    ProfileDto toDto(Profile profile);
    List<ProfileDto> toDto(List<Profile> profiles);
}
