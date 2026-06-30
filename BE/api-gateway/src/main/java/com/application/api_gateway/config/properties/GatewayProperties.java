package com.application.api_gateway.config.properties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ConfigurationProperties(prefix = "spring.application.services")
public class GatewayProperties {
    private String authServiceUrl;
    private String userServiceUrl;
    private String productServiceUrl;
    private String cloudinaryServiceUrl;
    private String categoryServiceUrl;
}
