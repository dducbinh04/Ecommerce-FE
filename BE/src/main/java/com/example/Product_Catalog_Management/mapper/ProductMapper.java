package com.example.Product_Catalog_Management.mapper;

import com.example.Product_Catalog_Management.dto.request.CreateProductRequest;
import com.example.Product_Catalog_Management.dto.request.UpdateProductRequest;
import com.example.Product_Catalog_Management.dto.response.ProductResponse;
import com.example.Product_Catalog_Management.entity.Product;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", ignore = true)
    Product toEntity(CreateProductRequest createProductRequest);
    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "categoryName", source = "category.name")
    ProductResponse toResponse(Product product);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", ignore = true)
    void updateEntity(UpdateProductRequest updateProductRequest, @MappingTarget Product product);
}
