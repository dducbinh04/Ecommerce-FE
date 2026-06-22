package com.example.Product_Catalog_Management.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.springframework.stereotype.Component;

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
    private Integer price;
    private Integer quantity;
    private UUID categoryId;
}
