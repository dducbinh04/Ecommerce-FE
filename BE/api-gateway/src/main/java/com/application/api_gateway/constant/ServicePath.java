package com.application.api_gateway.constant;

public final class ServicePath {
    public ServicePath() {}

    public static final String AUTH_SERVICE = "auth-service";
    public static final String USER_SERVICE = "user-service";
    public static final String PRODUCT_SERVICE = "product-service";
    public static final String FILE_SERVICE = "file-service";
    public static final String CATEGORY_SERVICE = "category-service";

    public static final String AUTH_PATH = "/api/v1/auth/**";
    public static final String USER_PATH = "/api/v1/users/**";
    public static final String PRODUCT_PATH = "/api/v1/products/**";
    public static final String FILE_PATH = "/api/v1/files/**";
    public static final String CATEGORY_PATH = "/api/v1/categories/**";
}
