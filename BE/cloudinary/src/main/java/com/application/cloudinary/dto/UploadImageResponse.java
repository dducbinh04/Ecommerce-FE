package com.application.cloudinary.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UploadImageResponse {
    private String url;
    private String publicId;
}
