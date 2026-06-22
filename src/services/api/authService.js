// import { data } from "autoprefixer";
// import { httpClient } from "./httpClient";

// /**
//  * Sign in
//  * POST /api/v1/auth/signin
//  * @returns { accessToken, refreshToken, role, isNewUser }
//  */

// export async function signIn({email, password}) {
//     const response = await httpClient.post("/auth/signin", {
//         email,
//         password,
//         role: "CUSTOMER",
//     });

//     return response.data;
// }

// /**
//  * Sign up
//  * POST /api/v1/auth/signup
//  * @returns { accessToken, refreshToken, role, isNewUser }
//  */

// export async function signUp({email, password}) {
//     const response = await httpClient.post("/auth/signup", {
//         email,
//         password,
//         role: "CUSTOMER",
//     });

//     return response.data;
// }

// ---------------------------------------------

import { httpClient } from "./httpClient";

// Đổi thành false khi có BE
const USE_MOCK = false;

const MOCK_USERS = [
    { email: "customer@lumina.vn", password: "12345678", role: "CUSTOMER" },
    { email: "admin@lumina.vn", password: "12345678", role: "ADMIN" },
];

const MOCK_TOKEN = "mock.jwt.token";

/**
 * Đăng nhập
 * POST /api/v1/auth/signin
 * @returns { accessToken, refreshToken, role, isNewUser }
 */
export async function signIn({ email, password }) {
    if (USE_MOCK) {
        await delay(600); // network latency

        const user = MOCK_USERS.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) {
            // Giả lập lỗi 401
            const error = new Error("Bad credentials");
            error.response = {
                data: { status: 401, message: "Email hoặc mật khẩu không đúng" },
            };
            throw error;
        }

        return {
            accessToken: MOCK_TOKEN,
            refreshToken: MOCK_TOKEN,
            role: user.role,
            isNewUser: false,
        };
    }

    const response = await httpClient.post("/auth/signin", {
        email,
        password,
        role: "CUSTOMER",
    });
    return response.data;
}

/**
 * Đăng ký
 * POST /api/v1/auth/signup
 * @returns { accessToken, refreshToken, role, isNewUser }
 */
export async function signUp({ email, password }) {
    if (USE_MOCK) {
        await delay(600);

        const exists = MOCK_USERS.find((u) => u.email === email);
        if (exists) {
            // Giả lập lỗi 409 Conflict
            const error = new Error("Email đã tồn tại");
            error.response = {
                data: { status: 409, message: "Email đã tồn tại" },
            };
            throw error;
        }

        // Thêm vào danh sách mock tạm thời
        MOCK_USERS.push({ email, password, role: "CUSTOMER" });

        return {
            accessToken: MOCK_TOKEN,
            refreshToken: MOCK_TOKEN,
            role: "CUSTOMER",
            isNewUser: true,
        };
    }

    const response = await httpClient.post("/auth/signup", {
        email,
        password,
        role: "CUSTOMER",
    });
    return response.data;
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}