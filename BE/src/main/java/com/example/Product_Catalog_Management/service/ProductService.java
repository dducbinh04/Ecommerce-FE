package com.example.Product_Catalog_Management.service;

import com.example.Product_Catalog_Management.dto.request.CreateProductRequest;
import com.example.Product_Catalog_Management.dto.request.UpdateProductRequest;
import com.example.Product_Catalog_Management.dto.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.UUID;

public interface ProductService {
    ProductResponse createProduct(CreateProductRequest addProductRequest) throws IOException;
    ProductResponse updateProduct(UUID id, UpdateProductRequest updateProductRequest) throws IOException;
    void deleteProduct(UUID id) throws IOException;
    ProductResponse getProductById(UUID id);
    Page<ProductResponse> getProducts(int page, int size, String sortBy, String sortDirection);
    Page<ProductResponse> findByCriteria(String name, UUID categoryId, Pageable pageable);
    void deleteImage(UUID id) throws IOException;
}
