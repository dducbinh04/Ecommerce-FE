package com.application.product.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class ImageRequest {
    @NotBlank(message = "Url is required")
    private String imageUrl;
    @NotBlank(message = "PublicId is required")
    private String publicId;
}
