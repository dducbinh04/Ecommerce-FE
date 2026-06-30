package com.application.product.controller;

import com.application.product.dto.request.CreateCommentRequest;
import com.application.product.dto.response.CommentResponse;
import com.application.product.security.CustomUserDetails;
import com.application.product.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    @GetMapping("/product/{productId}")
    public ResponseEntity<Page<CommentResponse>> findByProductId(
            @PathVariable UUID productId,
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "id"
            )
            Pageable pageable) {
        return ResponseEntity.ok(commentService.findByProductId(productId, pageable));
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<CommentResponse>> findByUserId(
            @PathVariable UUID userId,
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "id"
            )
            Pageable pageable) {
        return ResponseEntity.ok(commentService.findByUserId(userId, pageable));
    }
    @GetMapping("/product/{productId}/rating/{rating}")
    public ResponseEntity<Page<CommentResponse>> findByProductIdAndRating(
            @PathVariable("productId") UUID productId, @PathVariable("rating") Integer rating,
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "id"
            )
            Pageable pageable) {
        return ResponseEntity.ok(commentService.findByRatingAndProductId(rating, productId, pageable));
    }
    @PostMapping("/product/{productId}")
    public ResponseEntity<CommentResponse> createComment(@AuthenticationPrincipal CustomUserDetails user, @PathVariable UUID productId, @Valid @RequestBody CreateCommentRequest createCommentRequest) {
        //set userId
        return ResponseEntity.ok(commentService.createComment(user.id(),productId,createCommentRequest));
    }
}
