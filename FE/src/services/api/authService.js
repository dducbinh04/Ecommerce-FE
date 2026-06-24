import { request } from "./api";

/**
 * Đăng nhập
 * POST /api/v1/auth/signin
 * @param {{ email: string, password: string }} data
 * @returns {{ accessToken: string, refreshToken: string, role: "CUSTOMER"|"ADMIN", isNewUser: boolean }}
 */
export function signIn(data, options = {}) {
    return request("/api/v1/auth/signin", {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
    });
}

/**
 * Đăng ký
 * POST /api/v1/auth/signup
 * @param {{ email: string, password: string }} data
 * @returns {{ accessToken: string, refreshToken: string, role: "CUSTOMER"|"ADMIN", isNewUser: boolean }}
 */
export function signUp(data, options = {}) {
    return request("/api/v1/auth/signup", {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
    });
}

/**
 * Đăng xuất
 * POST /api/v1/auth/signout
 * @param {{ refreshToken: string }} data
 * @returns {void}
 */
export function signOut(data, options = {}) {
    return request("/api/v1/auth/signout", {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
    });
}

/**
 * POST /api/v1/auth/refresh
 * @param {{ refreshToken: string }} data
 * @returns {{ accessToken: string, refreshToken: string }}
 */
export function refreshToken(data, options = {}) {
    return request("/api/v1/auth/refresh", {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
    });
}

/**
 * POST /api/v1/auth/auto-signin
 * @param {{ refreshToken: string }} data
 * @returns {{ accessToken: string, refreshToken: string, role: "CUSTOMER"|"ADMIN", isNewUser: boolean }}
 */
export function autoSignIn(data, options = {}) {
    return request("/api/v1/auth/auto-signin", {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
    });
}