package com.example.categoryservice.constant;

public final class ApiPath {
    private ApiPath() {}

    public static final String API_V1 = "/api/v1";

    public static final String SWAGGER = "/swagger-ui/**";
    public static final String API_DOC = "/v3/api-docs/**";

    public static final String ACTUATOR = "/actuator/**";
    public static final String ACTUATOR_HEALTH = "/actuator/health";
    public static final String ACTUATOR_INFO = "/actuator/info";

    public static final String CATEGORIES = API_V1 + "/categories";
    public static final String CATEGORIES_ID = CATEGORIES + "/{id}";
    public static final String CATEGORIES_BY_IDS = CATEGORIES + "/by-ids";
    public static final String CATEGORIES_MAP_BY_IDS = CATEGORIES + "/map-by-ids";
}