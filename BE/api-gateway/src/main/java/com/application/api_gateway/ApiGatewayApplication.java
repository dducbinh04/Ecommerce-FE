package com.application.api_gateway;

import com.application.api_gateway.config.properties.CorsProperties;
import com.application.api_gateway.config.properties.GatewayProperties;
import com.application.api_gateway.config.properties.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
	GatewayProperties.class,
	JwtProperties.class,
	CorsProperties.class
})
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

}
