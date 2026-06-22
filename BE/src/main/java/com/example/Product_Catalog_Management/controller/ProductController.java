package com.example.Product_Catalog_Management.controller;

import com.example.Product_Catalog_Management.dto.request.CreateProductRequest;
import com.example.Product_Catalog_Management.dto.request.UpdateProductRequest;
import com.example.Product_Catalog_Management.dto.response.ProductResponse;
import com.example.Product_Catalog_Management.service.ProductService;
import com.example.Product_Catalog_Management.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin("http://localhost:5173")
public class ProductController {
    private final ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @GetMapping
    public Page<ProductResponse> getProducts(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size,
                                             @RequestParam(defaultValue = "id") String sortBy,
                                             @RequestParam(defaultValue = "asc") String sortDirection) {
        return productService.getProducts(page, size, sortBy, sortDirection);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable UUID id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @RequestBody CreateProductRequest createProductRequest,
            @RequestParam(required = false) MultipartFile file,
            @RequestParam(required = false) String imageUrl) throws IOException {
        return ResponseEntity.ok(productService.createProduct(createProductRequest, file, imageUrl));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable UUID id,
            @RequestBody UpdateProductRequest updateProductRequest,
            @RequestParam(required = false) MultipartFile file,
            @RequestParam(required = false) String imageUrl) throws IOException {
        return ResponseEntity.ok(productService.updateProduct(id, updateProductRequest, file, imageUrl));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/image/{id}")
    public ResponseEntity<?> deleteProductImage(@PathVariable UUID id) throws IOException {
        productService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponse>> getProducts(
            @RequestParam(required = false)
            String name,
            @RequestParam(required = false)
            UUID categoryId,
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "id"
            )
            Pageable pageable // ?page=0&size=10&sort=name,asc
    ) {
        return ResponseEntity.ok(this.productService.findByCriteria(name, categoryId, pageable));
    }
}
