import { httpClient } from "./api/httpClient";

export async function fetchProducts({
    page = 0,
    size = 8,
    categoryId,
    name,
    sortBy = "id",
    sortDirection = "asc",
}) {
    const response = await httpClient.get("/products/search", {
        params: {
            page,
            size,
            sortBy,
            sortDirection,
            ...(categoryId ? { categoryId } : {}),
            ...(name ? { name } : {}),
        },
    });

    return response.data;
}

export async function fetchCategories() {
    const response = await httpClient.get("/categories");
    return response.data;
}

export async function fetchProductById(id) {
    const response = await httpClient.get(`/products/${id}`);
    return response.data;
}