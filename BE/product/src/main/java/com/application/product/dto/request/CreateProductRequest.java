package com.application.product.dto.request;

import com.application.product.entiry.ProductImage;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Builder
@Component
public class CreateProductRequest {
    @NotBlank(message = "Name is required")
    private String name;
    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Integer price;

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity must be greater or equal to 0")
    private Integer quantity;

    private UUID categoryId;
    private String categoryName;

    private List<ImageRequest> productImages;
}
