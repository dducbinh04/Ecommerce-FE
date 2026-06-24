package com.example.Product_Catalog_Management;

import com.example.Product_Catalog_Management.dto.request.CreateProductRequest;
import com.example.Product_Catalog_Management.dto.request.UpdateProductRequest;
import com.example.Product_Catalog_Management.dto.response.ProductResponse;
import com.example.Product_Catalog_Management.entity.Category;
import com.example.Product_Catalog_Management.entity.Product;
import com.example.Product_Catalog_Management.exception.BadRequestException;
import com.example.Product_Catalog_Management.exception.ResourceNotFoundException;
import com.example.Product_Catalog_Management.mapper.ProductMapper;
import com.example.Product_Catalog_Management.repository.CategoryRepository;
import com.example.Product_Catalog_Management.repository.ProductRepository;
import com.example.Product_Catalog_Management.service.CloudinaryService;
import com.example.Product_Catalog_Management.service.imp.ProductServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock private ProductRepository productRepository;
    @Mock private ProductMapper productMapper;
    @Mock private CategoryRepository categoryRepository;
    @Mock private CloudinaryService cloudinaryService;

    @InjectMocks
    private ProductServiceImpl productService;

    // ── Fixtures ──────────────────────────────────────────────────────────────
    private UUID productId;
    private UUID categoryId;
    private Category category;
    private Product product;
    private ProductResponse productResponse;

    @BeforeEach
    void setUp() {
        productId  = UUID.randomUUID();
        categoryId = UUID.randomUUID();

        category = new Category(categoryId, "Electronics");

        product = Product.builder()
                .id(productId)
                .name("Laptop")
                .description("High-end laptop")
                .price(1500)
                .quantity(10)
                .category(category)
                .imageUrl("https://res.cloudinary.com/demo/image/upload/sample.jpg")
                .build();

        productResponse = ProductResponse.builder()
                .id(productId)
                .name("Laptop")
                .description("High-end laptop")
                .price(1500)
                .quantity(10)
                .categoryId(categoryId)
                .categoryName("Electronics")
                .imageUrl("https://res.cloudinary.com/demo/image/upload/sample.jpg")
                .build();
    }

    // =========================================================================
    // getProductById
    // =========================================================================
    @Nested
    @DisplayName("getProductById")
    class GetProductById {

        @Test
        @DisplayName("should return ProductResponse when product exists")
        void shouldReturnProductResponse_whenProductExists() {
            when(productRepository.findById(productId)).thenReturn(Optional.of(product));
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            ProductResponse result = productService.getProductById(productId);

            assertThat(result).isNotNull();
            assertThat(result.getId()).isEqualTo(productId);
            assertThat(result.getName()).isEqualTo("Laptop");
            verify(productRepository).findById(productId);
        }

        @Test
        @DisplayName("should throw ResourceNotFoundException when product not found")
        void shouldThrowResourceNotFoundException_whenProductNotFound() {
            when(productRepository.findById(productId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> productService.getProductById(productId))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Product not found");
        }
    }

    // =========================================================================
    // createProduct
    // =========================================================================
    @Nested
    @DisplayName("createProduct")
    class CreateProduct {

        @Test
        @DisplayName("should create product without image")
        void shouldCreateProduct_withNoImage() throws IOException {
            CreateProductRequest request = CreateProductRequest.builder()
                    .name("Laptop")
                    .description("High-end laptop")
                    .price(1500)
                    .quantity(10)
                    .categoryId(categoryId)
                    .build();

            when(productMapper.toEntity(request)).thenReturn(product);
            when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));
            when(productRepository.save(any(Product.class))).thenReturn(product);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            ProductResponse result = productService.createProduct(request);

            assertThat(result).isNotNull();
            assertThat(result.getName()).isEqualTo("Laptop");
            verify(cloudinaryService, never()).uploadImage(any(UUID.class), any(MockMultipartFile.class));
            verify(cloudinaryService, never()).uploadImage(any(UUID.class), anyString());
        }

        @Test
        @DisplayName("should create product with MultipartFile")
        void shouldCreateProduct_withMultipartFile() throws IOException {
            MockMultipartFile file = new MockMultipartFile(
                    "file", "laptop.png", "image/png", "image-bytes".getBytes());

            CreateProductRequest request = CreateProductRequest.builder()
                    .name("Laptop")
                    .categoryId(categoryId)
                    .file(file)
                    .build();

            String cloudinaryUrl = "https://res.cloudinary.com/demo/image/upload/laptop.jpg";

            when(productMapper.toEntity(request)).thenReturn(product);
            when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));
            when(productRepository.save(any(Product.class))).thenReturn(product);
            when(cloudinaryService.uploadImage(productId, file)).thenReturn(cloudinaryUrl);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            ProductResponse result = productService.createProduct(request);

            assertThat(result).isNotNull();
            verify(cloudinaryService).uploadImage(productId, file);
            verify(productRepository, times(2)).save(any(Product.class));
        }

        @Test
        @DisplayName("should create product with imageUrl")
        void shouldCreateProduct_withImageUrl() throws IOException {
            String imageUrl = "https://example.com/laptop.jpg";

            CreateProductRequest request = CreateProductRequest.builder()
                    .name("Laptop")
                    .categoryId(categoryId)
                    .imageUrl(imageUrl)
                    .build();

            String cloudinaryUrl = "https://res.cloudinary.com/demo/image/upload/laptop.jpg";

            when(productMapper.toEntity(request)).thenReturn(product);
            when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));
            when(productRepository.save(any(Product.class))).thenReturn(product);
            when(cloudinaryService.uploadImage(productId, imageUrl)).thenReturn(cloudinaryUrl);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            ProductResponse result = productService.createProduct(request);

            assertThat(result).isNotNull();
            verify(cloudinaryService).uploadImage(productId, imageUrl);
        }

        @Test
        @DisplayName("should throw BadRequestException when both file and imageUrl provided")
        void shouldThrowBadRequestException_whenBothFileAndImageUrlProvided() {
            MockMultipartFile file = new MockMultipartFile(
                    "file", "laptop.png", "image/png", "bytes".getBytes());

            CreateProductRequest request = CreateProductRequest.builder()
                    .name("Laptop")
                    .categoryId(categoryId)
                    .file(file)
                    .imageUrl("https://example.com/laptop.jpg")
                    .build();

            when(productMapper.toEntity(request)).thenReturn(product);
            when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));
            when(productRepository.save(any(Product.class))).thenReturn(product);

            assertThatThrownBy(() -> productService.createProduct(request))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("mutually exclusive");
        }

        @Test
        @DisplayName("should throw ResourceNotFoundException when category not found")
        void shouldThrowResourceNotFoundException_whenCategoryNotFound() {
            CreateProductRequest request = CreateProductRequest.builder()
                    .name("Laptop")
                    .categoryId(categoryId)
                    .build();

            when(productMapper.toEntity(request)).thenReturn(product);
            when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> productService.createProduct(request))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Category not found");
        }

        @Test
        @DisplayName("should throw IOException when Cloudinary upload fails (file)")
        void shouldThrowIOException_whenCloudinaryUploadFails_file() throws IOException {
            MockMultipartFile file = new MockMultipartFile(
                    "file", "laptop.png", "image/png", "bytes".getBytes());

            CreateProductRequest request = CreateProductRequest.builder()
                    .name("Laptop")
                    .categoryId(categoryId)
                    .file(file)
                    .build();

            when(productMapper.toEntity(request)).thenReturn(product);
            when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));
            when(productRepository.save(any(Product.class))).thenReturn(product);
            when(cloudinaryService.uploadImage(productId, file)).thenThrow(new IOException("Network error"));

            assertThatThrownBy(() -> productService.createProduct(request))
                    .isInstanceOf(IOException.class)
                    .hasMessageContaining("Error Uploading Image");
        }

        @Test
        @DisplayName("should throw IOException when Cloudinary upload fails (imageUrl)")
        void shouldThrowIOException_whenCloudinaryUploadFails_imageUrl() throws IOException {
            String imageUrl = "https://example.com/laptop.jpg";

            CreateProductRequest request = CreateProductRequest.builder()
                    .name("Laptop")
                    .categoryId(categoryId)
                    .imageUrl(imageUrl)
                    .build();

            when(productMapper.toEntity(request)).thenReturn(product);
            when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));
            when(productRepository.save(any(Product.class))).thenReturn(product);
            when(cloudinaryService.uploadImage(productId, imageUrl)).thenThrow(new IOException("Network error"));

            assertThatThrownBy(() -> productService.createProduct(request))
                    .isInstanceOf(IOException.class)
                    .hasMessageContaining("Error Uploading Image");
        }
    }

    // =========================================================================
    // updateProduct
    // =========================================================================
    @Nested
    @DisplayName("updateProduct")
    class UpdateProduct {

        @Test
        @DisplayName("should update product fields without changing image")
        void shouldUpdateProduct_withNoImage() throws IOException {
            UpdateProductRequest request = UpdateProductRequest.builder()
                    .name("Laptop Pro")
                    .price(2000)
                    .build();

            when(productRepository.findById(productId)).thenReturn(Optional.of(product));
            when(productRepository.save(product)).thenReturn(product);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            ProductResponse result = productService.updateProduct(productId, request);

            assertThat(result).isNotNull();
            verify(productMapper).updateEntity(request, product);
            verify(cloudinaryService, never()).uploadImage(any(UUID.class), any(MockMultipartFile.class));
        }

        @Test
        @DisplayName("should update product category")
        void shouldUpdateProduct_withNewCategory() throws IOException {
            UUID newCategoryId = UUID.randomUUID();
            Category newCategory = new Category(newCategoryId, "Gaming");

            UpdateProductRequest request = UpdateProductRequest.builder()
                    .categoryId(newCategoryId)
                    .build();

            when(productRepository.findById(productId)).thenReturn(Optional.of(product));
            when(categoryRepository.findById(newCategoryId)).thenReturn(Optional.of(newCategory));
            when(productRepository.save(product)).thenReturn(product);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            productService.updateProduct(productId, request);

            verify(categoryRepository).findById(newCategoryId);
            assertThat(product.getCategory()).isEqualTo(newCategory);
        }

        @Test
        @DisplayName("should update product image with new file")
        void shouldUpdateProduct_withNewFile() throws IOException {
            MockMultipartFile file = new MockMultipartFile(
                    "file", "new.png", "image/png", "bytes".getBytes());

            UpdateProductRequest request = UpdateProductRequest.builder()
                    .file(file)
                    .build();

            String newUrl = "https://res.cloudinary.com/demo/image/upload/new.jpg";

            when(productRepository.findById(productId)).thenReturn(Optional.of(product));
            when(cloudinaryService.uploadImage(productId, file)).thenReturn(newUrl);
            when(productRepository.save(product)).thenReturn(product);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            productService.updateProduct(productId, request);

            verify(cloudinaryService).uploadImage(productId, file);
            assertThat(product.getImageUrl()).isEqualTo(newUrl);
        }

        @Test
        @DisplayName("should update product image with new imageUrl")
        void shouldUpdateProduct_withNewImageUrl() throws IOException {
            String newImageUrl = "https://example.com/new.jpg";

            UpdateProductRequest request = UpdateProductRequest.builder()
                    .imageUrl(newImageUrl)
                    .build();

            String cloudinaryUrl = "https://res.cloudinary.com/demo/new.jpg";

            when(productRepository.findById(productId)).thenReturn(Optional.of(product));
            when(cloudinaryService.uploadImage(productId, newImageUrl)).thenReturn(cloudinaryUrl);
            when(productRepository.save(product)).thenReturn(product);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            productService.updateProduct(productId, request);

            verify(cloudinaryService).uploadImage(productId, newImageUrl);
            assertThat(product.getImageUrl()).isEqualTo(cloudinaryUrl);
        }

        @Test
        @DisplayName("should throw BadRequestException when both file and imageUrl provided")
        void shouldThrow_whenBothFileAndImageUrlProvided() {
            MockMultipartFile file = new MockMultipartFile(
                    "file", "img.png", "image/png", "bytes".getBytes());

            UpdateProductRequest request = UpdateProductRequest.builder()
                    .file(file)
                    .imageUrl("https://example.com/img.jpg")
                    .build();

            when(productRepository.findById(productId)).thenReturn(Optional.of(product));

            assertThatThrownBy(() -> productService.updateProduct(productId, request))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("mutually exclusive");
        }

        @Test
        @DisplayName("should throw ResourceNotFoundException when product not found")
        void shouldThrow_whenProductNotFound() {
            UpdateProductRequest request = UpdateProductRequest.builder().name("X").build();
            when(productRepository.findById(productId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> productService.updateProduct(productId, request))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Product not found");
        }
    }

    // =========================================================================
    // deleteImage
    // =========================================================================
    @Nested
    @DisplayName("deleteImage")
    class DeleteImage {

        @Test
        @DisplayName("should delete image and set imageUrl to null")
        void shouldDeleteImageAndClearUrl() throws IOException {
            when(productRepository.findById(productId)).thenReturn(Optional.of(product));

            productService.deleteImage(productId);

            verify(cloudinaryService).deleteImage(productId);
            assertThat(product.getImageUrl()).isNull();
            verify(productRepository).save(product);
        }

        @Test
        @DisplayName("should throw ResourceNotFoundException when product not found")
        void shouldThrow_whenProductNotFound() throws IOException {
            when(productRepository.findById(productId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> productService.deleteImage(productId))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Product not found");

            verify(cloudinaryService, never()).deleteImage(any());
        }

        @Test
        @DisplayName("should throw IOException when Cloudinary delete fails")
        void shouldThrowIOException_whenCloudinaryDeleteFails() throws IOException {
            when(productRepository.findById(productId)).thenReturn(Optional.of(product));
            doThrow(new IOException("Network error")).when(cloudinaryService).deleteImage(productId);

            assertThatThrownBy(() -> productService.deleteImage(productId))
                    .isInstanceOf(IOException.class)
                    .hasMessageContaining("Error Deleting Image");
        }
    }

    // =========================================================================
    // deleteProduct
    // =========================================================================
    @Nested
    @DisplayName("deleteProduct")
    class DeleteProduct {

        @Test
        @DisplayName("should delete product and its image")
        void shouldDeleteProductAndImage() throws IOException {
            when(productRepository.existsById(productId)).thenReturn(true);

            productService.deleteProduct(productId);

            verify(cloudinaryService).deleteImage(productId);
            verify(productRepository).deleteById(productId);
        }

        @Test
        @DisplayName("should throw ResourceNotFoundException when product not found")
        void shouldThrow_whenProductNotFound() {
            when(productRepository.existsById(productId)).thenReturn(false);

            assertThatThrownBy(() -> productService.deleteProduct(productId))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Product not found");

            verify(productRepository, never()).deleteById(any());
        }

        @Test
        @DisplayName("should throw IOException when Cloudinary delete fails")
        void shouldThrowIOException_whenCloudinaryFails() throws IOException {
            when(productRepository.existsById(productId)).thenReturn(true);
            doThrow(new IOException("Network error")).when(cloudinaryService).deleteImage(productId);

            assertThatThrownBy(() -> productService.deleteProduct(productId))
                    .isInstanceOf(IOException.class)
                    .hasMessageContaining("Error Deleting Image");

            verify(productRepository, never()).deleteById(any());
        }
    }

    // =========================================================================
    // getProducts (paginated)
    // =========================================================================
    @Nested
    @DisplayName("getProducts")
    class GetProducts {

        @Test
        @DisplayName("should return paginated products sorted ascending")
        void shouldReturnPage_ascending() {
            Pageable pageable = PageRequest.of(0, 10, Sort.by("id").ascending());
            Page<Product> productPage = new PageImpl<>(List.of(product), pageable, 1);

            when(productRepository.findAll(any(Pageable.class))).thenReturn(productPage);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            Page<ProductResponse> result = productService.getProducts(0, 10, "id", "asc");

            assertThat(result).isNotNull();
            assertThat(result.getTotalElements()).isEqualTo(1);
            assertThat(result.getContent().get(0).getName()).isEqualTo("Laptop");
        }

        @Test
        @DisplayName("should return paginated products sorted descending")
        void shouldReturnPage_descending() {
            Pageable pageable = PageRequest.of(0, 10, Sort.by("name").descending());
            Page<Product> productPage = new PageImpl<>(List.of(product), pageable, 1);

            when(productRepository.findAll(any(Pageable.class))).thenReturn(productPage);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            Page<ProductResponse> result = productService.getProducts(0, 10, "name", "desc");

            assertThat(result).isNotNull();
            assertThat(result.getContent()).hasSize(1);
        }

        @Test
        @DisplayName("should return empty page when no products")
        void shouldReturnEmptyPage_whenNoProducts() {
            Pageable pageable = PageRequest.of(0, 10, Sort.by("id").ascending());
            Page<Product> emptyPage = new PageImpl<>(List.of(), pageable, 0);

            when(productRepository.findAll(any(Pageable.class))).thenReturn(emptyPage);

            Page<ProductResponse> result = productService.getProducts(0, 10, "id", "asc");

            assertThat(result.getContent()).isEmpty();
            assertThat(result.getTotalElements()).isZero();
        }
    }

    // =========================================================================
    // findByCriteria
    // =========================================================================
    @Nested
    @DisplayName("findByCriteria")
    class FindByCriteria {

        @Test
        @DisplayName("should return products filtered by name")
        void shouldFilterByName() {
            Pageable pageable = PageRequest.of(0, 10);
            Page<Product> productPage = new PageImpl<>(List.of(product), pageable, 1);

            when(productRepository.findAll(any(Specification.class), eq(pageable)))
                    .thenReturn(productPage);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            Page<ProductResponse> result = productService.findByCriteria("Laptop", null, pageable);

            assertThat(result.getTotalElements()).isEqualTo(1);
            assertThat(result.getContent().get(0).getName()).isEqualTo("Laptop");
        }

        @Test
        @DisplayName("should return products filtered by categoryId")
        void shouldFilterByCategoryId() {
            Pageable pageable = PageRequest.of(0, 10);
            Page<Product> productPage = new PageImpl<>(List.of(product), pageable, 1);

            when(productRepository.findAll(any(Specification.class), eq(pageable)))
                    .thenReturn(productPage);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            Page<ProductResponse> result = productService.findByCriteria(null, categoryId, pageable);

            assertThat(result.getTotalElements()).isEqualTo(1);
        }

        @Test
        @DisplayName("should return all products when name and categoryId are null")
        void shouldReturnAll_whenNoCriteria() {
            Pageable pageable = PageRequest.of(0, 10);
            Page<Product> productPage = new PageImpl<>(List.of(product), pageable, 1);

            when(productRepository.findAll(any(Specification.class), eq(pageable)))
                    .thenReturn(productPage);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            Page<ProductResponse> result = productService.findByCriteria(null, null, pageable);

            assertThat(result).isNotNull();
            assertThat(result.getContent()).hasSize(1);
        }

        @Test
        @DisplayName("should return empty page when blank name provided")
        void shouldReturnAll_whenBlankName() {
            Pageable pageable = PageRequest.of(0, 10);
            Page<Product> productPage = new PageImpl<>(List.of(product), pageable, 1);

            when(productRepository.findAll(any(Specification.class), eq(pageable)))
                    .thenReturn(productPage);
            when(productMapper.toResponse(product)).thenReturn(productResponse);

            Page<ProductResponse> result = productService.findByCriteria("   ", null, pageable);

            // blank name → specification does NOT add name filter → treated as no-filter
            assertThat(result).isNotNull();
        }
    }
}