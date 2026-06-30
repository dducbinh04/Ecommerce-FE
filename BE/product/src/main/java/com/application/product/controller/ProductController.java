package com.application.product.controller;

import com.application.product.constant.ApiPath;
import com.application.product.dto.request.CreateProductRequest;
import com.application.product.dto.request.UpdateProductRequest;
import com.application.product.dto.response.ProductResponse;
import com.application.product.entiry.Product;
import com.application.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(ApiPath.PRODUCTS)
@RequiredArgsConstructor
@Tag(name = "Product management", description = "API for product management")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{id}")
    @Operation(summary = "Get product by id", description = "Retrieve detailed information about a specific product")
    public ResponseEntity<ProductResponse> getProductById(
            @Parameter(description = "Product ID", required = true)
            @PathVariable UUID id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
    @GetMapping("/search")
    @Operation(summary = "Search product", description = "Search product by name and category and filter by price")
    public ResponseEntity<Page<ProductResponse>> getProducts(
            @Parameter(description = "Product name")
            @RequestParam(required = false)
            String name,
            @Parameter(description = "CategoryId")
            @RequestParam(required = false)
            UUID categoryId,
            @Parameter(description = "pageable: ?page= &size= &sort= ,asc/desc")
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "id"
            )
            Pageable pageable // ?page=0&size=10&sort=name,asc
    ) {
        return ResponseEntity.ok(this.productService.findByCriteria(name, categoryId, pageable));
    }
    @PostMapping
    @Operation(summary = "Create Product", description = "APi for create product, call API cloudinary before create to upload image")
    public ResponseEntity<ProductResponse> createProduct(
            @Parameter(description = "CreateProductRequest")
            @RequestBody CreateProductRequest createProductRequest) {
        return new ResponseEntity<>(productService.createProduct(createProductRequest), HttpStatus.CREATED);
    }
    @PostMapping("/{productId}/image")
    @Operation(summary = "Add a single image to a product", description = "Add one image to the end of image list")
    public ResponseEntity<ProductResponse> addProductImage(
            @Parameter(description = "Product ID", required = true)
            @PathVariable UUID productId,
            @Parameter(description = "Image file", required = true)
            @RequestParam List<MultipartFile> productImages) {
        return ResponseEntity.ok(productService.AddProductImage(productImages, productId));
    }
    @PutMapping("/{id}")
    @Operation(summary = "Update Product", description = "Update product only, not image")
    public ResponseEntity<ProductResponse> updateProduct(
            @Parameter(description = "Product ID")
            @PathVariable UUID id,
            @Parameter(description = "Update product request")
            @RequestBody UpdateProductRequest updateProductRequest) {
        return ResponseEntity.ok(productService.updateProduct(updateProductRequest, id));
    }
    @PutMapping("/{id}/image/order")
    @Operation(summary = "Update image order", description = "Update image order of product, images must belong to the product")
    public ResponseEntity<ProductResponse> updateProductImageOrder(@PathVariable UUID id, @RequestBody List<UUID> productImages) {
        return ResponseEntity.ok(productService.updateProductImageOrder(id, productImages));
    }
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a product", description = "Delete a product by id and image in cloudinary")
    public ResponseEntity<?> deleteProductById(
            @Parameter(description = "Product ID", required = true)
            @PathVariable UUID id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/{id}/image/{imageId}")
    @Operation(summary = "Delete an image", description = "Delete an image of a product")
    public ResponseEntity<?> deleteProductImage(
            @Parameter(description = "Product ID")
            @PathVariable UUID id,
            @Parameter(description = "Image ID (Not publicId)")
            @PathVariable UUID imageId) {
        productService.deleteProductImage(id, imageId);
        return ResponseEntity.noContent().build();
    }
}
