package com.application.product.service.Imp;

import com.application.product.client.UserClient;
import com.application.product.dto.request.CreateCommentRequest;
import com.application.product.dto.response.CommentResponse;
import com.application.product.dto.response.UserDto;
import com.application.product.entiry.Comment;
import com.application.product.entiry.Product;
import com.application.product.exception.BadRequestException;
import com.application.product.exception.ResourceNotFoundException;
import com.application.product.mapper.CommentMapper;
import com.application.product.repository.CommentRepository;
import com.application.product.repository.ProductRepository;
import com.application.product.service.CommentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentServiceImp implements CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final ProductRepository productRepository;
    private final UserClient userClient;
    @Transactional
    public CommentResponse createComment(UUID userId, UUID productId, CreateCommentRequest createCommentRequest) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product not found")
        );
        if(commentRepository.existsByProductIdAndUserId(productId, userId)){
            throw new BadRequestException("User can only have one comment for this product");
        }
        Comment comment = commentMapper.toEntity(createCommentRequest);

        comment.setProduct(product);
        comment.setUserId(userId);
        commentRepository.save(comment);
        product.setNumComment(product.getNumComment()+1);
        product.setNumStar(product.getNumStar()+comment.getRating());
        product.setRating((double)product.getNumStar()/product.getNumComment());

        UserDto userDto = userClient.getUser(userId);
        CommentResponse commentResponse = commentMapper.toResponse(comment);
        commentResponse.setUserName(userDto.getFullName());
        commentResponse.setAvatarUrl(userDto.getAvatar().getUrl());

        return commentResponse;
    }

    public Page<CommentResponse> findByProductId(UUID productId, Pageable pageable) {
        Page<Comment> commentPage = commentRepository.findByProductId(productId,pageable);
        return commentPage.map(comment -> {
            UserDto userDto = userClient.getUser(comment.getUserId());
            CommentResponse commentResponse = commentMapper.toResponse(comment);
            commentResponse.setUserName(userDto.getFullName());
            commentResponse.setAvatarUrl(userDto.getAvatar().getUrl());
            return commentResponse;
        });
    }
    public Page<CommentResponse> findByUserId(UUID userId, Pageable pageable) {
        Page<Comment> commentPage = commentRepository.findByUserId(userId,pageable);
        return commentPage.map(comment -> {
            UserDto userDto = userClient.getUser(comment.getUserId());
            CommentResponse commentResponse = commentMapper.toResponse(comment);
            commentResponse.setUserName(userDto.getFullName());
            commentResponse.setAvatarUrl(userDto.getAvatar().getUrl());
            return commentResponse;
        });
    }
    public Page<CommentResponse> findByRatingAndProductId(Integer rating, UUID productId, Pageable pageable) {
        Page<Comment> commentPage = commentRepository.findByRatingAndProductId(rating,productId,pageable);
        return commentPage.map(comment -> {
            UserDto userDto = userClient.getUser(comment.getUserId());
            CommentResponse commentResponse = commentMapper.toResponse(comment);
            commentResponse.setUserName(userDto.getFullName());
            commentResponse.setAvatarUrl(userDto.getAvatar().getUrl());
            return commentResponse;
        });
    }
}
