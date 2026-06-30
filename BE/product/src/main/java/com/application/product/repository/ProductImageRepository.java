package com.application.product.repository;

import com.application.product.entiry.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;


public interface ProductImageRepository extends JpaRepository<ProductImage, UUID> {
//    public Optional<ProductImage> findByIdAndProductId(UUID productId, UUID productImageId);
}
