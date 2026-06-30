package com.example.categoryservice.controller;

import com.example.categoryservice.dto.request.CategoryRequest;
import com.example.categoryservice.dto.response.CategoryResponse;
import com.example.categoryservice.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.example.categoryservice.constant.ApiPath.CATEGORIES;

@RestController
@RequestMapping(CATEGORIES)
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable UUID id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CategoryRequest request) {
        return new ResponseEntity<>(categoryService.createCategory(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable UUID id, @Valid @RequestBody CategoryRequest request) {
        return ResponseEntity.ok(categoryService.updateCategory(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/by-ids")
    public ResponseEntity<List<CategoryResponse>> getCategoriesByIds(@RequestBody List<UUID> ids) {
        List<CategoryResponse> responses = categoryService.getCategoriesByIds(ids);
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/map-by-ids")
    public ResponseEntity<Map<UUID, String>> getCategoryMapByIds(@RequestBody List<UUID> ids) {
        Map<UUID, String> categoryMap = categoryService.getCategoryMapByIds(ids);
        return ResponseEntity.ok(categoryMap);
    }
}