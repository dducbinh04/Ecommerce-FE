package com.example.Product_Catalog_Management.service.imp;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.Product_Catalog_Management.exception.BadRequestException;
import com.example.Product_Catalog_Management.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImp implements CloudinaryService {
    private final Cloudinary cloudinary;
    public String uploadImage(UUID productId, MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Image file must not be empty");
        }
        String publicId = productId.toString();
        return cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "public_id", publicId,
                        "overwrite", true,
                        "invalidate", true
                )).get("secure_url").toString();
    }
    public String uploadImage(UUID productId, String imageUrl) throws IOException {
        String publicId = productId.toString();
        return cloudinary.uploader().upload(imageUrl,
                ObjectUtils.asMap(
                        "public_id", publicId,
                        "overwrite", true,
                        "invalidate", true
                )).get("secure_url").toString();
    }
    public void deleteImage(UUID productId) throws IOException {
        String publicId = productId.toString();
        if (publicId == null || publicId.isBlank()) {
            return;
        }
        Map result = cloudinary.uploader().destroy(
                publicId,
                ObjectUtils.asMap("invalidate", true)
        );
        String deleteResult = (String) result.get("result");
        if (!"ok".equals(deleteResult) && !"not found".equals(deleteResult)) {
            throw new RuntimeException("Delete image failed");
        }
    }
}
