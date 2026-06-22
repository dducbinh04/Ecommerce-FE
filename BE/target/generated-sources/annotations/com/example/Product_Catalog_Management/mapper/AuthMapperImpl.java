package com.example.Product_Catalog_Management.mapper;

import com.example.Product_Catalog_Management.payload.CacheRefreshPayload;
import com.example.Product_Catalog_Management.payload.TokenPayload;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-22T19:42:44+0700",
    comments = "version: 1.7.0.Beta1, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class AuthMapperImpl implements AuthMapper {

    @Override
    public TokenPayload toTokenPayload(CacheRefreshPayload payload) {
        if ( payload == null ) {
            return null;
        }

        TokenPayload tokenPayload = new TokenPayload();

        tokenPayload.setRole( payload.getRole() );
        tokenPayload.setSub( payload.getSub() );

        return tokenPayload;
    }
}
