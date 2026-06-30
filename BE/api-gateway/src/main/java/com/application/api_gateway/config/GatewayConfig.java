package com.application.api_gateway.config;

import com.application.api_gateway.config.properties.GatewayProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.GatewayFilterSpec;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.gateway.route.builder.UriSpec;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.function.Function;

import static com.application.api_gateway.constant.ServicePath.*;

@Configuration
@RequiredArgsConstructor
public class GatewayConfig {

    private final GatewayProperties properties;

    @Bean
    public RedisRateLimiter redisRateLimiter() {
        return new RedisRateLimiter(5, 10);
    }

    private Function<GatewayFilterSpec, UriSpec> rateLimitedRoute(
        RedisRateLimiter rateLimiter,
        KeyResolver keyResolver
    ) {
        return filterSpec -> filterSpec
            .requestRateLimiter(config -> {
                config.setRateLimiter(rateLimiter);
                config.setKeyResolver(keyResolver);
            });
    }

    @Bean
    public RouteLocator gatewayRoutes(
        RouteLocatorBuilder builder,
        RedisRateLimiter rateLimiter,
        KeyResolver keyResolver
    ) {
        return builder.routes()

            .route(AUTH_SERVICE, r -> r
                .path(AUTH_PATH)
                .filters(rateLimitedRoute(rateLimiter, keyResolver))
                .uri(properties.getAuthServiceUrl())
            )

            .route(USER_SERVICE, r -> r
                .path(USER_PATH)
                .filters(rateLimitedRoute(rateLimiter, keyResolver))
                .uri(properties.getUserServiceUrl())
            )

            .route(PRODUCT_SERVICE, r -> r
                .path(PRODUCT_PATH)
                .filters(rateLimitedRoute(rateLimiter, keyResolver))
                .uri(properties.getProductServiceUrl())
            )

            .route(FILE_SERVICE, r -> r
                .path(FILE_PATH)
                .filters(rateLimitedRoute(rateLimiter, keyResolver))
                .uri(properties.getCloudinaryServiceUrl())
            )

            .route(CATEGORY_SERVICE, r -> r
                .path(CATEGORY_PATH)
                .filters(rateLimitedRoute(rateLimiter, keyResolver))
                .uri(properties.getCategoryServiceUrl())
            )

            .build();
    }
}