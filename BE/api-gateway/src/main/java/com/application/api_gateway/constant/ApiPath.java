package com.application.api_gateway.constant;

import org.springframework.http.HttpMethod;

import java.util.List;
import java.util.Map;

public final class ApiPath {
    private ApiPath() {}

    public static final String API_V1 = "/api/v1";

    public static final String SWAGGER = "/swagger-ui/**";
    public static final String API_DOC = "/v3/api-docs/**";

    public static final String HOME = "/";

    public static final String ACTUATOR = "/actuator/**";
    public static final String ACTUATOR_HEALTH = "/actuator/health";
    public static final String ACTUATOR_INFO = "/actuator/info";

    public static final String AUTH = API_V1 + "/auth";
    public static final String AUTH_SIGN_IN = AUTH + "/signin";
    public static final String AUTH_SIGN_UP = AUTH + "/signup";
    public static final String AUTH_AUTO_SIGN_IN = AUTH + "/auto-signin";

    public static final String USERS = API_V1 + "/users";
    public static final String USERS_ME = USERS + "/me";
    public static final String USERS_ID = USERS + "/{id}";

    public static final String PRODUCTS = API_V1 + "/products";

    public static final String PRODUCTS_ID = PRODUCTS + "/{id}";
    public static final String PRODUCTS_SEARCH = PRODUCTS + "/search";

    public static final String CATEGORIES = PRODUCTS + "/categories";
    public static final String CATEGORIES_ID = CATEGORIES + "/{id}";

    public static final Map<HttpMethod, List<String>> PUBLIC_PATHS =
        Map.of(
            HttpMethod.GET, List.of(
                SWAGGER,
                API_DOC,
                HOME,
                PRODUCTS,
                PRODUCTS_ID,
                PRODUCTS_SEARCH,
                CATEGORIES,
                CATEGORIES_ID
            ),

            HttpMethod.POST, List.of(
                AUTH_SIGN_IN,
                AUTH_SIGN_UP,
                AUTH_AUTO_SIGN_IN
            )
        );
}