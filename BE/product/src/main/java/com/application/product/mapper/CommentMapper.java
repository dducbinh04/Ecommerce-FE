package com.application.product.mapper;

import com.application.product.dto.request.CreateCommentRequest;
import com.application.product.dto.response.CommentResponse;
import com.application.product.entiry.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "timestamp", ignore = true)
    Comment toEntity(CreateCommentRequest createCommentRequest);

    CommentResponse toResponse(Comment comment);
}
