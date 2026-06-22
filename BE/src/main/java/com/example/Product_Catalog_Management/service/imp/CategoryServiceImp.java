package com.example.Product_Catalog_Management.service.imp;

import com.example.Product_Catalog_Management.dto.CategoryRequest;
import com.example.Product_Catalog_Management.dto.response.CategoryResponse;
import com.example.Product_Catalog_Management.entity.Category;
import com.example.Product_Catalog_Management.exception.ResourceNotFoundException;
import com.example.Product_Catalog_Management.repository.CategoryRepository;
import com.example.Product_Catalog_Management.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.UnknownUnwrapTypeException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImp implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Danh mục đã tồn tại");
        }
        Category category = new Category();
        category.setName(request.getName());
        Category savedCategory = categoryRepository.save(category);
        return new CategoryResponse(savedCategory.getId(), savedCategory.getName());
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> new CategoryResponse(category.getId(), category.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse getCategoryById(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục với id: " + id));
        return new CategoryResponse(category.getId(), category.getName());
    }

    @Override
    public CategoryResponse updateCategory(UUID id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục với id: " + id));

        category.setName(request.getName());
        Category updatedCategory = categoryRepository.save(category);
        return new CategoryResponse(updatedCategory.getId(), updatedCategory.getName());
    }

    @Override
    public void deleteCategory(UUID id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Không tìm thấy danh mục với id: " + id);
        }
        categoryRepository.deleteById(id);
    }
}
