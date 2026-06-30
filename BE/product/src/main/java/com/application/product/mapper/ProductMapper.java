package com.application.product.mapper;

import com.application.product.dto.request.CreateProductRequest;
import com.application.product.dto.request.UpdateProductRequest;
import com.application.product.dto.response.ProductResponse;
import com.application.product.entiry.Product;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "images", ignore = true)
    Product toEntity(CreateProductRequest createProductRequest);
    @Mapping(target = "categoryName", source = "categoryName")
    ProductResponse toResponse(Product product, String categoryName);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    void updateEntity(UpdateProductRequest updateProductRequest, @MappingTarget Product product);
}
