package com.application.product.service;

import com.application.product.dto.request.CreateCommentRequest;
import com.application.product.dto.response.CommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface CommentService {
    public Page<CommentResponse> findByProductId(UUID productId, Pageable pageable);
    public Page<CommentResponse> findByRatingAndProductId(Integer rating,UUID productId, Pageable pageable);
    public CommentResponse createComment(UUID userId, UUID productId, CreateCommentRequest createCommentRequest);
    public Page<CommentResponse> findByUserId(UUID userId, Pageable pageable);
}
