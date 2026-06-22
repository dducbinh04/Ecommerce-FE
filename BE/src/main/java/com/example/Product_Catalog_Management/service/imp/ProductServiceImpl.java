package com.example.Product_Catalog_Management.service.imp;

import com.example.Product_Catalog_Management.dto.request.CreateProductRequest;
import com.example.Product_Catalog_Management.dto.request.UpdateProductRequest;
import com.example.Product_Catalog_Management.dto.response.ProductResponse;
import com.example.Product_Catalog_Management.entity.Category;
import com.example.Product_Catalog_Management.exception.BadRequestException;
import com.example.Product_Catalog_Management.exception.ResourceNotFoundException;
import com.example.Product_Catalog_Management.mapper.ProductMapper;
import com.example.Product_Catalog_Management.repository.CategoryRepository;
import com.example.Product_Catalog_Management.repository.ProductRepository;
import com.example.Product_Catalog_Management.service.CloudinaryService;
import com.example.Product_Catalog_Management.service.ProductService;
import com.example.Product_Catalog_Management.entity.Product;
import com.example.Product_Catalog_Management.utils.ProductSpecification;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service

public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;
    private final CloudinaryService cloudinaryService;
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository,
                              ProductMapper productMapper,
                              CategoryRepository categoryRepository,
                              CloudinaryService cloudinaryService) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.categoryRepository = categoryRepository;
        this.cloudinaryService = cloudinaryService;
    }
    public ProductResponse getProductById(UUID id) {
       Product product = productRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Product not found"));
       return productMapper.toResponse(product);
    }
    @Transactional
    public ProductResponse createProduct(CreateProductRequest createProductRequest) throws IOException {
        Product product = productMapper.toEntity(createProductRequest);
        Category category =  categoryRepository.findById(createProductRequest.getCategoryId()).orElseThrow(()->new ResourceNotFoundException("Category not found"));
        product.setCategory(category);

        product = productRepository.save(product);

        boolean hasFile = createProductRequest.getFile()!=null && !createProductRequest.getFile().isEmpty();
        boolean hasImageUrl = createProductRequest.getImageUrl()!=null && !createProductRequest.getImageUrl().isBlank();
        if(hasFile && hasImageUrl){
            throw new BadRequestException("File and Image Url are mutually exclusive");
        }
        if(hasFile){
            try{
            String url = cloudinaryService.uploadImage(product.getId(),createProductRequest.getFile());
            product.setImageUrl(url);
            }
            catch(IOException e){
                throw new IOException("Error Uploading Image");
            }

        }
        else if(hasImageUrl){
            try{
                String url = cloudinaryService.uploadImage(product.getId(),createProductRequest.getImageUrl());
                product.setImageUrl(url);
            }
            catch(IOException e){
                throw new IOException("Error Uploading Image");
            }
        }

        return productMapper.toResponse(productRepository.save(product));
    }
    @Transactional
    public ProductResponse updateProduct(
            UUID id,
            UpdateProductRequest updateProductRequest) throws IOException {
        Product product = productRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Product not found"));
        if(updateProductRequest.getCategoryId()!=null){
            Category category =  categoryRepository.findById(updateProductRequest.getCategoryId()).orElseThrow(()->new RuntimeException("Category not found"));
            product.setCategory(category);
        }
        productMapper.updateEntity(updateProductRequest, product);

        boolean hasFile = updateProductRequest.getFile()!=null && !updateProductRequest.getFile().isEmpty();
        boolean hasImageUrl = updateProductRequest.getImageUrl()!=null && !updateProductRequest.getImageUrl().isBlank();
        if(hasFile && hasImageUrl){
            throw new BadRequestException("File and Image Url are mutually exclusive");
        }
        if(hasFile){
            try{
                String url = cloudinaryService.uploadImage(product.getId(),updateProductRequest.getFile());
                product.setImageUrl(url);
            }
            catch(IOException e){
                throw new IOException("Error Uploading Image");
            }

        }
        else if(hasImageUrl){
            try{
                String url = cloudinaryService.uploadImage(product.getId(),updateProductRequest.getImageUrl());
                product.setImageUrl(url);
            }
            catch(IOException e){
                throw new IOException("Error Uploading Image");
            }
        }
        return productMapper.toResponse(productRepository.save(product));
    }
    public void deleteImage(UUID id) throws IOException {
        Product product = productRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Product not found"));
        try{
            cloudinaryService.deleteImage(id);
        }
        catch(IOException e){
            throw new IOException("Error Deleting Image");
        }
        product.setImageUrl(null);
        productRepository.save(product);
    }
    public void deleteProduct(UUID id) throws IOException {
        if(!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found");
        }
        try{
            cloudinaryService.deleteImage(id);
        }
        catch(IOException e){
            throw new IOException("Error Deleting Image");
        }
        productRepository.deleteById(id);
    }
    public Page<ProductResponse> getProducts(int page, int size,  String sortBy, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Product> pageProduct = productRepository.findAll(pageable);
        return pageProduct.map(productMapper::toResponse);
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
        return pageProduct.map(productMapper::toResponse);
    }
}
