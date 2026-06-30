package com.application.product.dto.response;

import com.application.product.entiry.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
public class CommentResponse {
    private UUID id;
    private String comment;
    private Integer rating;
    private String userName;
    private String avatarUrl;
    private LocalDateTime createdDate;
}
