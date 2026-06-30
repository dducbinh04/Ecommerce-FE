package com.application.product.client;

import com.application.product.dto.response.CategoryDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@FeignClient(name = "category-client", url = "http://category-service:8085")
public interface CategoryClient {
    @GetMapping(value = "/api/v1/categories/{id}")
    CategoryDto getCategory(@PathVariable("id") UUID categoryId);
    @GetMapping(value = "/api/v1/categories/batch")
    Map<UUID,String> getCategories(@RequestBody List<UUID> categoryIds);
}
