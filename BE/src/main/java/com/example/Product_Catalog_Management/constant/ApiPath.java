package com.example.Product_Catalog_Management.constant;

public final class ApiPath {
    private ApiPath() {}

    public static final String API_V1 = "/api/v1";

    public static final String AUTH = API_V1 + "/auth";
    public static final String AUTH_REFRESH = AUTH + "/refresh";
    public static final String AUTH_SIGN_IN = AUTH + "/signin";
    public static final String AUTH_SIGN_UP = AUTH + "/signup";
    public static final String AUTH_AUTO_SIGN_IN = AUTH + "/auto-signin";
    public static final String AUTH_SIGN_OUT = AUTH + "/signout";

    public static final String USERS = API_V1 + "/users";
    public static final String PRODUCTS = API_V1 + "/products";
    public static final String CATEGORIES = API_V1 + "/categories";
}