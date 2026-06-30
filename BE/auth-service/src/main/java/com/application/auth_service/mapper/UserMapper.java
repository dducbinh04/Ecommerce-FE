package com.application.auth_service.mapper;

import com.application.auth_service.dto.UserDto;
import com.application.auth_service.dto.request.AuthRequest;
import com.application.auth_service.entity.User;
import com.application.auth_service.payload.event.UserSignUpMessage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(AuthRequest authRequest);

    @Mapping(source = "id", target = "userId")
    UserSignUpMessage toSignUpMsg(User user);
}
