package com.application.product.utils;

import com.application.product.entiry.Product;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class ProductSpecification {
    public static Specification<Product> byName(String name) {
        return ((root, query, criteriaBuilder)
                -> criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
    }
    public static Specification<Product> byCategory(UUID id) {
        return ((root, query, criteriaBuilder)
                -> criteriaBuilder.equal(root.get("category").get("id"), id) );
    }
}
