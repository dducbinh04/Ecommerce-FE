package com.example.Product_Catalog_Management;

import com.example.Product_Catalog_Management.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({JwtProperties.class})
public class ProductCatalogManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductCatalogManagementApplication.class, args);
	}

}
