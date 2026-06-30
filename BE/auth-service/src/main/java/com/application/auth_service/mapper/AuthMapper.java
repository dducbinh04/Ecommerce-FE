package com.application.auth_service.mapper;

import com.application.auth_service.payload.CacheRefreshPayload;
import com.application.auth_service.payload.TokenPayload;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AuthMapper {
    TokenPayload toTokenPayload(CacheRefreshPayload payload);
}
