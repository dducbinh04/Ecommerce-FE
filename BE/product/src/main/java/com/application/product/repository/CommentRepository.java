package com.application.product.repository;

import com.application.product.entiry.Comment;
import com.application.product.entiry.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends CrudRepository<Comment, UUID> {
    public Page<Comment> findByProductId(UUID id, Pageable pageable);
    public Page<Comment> findByUserId(UUID userId, Pageable pageable);
    public Page<Comment> findByRatingAndProductId(Integer rating, UUID productId, Pageable pageable);
    boolean existsByProductIdAndUserId(UUID productId, UUID userId);
}
