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
public class CreateProductRequest {
    @NotBlank
    private String name;
    private String description;
    @Positive
    private Integer price;
    @Min(0)
    private Integer quantity;
    private UUID categoryId;
}
