package com.example.Product_Catalog_Management.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

public interface CloudinaryService {
    public String uploadImage(UUID productId, MultipartFile file) throws IOException;
    public String uploadImage(UUID productId, String imageUrl) throws IOException;
    public void deleteImage(UUID productId) throws IOException;
}
