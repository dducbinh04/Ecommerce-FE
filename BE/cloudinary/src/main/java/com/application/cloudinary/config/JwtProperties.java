package com.application.cloudinary.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ConfigurationProperties(prefix = "spring.application.security.jwt")
public class JwtProperties {
    private String secretKey;
}
