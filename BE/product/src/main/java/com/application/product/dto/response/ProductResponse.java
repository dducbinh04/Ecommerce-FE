package com.application.product.dto.response;

import com.application.product.entiry.ProductImage;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;
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

    private UUID categoryId;
    private String categoryName;

    private List<ProductImage> productImages;
}
