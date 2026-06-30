package com.application.product.client;

import com.application.product.dto.response.UploadImageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "cloudinary-service", url = "http://cloudinary-service:8084")
public interface CloudinaryClient {
    @PostMapping(
            value = "api/v1/cloudinary/product/image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public List<UploadImageResponse> uploadImage(@RequestPart("file") List<MultipartFile> files);
    @DeleteMapping(value = "/api/v1/cloudinary/image/{id}")
    public void deleteImage(@PathVariable String id);
}
