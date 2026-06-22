package com.example.Product_Catalog_Management.dto.response;

import lombok.*;
import org.springframework.stereotype.Component;

import java.util.UUID;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Component
public class ProductResponse {
    private UUID id;
    private String name;
    private String description;
    private Integer quantity;
    private Integer price;
    private String imageUrl;
    private UUID categoryId;
    private String categoryName;
}
