package com.application.cloudinary.controller;

import com.application.cloudinary.dto.UploadImageResponse;
import com.application.cloudinary.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/cloudinary")
@RequiredArgsConstructor
public class CloudinaryController {
    private final CloudinaryService cloudinary;

    @PostMapping("/image/user")
    public ResponseEntity<UploadImageResponse> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(cloudinary.uploadUserImage(file));
    }
    @PutMapping("/image/user/{publicId}")
    public ResponseEntity<UploadImageResponse> updateImage(@PathVariable("publicId") String publicId, @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(cloudinary.updateImage(publicId, file));
    }

    @PostMapping("/product/image")
    public ResponseEntity<List<UploadImageResponse>> UploadProductImage(@RequestParam("file") List<MultipartFile> files) throws IOException {
        return ResponseEntity.ok(cloudinary.UploadProductImage(files));
    }
    @DeleteMapping("/image/{id}")
    public ResponseEntity<?> deleteProductImage(@PathVariable String publicId) throws IOException {
        cloudinary.deleteProductImage(publicId);
        return ResponseEntity.noContent().build();
    }
}
