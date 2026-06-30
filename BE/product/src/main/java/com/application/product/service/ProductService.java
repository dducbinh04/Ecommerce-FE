package com.application.product.service;

import com.application.product.dto.request.CreateProductRequest;
import com.application.product.dto.request.UpdateProductRequest;
import com.application.product.dto.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    public ProductResponse getProductById(UUID productId);
    void  deleteProduct(UUID productId);
    public ProductResponse updateProduct(UpdateProductRequest updateProductRequest, UUID productId);
    ProductResponse createProduct(CreateProductRequest createProductRequest);
    public ProductResponse updateProductImageOrder(UUID productId, List<UUID> productImages);
    public ProductResponse AddProductImage(List<MultipartFile> productImages, UUID productId);
    public ProductResponse deleteProductImage(UUID productId, UUID productImageId);
    public Page<ProductResponse> findByCriteria(String name, UUID categoryId, Pageable pageable);
}
