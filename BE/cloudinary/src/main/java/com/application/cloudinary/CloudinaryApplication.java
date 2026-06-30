package com.application.cloudinary;

import com.application.cloudinary.config.CloudinaryProperties;
import com.application.cloudinary.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({JwtProperties.class, CloudinaryProperties.class})
public class CloudinaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(CloudinaryApplication.class, args);
	}

}
