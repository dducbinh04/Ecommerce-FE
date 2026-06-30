package com.application.product.constant;

public final class ApiPath {
    private ApiPath() {}

    public static final String API_V1 = "/api/v1";

    public static final String SWAGGER = "/swagger-ui/**";
    public static final String API_DOC = "/v3/api-docs/**";

    public static final String ACTUATOR = "/actuator/**";
    public static final String ACTUATOR_HEALTH = "/actuator/health";
    public static final String ACTUATOR_INFO = "/actuator/info";

    public static final String PRODUCTS = API_V1 + "/products";
    public static final String PRODUCT_SEARCH = PRODUCTS + "/search";
    public static final String PRODUCT_DETAILS = PRODUCTS + "/{id}";
}