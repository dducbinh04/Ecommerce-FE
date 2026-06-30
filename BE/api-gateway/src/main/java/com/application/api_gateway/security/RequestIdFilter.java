package com.application.api_gateway.security;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Component
public class RequestIdFilter implements GlobalFilter {
    
    @Override
    public Mono<Void> filter(
        ServerWebExchange exchange,
        GatewayFilterChain chain
    ) {
        var requestId = UUID.randomUUID().toString();

        var request = exchange.getRequest()
            .mutate()
            .header("X-Request-ID", requestId)
            .build();

        return chain.filter(
            exchange.mutate()
                .request(request)
                .build()
        );
    }
}