package com.example.Product_Catalog_Management.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ConfigurationProperties(prefix = "app.cors")
public class CorsConfig {
    private String allowedOrigins;
}
