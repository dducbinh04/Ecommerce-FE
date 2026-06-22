package com.example.Product_Catalog_Management.mapper;

import com.example.Product_Catalog_Management.dto.UserDto;
import com.example.Product_Catalog_Management.dto.request.AuthRequest;
import com.example.Product_Catalog_Management.dto.request.UpdateUserProfileRequest;
import com.example.Product_Catalog_Management.dto.response.GetUserProfileResponse;
import com.example.Product_Catalog_Management.dto.response.UpdateUserProfileResponse;
import com.example.Product_Catalog_Management.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-22T19:42:44+0700",
    comments = "version: 1.7.0.Beta1, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setAddress( user.getAddress() );
        userDto.setBirthDate( user.getBirthDate() );
        userDto.setEmail( user.getEmail() );
        userDto.setFullName( user.getFullName() );
        userDto.setGender( user.getGender() );
        userDto.setId( user.getId() );
        userDto.setRole( user.getRole() );

        return userDto;
    }

    @Override
    public User toEntity(AuthRequest authRequest) {
        if ( authRequest == null ) {
            return null;
        }

        User user = new User();

        user.setEmail( authRequest.getEmail() );
        user.setRole( authRequest.getRole() );

        return user;
    }

    @Override
    public GetUserProfileResponse toProfileResponse(User user) {
        if ( user == null ) {
            return null;
        }

        GetUserProfileResponse getUserProfileResponse = new GetUserProfileResponse();

        getUserProfileResponse.setAddress( user.getAddress() );
        getUserProfileResponse.setBirthDate( user.getBirthDate() );
        getUserProfileResponse.setEmail( user.getEmail() );
        getUserProfileResponse.setFullName( user.getFullName() );
        getUserProfileResponse.setGender( user.getGender() );
        getUserProfileResponse.setId( user.getId() );
        getUserProfileResponse.setRole( user.getRole() );

        return getUserProfileResponse;
    }

    @Override
    public UpdateUserProfileResponse toUpdateResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UpdateUserProfileResponse updateUserProfileResponse = new UpdateUserProfileResponse();

        updateUserProfileResponse.setAddress( user.getAddress() );
        updateUserProfileResponse.setBirthDate( user.getBirthDate() );
        updateUserProfileResponse.setFullName( user.getFullName() );
        updateUserProfileResponse.setGender( user.getGender() );
        updateUserProfileResponse.setId( user.getId() );

        return updateUserProfileResponse;
    }

    @Override
    public void updateUserFromDto(UpdateUserProfileRequest dto, User entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getAddress() != null ) {
            entity.setAddress( dto.getAddress() );
        }
        if ( dto.getBirthDate() != null ) {
            entity.setBirthDate( dto.getBirthDate() );
        }
        if ( dto.getFullName() != null ) {
            entity.setFullName( dto.getFullName() );
        }
        if ( dto.getGender() != null ) {
            entity.setGender( dto.getGender() );
        }
    }
}
