import { request } from "./api";
import { authStore } from "../../stores/authStore";

// export async function request(path, options = {}) {
//   const { headers: customHeaders = {}, ...restOptions } = options;
// //   const accessToken = authStore.getAccessToken();
//   const isFormData = restOptions.body instanceof FormData;

//   const response = await fetch(`${API_BASE_URL}${path}`, {
//     ...restOptions,
//     headers: {
//       ...(isFormData ? {} : { "Content-Type": "application/json" }),
//     //   ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
//       ...customHeaders,
//     },
//   });

//   const payload = await response.json().catch(() => ({}));

//   if (!response.ok) {
//     throw new Error(payload.message || "Yeu cau that bai.");
//   }

//   return payload;
// }

/**
 * Đăng nhập
 * POST /api/v1/auth/signin
 * @param {{ email: string, password: string }} data
 * @returns {{ accessToken: string, refreshToken: string, role: "CUSTOMER"|"ADMIN", isNewUser: boolean }}
 */
export function signIn(data, options = {}) {
    return request("/api/v1/auth/signin", {
        ...options,
        skipAuth: true,
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
        skipAuth: true,
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
    const accessToken = authStore.getAccessToken();

    return request("/api/v1/auth/signout", {
        ...options,
        method: "POST",
        headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...options.headers,
        },
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

let _refreshTimer = null
const REFRESH_INTERVAL_MS = 10 * 60 * 1000 // 10 phút

export function startAutoRefresh() {
    // console.log("[autoRefresh] startAutoRefresh() called");
    stopAutoRefresh();

    _refreshTimer = setInterval(async () => {
        // console.log("[autoRefresh] Tick!", new Date().toLocaleTimeString());
        if (!authStore.isLoggedIn()) {
            stopAutoRefresh();
            return;
        }

        try {
            const tokens = await refreshToken({
                refreshToken: authStore.getRefreshToken(),
            });
            authStore.save({
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                role: authStore.getRole(),
            });
        } catch {
            stopAutoRefresh();
            authStore.clear();
            window.location.href = "/login";
        }
    }, REFRESH_INTERVAL_MS);


}

/**
 * Dừng auto refresh
 */
export function stopAutoRefresh() {
    if (_refreshTimer) {
        clearInterval(_refreshTimer);
        _refreshTimer = null;
    }
}