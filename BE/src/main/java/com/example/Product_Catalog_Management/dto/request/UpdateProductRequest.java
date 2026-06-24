package com.example.Product_Catalog_Management.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Builder
@Component
public class UpdateProductRequest {
    private String name;
    private String description;

    @Positive(message = "Price must be positive")
    private Integer price;

    @Min(value = 0, message = "Quantity must be greater or equal to 0")
    private Integer quantity;
    private UUID categoryId;

    private MultipartFile file;
    private String imageUrl;
}
