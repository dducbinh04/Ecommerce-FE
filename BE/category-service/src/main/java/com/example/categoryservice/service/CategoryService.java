package com.example.categoryservice.service;

import com.example.categoryservice.dto.request.CategoryRequest;
import com.example.categoryservice.dto.response.CategoryResponse;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest request);
    List<CategoryResponse> getAllCategories();
    CategoryResponse getCategoryById(UUID id);
    CategoryResponse updateCategory(UUID id, CategoryRequest request);
    void deleteCategory(UUID id);
    List<CategoryResponse> getCategoriesByIds(List<UUID> ids);
    Map<UUID, String> getCategoryMapByIds(List<UUID> ids);
}