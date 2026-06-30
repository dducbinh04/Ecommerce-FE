package com.application.auth_service.constant;

public final class ApiPath {
    private ApiPath() {}

    public static final String API_V1 = "/api/v1";

    public static final String SWAGGER = "/swagger-ui/**";
    public static final String API_DOC = "/v3/api-docs/**";

    public static final String ACTUATOR = "/actuator/**";
    public static final String ACTUATOR_HEALTH = "/actuator/health";
    public static final String ACTUATOR_INFO = "/actuator/info";

    public static final String AUTH = API_V1 + "/auth";
    public static final String AUTH_SIGN_IN = AUTH + "/signin";
    public static final String AUTH_SIGN_UP = AUTH + "/signup";
    public static final String AUTH_AUTO_SIGN_IN = AUTH + "/auto-signin";
}