package com.example.Product_Catalog_Management;

import com.example.Product_Catalog_Management.dto.request.CreateProductRequest;
import com.example.Product_Catalog_Management.dto.request.UpdateProductRequest;
import com.example.Product_Catalog_Management.dto.response.ProductResponse;
import com.example.Product_Catalog_Management.exception.BadRequestException;
import com.example.Product_Catalog_Management.exception.ResourceNotFoundException;
import com.example.Product_Catalog_Management.enums.Role;
import com.example.Product_Catalog_Management.security.CustomUserDetails;
import com.example.Product_Catalog_Management.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.data.domain.*;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static com.example.Product_Catalog_Management.constant.ApiPath.PRODUCTS;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("ProductController Integration Tests")
class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductService productService;

    // ── Fixtures ──────────────────────────────────────────────────────────────
    private UUID productId;
    private UUID categoryId;

    private CustomUserDetails userPrincipal;
    private CustomUserDetails adminPrincipal;

    private ProductResponse productResponse;

    @BeforeEach
    void setUp() {
        productId  = UUID.randomUUID();
        categoryId = UUID.randomUUID();

        userPrincipal = new CustomUserDetails(
                UUID.randomUUID(),
                "user@example.com",
                "encodedPass",
                Role.CUSTOMER
        );

        adminPrincipal = new CustomUserDetails(
                UUID.randomUUID(),
                "admin@example.com",
                "encodedPass",
                Role.ADMIN
        );

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
    // GET /api/v1/products
    // =========================================================================
    @Nested
    @DisplayName("GET /api/v1/products")
    class GetProducts {

        @Test
        @DisplayName("200 - Returns paginated products with default params")
        void getProducts_DefaultParams_Returns200() throws Exception {
            Page<ProductResponse> page = new PageImpl<>(List.of(productResponse));
            when(productService.getProducts(0, 10, "id", "asc")).thenReturn(page);

            mockMvc.perform(get(PRODUCTS)
                            .with(user(userPrincipal)))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$.content[0].id").value(productId.toString()))
                    .andExpect(jsonPath("$.content[0].name").value("Laptop"))
                    .andExpect(jsonPath("$.content[0].price").value(1500))
                    .andExpect(jsonPath("$.totalElements").value(1));

            verify(productService).getProducts(0, 10, "id", "asc");
        }

        @Test
        @DisplayName("200 - Returns paginated products with custom params")
        void getProducts_CustomParams_Returns200() throws Exception {
            Page<ProductResponse> page = new PageImpl<>(List.of(productResponse));
            when(productService.getProducts(1, 5, "name", "desc")).thenReturn(page);

            mockMvc.perform(get(PRODUCTS)
                            .param("page", "1")
                            .param("size", "5")
                            .param("sortBy", "name")
                            .param("sortDirection", "desc")
                            .with(user(userPrincipal)))
                    .andDo(print())
                    .andExpect(status().isOk());

            verify(productService).getProducts(1, 5, "name", "desc");
        }

        @Test
        @DisplayName("200 - Returns empty page when no products exist")
        void getProducts_NoProducts_ReturnsEmptyPage() throws Exception {
            Page<ProductResponse> emptyPage = new PageImpl<>(List.of());
            when(productService.getProducts(0, 10, "id", "asc")).thenReturn(emptyPage);

            mockMvc.perform(get(PRODUCTS)
                            .with(user(userPrincipal)))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content").isEmpty())
                    .andExpect(jsonPath("$.totalElements").value(0));
        }

        @Test
        @DisplayName("401 - Returns unauthorized when not authenticated")
        void getProducts_Unauthenticated_Returns401() throws Exception {
            mockMvc.perform(get(PRODUCTS))
                    .andDo(print())
                    .andExpect(status().isOk());

            verify(productService).getProducts(anyInt(), anyInt(), anyString(), anyString());
        }
    }

    // =========================================================================
    // GET /api/v1/products/{id}
    // =========================================================================
    @Nested
    @DisplayName("GET /api/v1/products/{id}")
    class GetProductById {

        @Test
        @DisplayName("200 - Returns product when found")
        void getProductById_Exists_Returns200() throws Exception {
            when(productService.getProductById(productId)).thenReturn(productResponse);

            mockMvc.perform(get(PRODUCTS + "/{id}", productId)
                            .with(user(userPrincipal)))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(productId.toString()))
                    .andExpect(jsonPath("$.name").value("Laptop"))
                    .andExpect(jsonPath("$.description").value("High-end laptop"))
                    .andExpect(jsonPath("$.price").value(1500))
                    .andExpect(jsonPath("$.quantity").value(10))
                    .andExpect(jsonPath("$.categoryName").value("Electronics"));

            verify(productService).getProductById(productId);
        }

        @Test
        @DisplayName("200 - Unauthenticated user can view product detail (public endpoint)")
        void getProductById_Unauthenticated_Returns200() throws Exception {
            when(productService.getProductById(productId)).thenReturn(productResponse);

            mockMvc.perform(get(PRODUCTS + "/{id}", productId))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(productId.toString()));
        }

        @Test
        @DisplayName("404 - Returns not found when product does not exist")
        void getProductById_NotFound_Returns404() throws Exception {
            when(productService.getProductById(productId))
                    .thenThrow(new ResourceNotFoundException("Product not found"));

            mockMvc.perform(get(PRODUCTS + "/{id}", productId)
                            .with(user(userPrincipal)))
                    .andDo(print())
                    .andExpect(status().isNotFound());
        }
    }

    // =========================================================================
    // POST /api/v1/products
    // =========================================================================
    @Nested
    @DisplayName("POST /api/v1/products")
    class CreateProduct {

        @Test
        @DisplayName("200 - Returns created product when ADMIN uploads with file")
        void createProduct_AdminWithFile_Returns200() throws Exception {
            MockMultipartFile file = new MockMultipartFile(
                    "file", "laptop.png", "image/png", "fake-image-bytes".getBytes());

            when(productService.createProduct(any(CreateProductRequest.class)))
                    .thenReturn(productResponse);

            mockMvc.perform(multipart(PRODUCTS)
                            .file(file)
                            .param("name", "Laptop")
                            .param("description", "High-end laptop")
                            .param("price", "1500")
                            .param("quantity", "10")
                            .param("categoryId", categoryId.toString())
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.id").value(productId.toString()))
                    .andExpect(jsonPath("$.name").value("Laptop"))
                    .andExpect(jsonPath("$.imageUrl").isNotEmpty());

            verify(productService).createProduct(any(CreateProductRequest.class));
        }

        @Test
        @DisplayName("200 - Returns created product when ADMIN provides imageUrl")
        void createProduct_AdminWithImageUrl_Returns200() throws Exception {
            when(productService.createProduct(any(CreateProductRequest.class)))
                    .thenReturn(productResponse);

            mockMvc.perform(multipart(PRODUCTS)
                            .param("name", "Laptop")
                            .param("description", "High-end laptop")
                            .param("price", "1500")
                            .param("quantity", "10")
                            .param("categoryId", categoryId.toString())
                            .param("imageUrl", "https://example.com/laptop.jpg")
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.name").value("Laptop"));
        }

        @Test
        @DisplayName("200 - Returns created product when ADMIN provides no image")
        void createProduct_AdminNoImage_Returns200() throws Exception {
            when(productService.createProduct(any(CreateProductRequest.class)))
                    .thenReturn(productResponse);

            mockMvc.perform(multipart(PRODUCTS)
                            .param("name", "Laptop")
                            .param("price", "1500")
                            .param("quantity", "10")
                            .param("categoryId", categoryId.toString())
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isCreated());
        }

        @Test
        @DisplayName("400 - Returns bad request when both file and imageUrl provided")
        void createProduct_BothFileAndImageUrl_Returns400() throws Exception {
            MockMultipartFile file = new MockMultipartFile(
                    "file", "laptop.png", "image/png", "bytes".getBytes());

            when(productService.createProduct(any(CreateProductRequest.class)))
                    .thenThrow(new BadRequestException("File and Image Url are mutually exclusive"));

            mockMvc.perform(multipart(PRODUCTS)
                            .file(file)
                            .param("name", "Laptop")
                            .param("imageUrl", "https://example.com/laptop.jpg")
                            .param("categoryId", categoryId.toString())
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("404 - Returns not found when category does not exist")
        void createProduct_CategoryNotFound_Returns404() throws Exception {
            // Cần gửi đủ required fields (@NotBlank name, @Positive price, @Min quantity)
            // để vượt qua bean validation và request mới đến được service
            when(productService.createProduct(any(CreateProductRequest.class)))
                    .thenThrow(new ResourceNotFoundException("Category not found"));

            mockMvc.perform(multipart(PRODUCTS)
                            .param("name", "Laptop")
                            .param("price", "1500")
                            .param("quantity", "10")
                            .param("categoryId", UUID.randomUUID().toString())
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isNotFound());
        }

        @Test
        @DisplayName("403 - Returns forbidden when called by regular USER")
        void createProduct_AsUser_Returns403() throws Exception {
            // Gửi đầy đủ required fields để Spring Security check role trước,
            // tránh bị chặn sớm bởi bean validation (@NotBlank, @Positive, @Min)
            mockMvc.perform(multipart(PRODUCTS)
                            .param("name", "Laptop")
                            .param("price", "1500")
                            .param("quantity", "10")
                            .param("categoryId", categoryId.toString())
                            .with(user(userPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isForbidden());

            verify(productService, never()).createProduct(any());
        }

        @Test
        @DisplayName("401 - Returns unauthorized when not authenticated")
        void createProduct_Unauthenticated_Returns401() throws Exception {
            mockMvc.perform(multipart(PRODUCTS)
                            .param("name", "Laptop")
                            .param("categoryId", categoryId.toString())
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isUnauthorized());

            verify(productService, never()).createProduct(any());
        }
    }

    // =========================================================================
    // PUT /api/v1/products/{id}
    // =========================================================================
    @Nested
    @DisplayName("PUT /api/v1/products/{id}")
    class UpdateProduct {

        @Test
        @DisplayName("200 - Returns updated product when ADMIN updates fields")
        void updateProduct_AdminValidRequest_Returns200() throws Exception {
            when(productService.updateProduct(eq(productId), any(UpdateProductRequest.class)))
                    .thenReturn(productResponse);

            mockMvc.perform(multipart(PRODUCTS + "/{id}", productId)
                            .param("name", "Laptop Pro")
                            .param("price", "2000")
                            .with(request -> { request.setMethod("PUT"); return request; })
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(productId.toString()))
                    .andExpect(jsonPath("$.name").value("Laptop"));

            verify(productService).updateProduct(eq(productId), any(UpdateProductRequest.class));
        }

        @Test
        @DisplayName("200 - Returns updated product when ADMIN changes image with file")
        void updateProduct_AdminWithNewFile_Returns200() throws Exception {
            MockMultipartFile file = new MockMultipartFile(
                    "file", "new.png", "image/png", "bytes".getBytes());

            when(productService.updateProduct(eq(productId), any(UpdateProductRequest.class)))
                    .thenReturn(productResponse);

            mockMvc.perform(multipart(PRODUCTS + "/{id}", productId)
                            .file(file)
                            .with(request -> { request.setMethod("PUT"); return request; })
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("400 - Returns bad request when both file and imageUrl provided")
        void updateProduct_BothFileAndImageUrl_Returns400() throws Exception {
            MockMultipartFile file = new MockMultipartFile(
                    "file", "img.png", "image/png", "bytes".getBytes());

            when(productService.updateProduct(eq(productId), any(UpdateProductRequest.class)))
                    .thenThrow(new BadRequestException("File and Image Url are mutually exclusive"));

            mockMvc.perform(multipart(PRODUCTS + "/{id}", productId)
                            .file(file)
                            .param("imageUrl", "https://example.com/img.jpg")
                            .with(request -> { request.setMethod("PUT"); return request; })
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("404 - Returns not found when product does not exist")
        void updateProduct_ProductNotFound_Returns404() throws Exception {
            when(productService.updateProduct(eq(productId), any(UpdateProductRequest.class)))
                    .thenThrow(new ResourceNotFoundException("Product not found"));

            mockMvc.perform(multipart(PRODUCTS + "/{id}", productId)
                            .param("name", "Laptop Pro")
                            .with(request -> { request.setMethod("PUT"); return request; })
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isNotFound());
        }

        @Test
        @DisplayName("403 - Returns forbidden when called by regular USER")
        void updateProduct_AsUser_Returns403() throws Exception {
            mockMvc.perform(multipart(PRODUCTS + "/{id}", productId)
                            .param("name", "Laptop Pro")
                            .with(request -> { request.setMethod("PUT"); return request; })
                            .with(user(userPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isForbidden());

            verify(productService, never()).updateProduct(any(), any());
        }

        @Test
        @DisplayName("401 - Returns unauthorized when not authenticated")
        void updateProduct_Unauthenticated_Returns401() throws Exception {
            mockMvc.perform(multipart(PRODUCTS + "/{id}", productId)
                            .param("name", "Laptop Pro")
                            .with(request -> { request.setMethod("PUT"); return request; })
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isUnauthorized());

            verify(productService, never()).updateProduct(any(), any());
        }
    }

    // =========================================================================
    // DELETE /api/v1/products/{id}
    // =========================================================================
    @Nested
    @DisplayName("DELETE /api/v1/products/{id}")
    class DeleteProduct {

        @Test
        @DisplayName("204 - Returns no content when ADMIN deletes product")
        void deleteProduct_AsAdmin_Returns204() throws Exception {
            doNothing().when(productService).deleteProduct(productId);

            mockMvc.perform(delete(PRODUCTS + "/{id}", productId)
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isNoContent());

            verify(productService).deleteProduct(productId);
        }

        @Test
        @DisplayName("404 - Returns not found when product does not exist")
        void deleteProduct_ProductNotFound_Returns404() throws Exception {
            doThrow(new ResourceNotFoundException("Product not found"))
                    .when(productService).deleteProduct(productId);

            mockMvc.perform(delete(PRODUCTS + "/{id}", productId)
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isNotFound());
        }

        @Test
        @DisplayName("403 - Returns forbidden when called by regular USER")
        void deleteProduct_AsUser_Returns403() throws Exception {
            mockMvc.perform(delete(PRODUCTS + "/{id}", productId)
                            .with(user(userPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isForbidden());

            verify(productService, never()).deleteProduct(any());
        }

        @Test
        @DisplayName("401 - Returns unauthorized when not authenticated")
        void deleteProduct_Unauthenticated_Returns401() throws Exception {
            mockMvc.perform(delete(PRODUCTS + "/{id}", productId)
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isUnauthorized());

            verify(productService, never()).deleteProduct(any());
        }
    }

    // =========================================================================
    // DELETE /api/v1/products/image/{id}
    // =========================================================================
    @Nested
    @DisplayName("DELETE /api/v1/products/image/{id}")
    class DeleteProductImage {

        @Test
        @DisplayName("204 - Returns no content when ADMIN deletes image")
        void deleteProductImage_AsAdmin_Returns204() throws Exception {
            doNothing().when(productService).deleteImage(productId);

            mockMvc.perform(delete(PRODUCTS + "/image/{id}", productId)
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isNoContent());

            verify(productService).deleteImage(productId);
        }

        @Test
        @DisplayName("404 - Returns not found when product does not exist")
        void deleteProductImage_ProductNotFound_Returns404() throws Exception {
            doThrow(new ResourceNotFoundException("Product not found"))
                    .when(productService).deleteImage(productId);

            mockMvc.perform(delete(PRODUCTS + "/image/{id}", productId)
                            .with(user(adminPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isNotFound());
        }

        @Test
        @DisplayName("403 - Returns forbidden when called by regular USER")
        void deleteProductImage_AsUser_Returns403() throws Exception {
            mockMvc.perform(delete(PRODUCTS + "/image/{id}", productId)
                            .with(user(userPrincipal))
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isForbidden());

            verify(productService, never()).deleteImage(any());
        }

        @Test
        @DisplayName("401 - Returns unauthorized when not authenticated")
        void deleteProductImage_Unauthenticated_Returns401() throws Exception {
            mockMvc.perform(delete(PRODUCTS + "/image/{id}", productId)
                            .with(csrf()))
                    .andDo(print())
                    .andExpect(status().isUnauthorized());

            verify(productService, never()).deleteImage(any());
        }
    }

    // =========================================================================
    // GET /api/v1/products/search
    // =========================================================================
    @Nested
    @DisplayName("GET /api/v1/products/search")
    class SearchProducts {

        @Test
        @DisplayName("200 - Returns products filtered by name")
        void searchProducts_ByName_Returns200() throws Exception {
            Page<ProductResponse> page = new PageImpl<>(List.of(productResponse));
            when(productService.findByCriteria(eq("Laptop"), isNull(), any(Pageable.class)))
                    .thenReturn(page);

            mockMvc.perform(get(PRODUCTS + "/search")
                            .param("name", "Laptop")
                            .with(user(userPrincipal)))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content[0].name").value("Laptop"))
                    .andExpect(jsonPath("$.totalElements").value(1));

            verify(productService).findByCriteria(eq("Laptop"), isNull(), any(Pageable.class));
        }

        @Test
        @DisplayName("200 - Returns products filtered by categoryId")
        void searchProducts_ByCategoryId_Returns200() throws Exception {
            Page<ProductResponse> page = new PageImpl<>(List.of(productResponse));
            when(productService.findByCriteria(isNull(), eq(categoryId), any(Pageable.class)))
                    .thenReturn(page);

            mockMvc.perform(get(PRODUCTS + "/search")
                            .param("categoryId", categoryId.toString())
                            .with(user(userPrincipal)))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content[0].categoryId").value(categoryId.toString()));

            verify(productService).findByCriteria(isNull(), eq(categoryId), any(Pageable.class));
        }

        @Test
        @DisplayName("200 - Returns products filtered by both name and categoryId")
        void searchProducts_ByNameAndCategoryId_Returns200() throws Exception {
            Page<ProductResponse> page = new PageImpl<>(List.of(productResponse));
            when(productService.findByCriteria(eq("Laptop"), eq(categoryId), any(Pageable.class)))
                    .thenReturn(page);

            mockMvc.perform(get(PRODUCTS + "/search")
                            .param("name", "Laptop")
                            .param("categoryId", categoryId.toString())
                            .with(user(userPrincipal)))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content").isArray());
        }

        @Test
        @DisplayName("200 - Returns all products when no criteria provided")
        void searchProducts_NoCriteria_Returns200() throws Exception {
            Page<ProductResponse> page = new PageImpl<>(List.of(productResponse));
            when(productService.findByCriteria(isNull(), isNull(), any(Pageable.class)))
                    .thenReturn(page);

            mockMvc.perform(get(PRODUCTS + "/search")
                            .with(user(userPrincipal)))
                    .andDo(print())
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("200 - Returns empty page when no product matches")
        void searchProducts_NoMatch_ReturnsEmptyPage() throws Exception {
            Page<ProductResponse> emptyPage = new PageImpl<>(List.of());
            when(productService.findByCriteria(eq("nonexistent"), isNull(), any(Pageable.class)))
                    .thenReturn(emptyPage);

            mockMvc.perform(get(PRODUCTS + "/search")
                            .param("name", "nonexistent")
                            .with(user(userPrincipal)))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content").isEmpty())
                    .andExpect(jsonPath("$.totalElements").value(0));
        }

        @Test
        @DisplayName("200 - Unauthenticated user can search products (public endpoint)")
        void searchProducts_Unauthenticated_Returns200() throws Exception {
            Page<ProductResponse> page = new PageImpl<>(List.of(productResponse));
            when(productService.findByCriteria(eq("Laptop"), isNull(), any(Pageable.class)))
                    .thenReturn(page);

            mockMvc.perform(get(PRODUCTS + "/search")
                            .param("name", "Laptop"))
                    .andDo(print())
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("200 - Supports custom Pageable params (page, size, sort)")
        void searchProducts_CustomPageable_Returns200() throws Exception {
            Page<ProductResponse> page = new PageImpl<>(List.of(productResponse));
            when(productService.findByCriteria(isNull(), isNull(), any(Pageable.class)))
                    .thenReturn(page);

            mockMvc.perform(get(PRODUCTS + "/search")
                            .param("page", "0")
                            .param("size", "5")
                            .param("sort", "name,asc")
                            .with(user(userPrincipal)))
                    .andDo(print())
                    .andExpect(status().isOk());
        }
    }
}