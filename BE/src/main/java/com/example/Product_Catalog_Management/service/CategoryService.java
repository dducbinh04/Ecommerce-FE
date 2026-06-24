package com.example.Product_Catalog_Management.service;

import com.example.Product_Catalog_Management.dto.request.CategoryRequest;
import com.example.Product_Catalog_Management.dto.response.CategoryResponse;
import java.util.List;
import java.util.UUID;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest request);
    List<CategoryResponse> getAllCategories();
    CategoryResponse getCategoryById(UUID id);
    CategoryResponse updateCategory(UUID id, CategoryRequest request);
    void deleteCategory(UUID id);
}