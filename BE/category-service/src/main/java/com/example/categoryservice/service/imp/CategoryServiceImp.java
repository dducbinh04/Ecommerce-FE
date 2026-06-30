package com.example.categoryservice.service.imp;

import com.example.categoryservice.dto.request.CategoryRequest;
import com.example.categoryservice.dto.response.CategoryResponse;
import com.example.categoryservice.entity.Category;
import com.example.categoryservice.exception.ConflictException;
import com.example.categoryservice.exception.ResourceNotFoundException;
import com.example.categoryservice.repository.CategoryRepository;
import com.example.categoryservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImp implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new ConflictException("Category already exists");
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
                .orElseThrow(() -> new ResourceNotFoundException("Not found category with: " + id));
        return new CategoryResponse(category.getId(), category.getName());
    }

    @Override
    public CategoryResponse updateCategory(UUID id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found category with: " + id));

        category.setName(request.getName());
        Category updatedCategory = categoryRepository.save(category);
        return new CategoryResponse(updatedCategory.getId(), updatedCategory.getName());
    }

    @Override
    public void deleteCategory(UUID id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Not found category with: " + id);
        }
        categoryRepository.deleteById(id);
    }

    @Override
    public List<CategoryResponse> getCategoriesByIds(List<UUID> ids) {
        List<Category> categories = categoryRepository.findAllById(ids);
        return categories.stream()
            .map(category ->
                new CategoryResponse(
                    category.getId(),
                    category.getName()
                )
            )
            .collect(Collectors.toList());
    }

    @Override
    public Map<UUID, String> getCategoryMapByIds(List<UUID> ids) {
        if (ids == null || ids.isEmpty()) {
            return Map.of();
        }

        List<Category> categories = categoryRepository.findAllById(ids);
        return categories.stream()
                .collect(Collectors.toMap(
                        Category::getId,
                        Category::getName,
                        (existing, replacement) -> existing
                ));
    }
}
