import { request } from "./api";

/**
 * GET /api/v1/users/me
 */
export function getMyProfile(options = {}) {
    return request("/api/v1/users/me", {
        ...options,
        method: "GET",
    });
}

/**
 * Update profile
 * PUT /api/v1/users/me
 * @param {{ fullName: string, address?: string, birthDate?: string, gender: "MALE"|"FEMALE"}} data
 */
export function updateMyProfile(data, options = {}) {
    return request("/api/v1/users/me", {
        ...options,
        method: "PUT",
        body: JSON.stringify(data),
    });
}

/**
 * Get profile user by ID
 * GET /api/v1/users/{userID}
 */
export function getUserProfileByID(userID, options = {}) {
    return request(`/api/v1/users/${userID}`, {
        ...options,
        method: "GET",
    });
}