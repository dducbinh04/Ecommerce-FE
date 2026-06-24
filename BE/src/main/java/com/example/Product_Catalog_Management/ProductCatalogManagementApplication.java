package com.example.Product_Catalog_Management;

import com.example.Product_Catalog_Management.config.CloudinaryProperties;
import com.example.Product_Catalog_Management.config.CorsProperties;
import com.example.Product_Catalog_Management.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
	CorsProperties.class,
	JwtProperties.class,
	CloudinaryProperties.class
})
public class ProductCatalogManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductCatalogManagementApplication.class, args);
	}

}
