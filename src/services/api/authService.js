import { data } from "autoprefixer";
import { httpClient } from "./httpClient";

/**
 * Sign in
 * POST /api/v1/auth/signin
 */

export async function signIn({email, password}) {
    const response = await httpClient.post("/auth/signin", {
        email,
        password,
        role: "CUSTOMER",
    });

    return response.data;
}

/**
 * Sign up
 * POST /api/v1/auth/signup
 */

export async function signUp({email, password}) {
    const response = await httpClient.post("/auth/signup", {
        email,
        password,
        role: "CUSTOMER",
    });

    return response.data;
}