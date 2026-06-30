package com.application.product.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
@Builder
public class CreateCommentRequest {
    @NotBlank(message = "Comment is required")
    private String comment;
    @Min(value = 0, message = "Rating is greater than or equal to 0")
    @Max(value = 5, message = "Rating must less than or equal to 5")
    private Integer rating;
//    @NotBlank(message = "Username is required")
//    private String userName;
//    private String avatarUrl;
    @NotNull(message = "Comment must belong to product")
    private UUID productId;
}
