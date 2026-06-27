import { httpClient } from "./api/httpClient";

export async function fetchProducts({
    page = 0,
    size = 8,
    categoryId,
    name,
    sortBy = "id",
    sortDirection = "asc"
}) {
    const params = {
        page,
        size,
        sort: `${sortBy},${sortDirection}`,
        ...(categoryId ? { categoryId } : {}),
        ...(name ? { name } : {}),
    };

    const response = await httpClient.get("/products/search", { params });
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