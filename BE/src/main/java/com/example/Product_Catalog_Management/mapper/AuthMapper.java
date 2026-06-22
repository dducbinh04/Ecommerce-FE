package com.example.Product_Catalog_Management.mapper;

import com.example.Product_Catalog_Management.payload.CacheRefreshPayload;
import com.example.Product_Catalog_Management.payload.TokenPayload;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AuthMapper {
    TokenPayload toTokenPayload(CacheRefreshPayload payload);
}
