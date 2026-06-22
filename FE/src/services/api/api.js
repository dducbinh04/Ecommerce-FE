const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

function toQueryString(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null && item !== "") {
          searchParams.append(key, String(item));
        }
      });
      return;
    }

    searchParams.append(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export async function request(path, options = {}) {
  const { headers: customHeaders = {}, ...restOptions } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Yeu cau that bai.");
  }

  return payload;
}

export function getCategories(options = {}) {
  return request("/api/v1/categories", { ...options, method: "GET" });
}

export function postCategory(data, options = {}) {
  return request("/api/v1/categories", { ...options, method: "POST", body: JSON.stringify(data) });
}

export function getCategoryById(id, options = {}) {
  return request(`/api/v1/categories/${id}`, { ...options, method: "GET" });
}

export function putCategory(id, data, options = {}) {
  return request(`/api/v1/categories/${id}`, { ...options, method: "PUT", body: JSON.stringify(data) });
}

export function deleteCategory(id, options = {}) {
  return request(`/api/v1/categories/${id}`, { ...options, method: "DELETE" });
}


export function getProducts(params = {}, options = {}) {
  return request(`/api/v1/products${toQueryString(params)}`, { ...options, method: "GET" });
}

export function postProduct(data, options = {}) {
  return request("/api/v1/products", { ...options, method: "POST", body: JSON.stringify(data) });
}

export function getProductById(id, options = {}) {
  return request(`/api/v1/products/${id}`, { ...options, method: "GET" });
}

export function putProduct(id, data, options = {}) {
  return request(`/api/v1/products/${id}`, { ...options, method: "PUT", body: JSON.stringify(data) });
}

export function deleteProduct(id, options = {}) {
  return request(`/api/v1/products/${id}`, { ...options, method: "DELETE" });
}

export function getProductsBySearch(params = {}, options = {}) {
  return request(`/api/v1/products/search${toQueryString(params)}`, { ...options, method: "GET" });
}
