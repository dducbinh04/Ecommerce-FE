/**
 * Lưu trữ Token
 * 
 */

const KEYS = {
    accessToken: "auth_access_token",
    refreshToken: "auth_refresh_token",
    role: "auth_role",
}

export const authStore = {
    // Lưu Token sau khi đăng nhập / đăng ký
    save ({accessToken, refreshToken, role}) {
        localStorage.setItem(KEYS.accessToken, accessToken);
        localStorage.setItem(KEYS.refreshToken, refreshToken);
        localStorage.setItem(KEYS.role, role);
    },

    // Lấy access Token
    getAccessToken() {
        return localStorage.getItem(KEYS.accessToken);
    },

    // Lấy refresh Token
    getRefreshToken() {
        return localStorage.getItem(KEYS.refreshToken);
    },

    // Lấy role
    getRole() {
        return localStorage.getItem(KEYS.role);
    },

    // Kiểm tra đăng nhập
    isLoggedIn() {
        return !!localStorage.getItem(KEYS.accessToken);
    },

    // Logout
    clear() {
        Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
    }
};