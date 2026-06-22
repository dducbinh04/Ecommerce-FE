package com.example.Product_Catalog_Management.mapper;

import com.example.Product_Catalog_Management.dto.UserDto;
import com.example.Product_Catalog_Management.dto.request.AuthRequest;
import com.example.Product_Catalog_Management.dto.request.UpdateUserProfileRequest;
import com.example.Product_Catalog_Management.dto.response.GetUserProfileResponse;
import com.example.Product_Catalog_Management.dto.response.UpdateUserProfileResponse;
import com.example.Product_Catalog_Management.entity.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(AuthRequest authRequest);
    GetUserProfileResponse toProfileResponse(User user);
    UpdateUserProfileResponse toUpdateResponse(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromDto(UpdateUserProfileRequest dto, @MappingTarget User entity);
}
