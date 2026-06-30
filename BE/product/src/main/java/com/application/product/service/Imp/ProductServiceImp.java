package com.application.product.service.Imp;

import com.application.product.client.CategoryClient;
import com.application.product.client.CloudinaryClient;
import com.application.product.dto.request.CreateProductRequest;
import com.application.product.dto.request.UpdateProductRequest;
import com.application.product.dto.response.CategoryDto;
import com.application.product.dto.response.ProductResponse;
import com.application.product.dto.response.UploadImageResponse;
import com.application.product.entiry.Product;
import com.application.product.entiry.ProductImage;
import com.application.product.exception.BadRequestException;
import com.application.product.exception.ResourceNotFoundException;
import com.application.product.mapper.ProductMapper;
import com.application.product.repository.ProductImageRepository;
import com.application.product.repository.ProductRepository;
import com.application.product.service.ProductService;
import com.application.product.utils.ProductSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductServiceImp implements ProductService {
    private final ProductRepository productRepository;
    private final CloudinaryClient cloudinaryClient;
    private final ProductMapper productMapper;
    private final ProductImageRepository productImageRepository;
    private final CategoryClient categoryClient;
    public static final Integer MAX_IMAGE = 5;


    public ProductResponse getProductById(UUID productId) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product not found")
        );
        CategoryDto categoryDto = categoryClient.getCategory(product.getCategoryId());
        return productMapper.toResponse(product,categoryDto.getName());
    }
    public Page<ProductResponse> findByCriteria(String name, UUID categoryId, Pageable pageable) {
        Specification<Product> specification = (root, query, cb) -> cb.conjunction();
        if(name != null && !name.isBlank()) {
            specification = specification.and(ProductSpecification.byName(name));
        }
        if(categoryId != null) {
            specification = specification.and(ProductSpecification.byCategory(categoryId));
        }
        Page<Product> pageProduct = productRepository.findAll(specification, pageable);

        return pageProduct.map(product -> {
            CategoryDto categoryDto = categoryClient.getCategory(product.getCategoryId());
            return productMapper.toResponse(product,categoryDto.getName());
        });
    }
    @Transactional
    public ProductResponse createProduct(CreateProductRequest createProductRequest) {
        if(createProductRequest.getProductImages().size() > MAX_IMAGE){
            throw new BadRequestException("Product images limit reached");
        }

        Product product = productMapper.toEntity(createProductRequest);
        List<ProductImage> productImageList = new ArrayList<>();


        List<ProductImage> images =
                createProductRequest.getProductImages().stream()
                        .map(upload ->
                                ProductImage.builder()
                                        .imageUrl(upload.getImageUrl())
                                        .publicId(upload.getPublicId())
                                        .build()
                        )
                        .toList();

        product.setImages(productImageList);
        productRepository.save(product);
        CategoryDto categoryDto = categoryClient.getCategory(createProductRequest.getCategoryId());
        return productMapper.toResponse(product, categoryDto.getName());
    }
    @Transactional
    public ProductResponse updateProduct(UpdateProductRequest updateProductRequest, UUID productId) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product not found")
        );
        if (updateProductRequest.getName()!=null && updateProductRequest.getName().isBlank()) {
            throw new BadRequestException("Name cannot be empty");
        }

        productMapper.updateEntity(updateProductRequest,product);
        CategoryDto categoryDto = categoryClient.getCategory(product.getCategoryId());
        return productMapper.toResponse(product,categoryDto.getName());
    }
    @Transactional
    public ProductResponse AddProductImage(List<MultipartFile> productImages, UUID productId) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product not found")
        );
        if(productImages.size() + product.getImages().size() >MAX_IMAGE){
            throw new BadRequestException("Product images limit reached");
        }
        List<UploadImageResponse> imageList = cloudinaryClient.uploadImage(productImages);

        if (imageList.size() != productImages.size()) {
            throw new BadRequestException("Some images failed to upload");
        }

        for(UploadImageResponse uploadImageResponse : imageList){
            ProductImage productImage = ProductImage.builder()
                    .imageUrl(uploadImageResponse.getUrl())
                    .publicId(uploadImageResponse.getPublicId())
                    .build();
            product.getImages().add(productImage);
        }
        productRepository.save(product);
        CategoryDto categoryDto = categoryClient.getCategory(product.getCategoryId());
        return productMapper.toResponse(product, categoryDto.getName());
    }
    @Transactional
    public ProductResponse updateProductImageOrder(UUID productId, List<UUID> productImages) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        if (product.getImages().size() != productImages.size()) {
            throw new BadRequestException("Number of image doesn't match");
        }
        List<ProductImage> productImageList = new ArrayList<>();
        for (UUID imageId : productImages) {
            ProductImage productImage = productImageRepository.findById(imageId).orElseThrow(
                    () -> new ResourceNotFoundException("Product image not found")
            );
            productImageList.add(productImage);
        }
        product.setImages(productImageList);
        productRepository.save(product);
        CategoryDto categoryDto = categoryClient.getCategory(product.getCategoryId());
        return productMapper.toResponse(product,  categoryDto.getName());
    }
    @Transactional
    public ProductResponse deleteProductImage(UUID productId, UUID imageId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        ProductImage image = productImageRepository
                .findById(imageId).orElseThrow(() -> new ResourceNotFoundException("Product image not found"));

        cloudinaryClient.deleteImage(image.getPublicId());

        product.getImages().remove(image);

        productImageRepository.delete(image);
        CategoryDto categoryDto = categoryClient.getCategory(product.getCategoryId());
        return productMapper.toResponse(product,  categoryDto.getName());
    }

    public void  deleteProduct(UUID productId) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product not found")
        );
        for(ProductImage productImage : product.getImages()){
            cloudinaryClient.deleteImage(productImage.getPublicId());
        }
        productRepository.delete(product);
    }
}
