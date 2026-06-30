package com.application.cloudinary.service;

import com.application.cloudinary.dto.UploadImageResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface CloudinaryService {
    public UploadImageResponse uploadUserImage(MultipartFile file) throws IOException;
    public List<UploadImageResponse> UploadProductImage(List<MultipartFile> files) throws IOException;
    public void deleteProductImage(String publicId) throws IOException;
    public UploadImageResponse updateImage(String publicId, MultipartFile file) throws IOException;
}
