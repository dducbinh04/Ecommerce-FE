package com.application.cloudinary.service.Imp;

import com.application.cloudinary.dto.UploadImageResponse;
import com.application.cloudinary.exception.BadRequestException;
import com.application.cloudinary.service.CloudinaryService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImp implements CloudinaryService {
    private final Cloudinary cloudinary;
    private static final Integer MAX_IMAGE = 5;

    public UploadImageResponse uploadUserImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Image file must not be empty");
        }
        Map result =  cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "overwrite", true,
                        "invalidate", true
                ));
        return UploadImageResponse.builder()
                .publicId(result.get("public_id").toString())
                .url(result.get("secure_url").toString())
                .build();
    }
    public List<UploadImageResponse> UploadProductImage(List<MultipartFile> files) throws IOException{
        if (files == null || files.isEmpty()) {
            throw new BadRequestException("Image file must not be empty");
        }
        List<UploadImageResponse> uploadImageResponses = new ArrayList<>();
        for (MultipartFile file : files) {
           Map result =  cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "overwrite", true,
                            "invalidate", true
                    ));
           uploadImageResponses.add(UploadImageResponse.builder()
                           .url(result.get("secure_url").toString())
                           .publicId(result.get("public_id").toString())
                   .build());

        }
        return uploadImageResponses;
    }
    public void deleteProductImage(String publicId) throws IOException {
        if (publicId == null || publicId.isEmpty()) {
            throw new BadRequestException("Public ID must not be empty");
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

    public UploadImageResponse updateImage(String publicId, MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Image file must not be empty");
        }
        Map result =  cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "public_id", publicId,
                        "overwrite", true,
                        "invalidate", true
                ));
        return UploadImageResponse.builder()
                .publicId(result.get("public_id").toString())
                .url(result.get("secure_url").toString())
                .build();
    }

}
