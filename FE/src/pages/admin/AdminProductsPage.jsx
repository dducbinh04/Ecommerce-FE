import { useEffect, useMemo, useState } from "react";
import { AdminShell } from "../../components/admin-layout/AdminShell";
import { ProductAdminTable } from "../../components/admin-products/ProductAdminTable";
import { adminProducts, productCategories } from "../../components/admin-products/adminProductData";
import { deleteProduct, getCategories, getProducts, getProductsBySearch } from "../../services/api/api.js";

const PAGE_SIZE = 10;

function normalizeCategoryList(data) {
  const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : null;

  if (!items) {
    return productCategories;
  }

  return items.map((category, index) => ({
    id: category.id ?? category._id ?? String(index + 1),
    name: category.name ?? "Không có tên",
  }));
}

function normalizeProduct(product) {
  return {
    id: product.id ?? product._id ?? "",
    name: product.name ?? "",
    description: product.description ?? "",
    quantity: product.quantity ?? 0,
    price: product.price ?? 0,
    imageUrl: product.imageUrl ?? "",
    categoryId: product.categoryId ?? "",
    categoryName: product.categoryName ?? "",
  };
}

function normalizeProductPage(data) {
  const payload = data?.data ?? data;

  if (Array.isArray(payload)) {
    const products = payload.map(normalizeProduct);
    return {
      products,
      totalElements: products.length,
      totalPages: Math.max(1, Math.ceil(products.length / PAGE_SIZE)),
    };
  }

  const products = Array.isArray(payload?.content) ? payload.content.map(normalizeProduct) : [];
  return {
    products,
    totalElements: payload?.totalElements ?? products.length,
    totalPages: payload?.totalPages ?? Math.max(1, Math.ceil((payload?.totalElements ?? products.length) / PAGE_SIZE)),
  };
}

function filterFallbackProducts({ searchTerm, selectedCategory, currentPage }) {
  const filteredProducts = adminProducts.filter((product) => {
    const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalElements = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  return {
    products: filteredProducts.slice(startIndex, startIndex + PAGE_SIZE),
    totalElements,
    totalPages,
  };
}

function applyFallbackProducts({ searchTerm, selectedCategory, currentPage, setProducts, setTotalElements, setTotalPages, setActionError }) {
  const fallback = filterFallbackProducts({ searchTerm, selectedCategory, currentPage });

  setProducts(fallback.products);
  setTotalElements(fallback.totalElements);
  setTotalPages(fallback.totalPages);
  setActionError("API sản phẩm chưa phản hồi, đang dùng dữ liệu mẫu để hiển thị.");
}

export function AdminProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState(productCategories);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [actionError, setActionError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function loadCategories() {
      try {
        const data = await getCategories();
        if (isActive) {
          setCategories(normalizeCategoryList(data));
        }
      } catch (error) {
        console.error("Error fetching product categories:", error);
        if (isActive) {
          setCategories(productCategories);
        }
      }
    }

    loadCategories();

    return () => {
      isActive = false;
    };
  }, []);

  const queryParams = useMemo(
    () => ({
      name: searchTerm.trim() || undefined,
      categoryId: selectedCategory === "all" ? undefined : selectedCategory,
      page: currentPage - 1,
      size: PAGE_SIZE,
      sortBy: "id",
      sortDirection: "asc",
    }),
    [searchTerm, selectedCategory, currentPage]
  );

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      setIsLoading(true);
      try {
        const shouldUseSearch = Boolean(queryParams.name) || Boolean(queryParams.categoryId);
        const data = shouldUseSearch ? await getProductsBySearch(queryParams) : await getProducts(queryParams);
        const normalized = normalizeProductPage(data);

        if (isActive) {
          setProducts(normalized.products);
          setTotalElements(normalized.totalElements);
          setTotalPages(normalized.totalPages);
          setActionError("");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (isActive) {
          applyFallbackProducts({
            searchTerm,
            selectedCategory,
            currentPage,
            setProducts,
            setTotalElements,
            setTotalPages,
            setActionError,
          });
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isActive = false;
    };
  }, [queryParams, searchTerm, selectedCategory, currentPage, reloadToken]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  async function handleDelete(product) {
    const confirmed = window.confirm(`Xóa ${product.name}?`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(product.id);
      setActionError("");
      setReloadToken((value) => value + 1);
    } catch (error) {
      console.error("Error deleting product:", error);
      setActionError("Backend chưa sẵn sàng, chưa thể xóa sản phẩm lúc này.");
    }
  }

  const summary =
    totalElements > 0
      ? `Hiển thị ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, totalElements)} của ${totalElements} sản phẩm`
      : "Không có sản phẩm nào";

  return (
    <AdminShell title="Quản lý sản phẩm">
      <div className="w-full">
        <ProductAdminTable
          products={products}
          selectedCategory={selectedCategory}
          onCategoryChange={(value) => {
            setSelectedCategory(value);
            setCurrentPage(1);
          }}
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
          categories={categories}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            summary,
          }}
          onDelete={handleDelete}
        />
        {isLoading ? <p className="mt-3 text-sm text-luxe-mutedText">Đang tải sản phẩm...</p> : null}
        {actionError ? <p className="mt-3 text-sm text-[#ba1a1a]">{actionError}</p> : null}
      </div>
    </AdminShell>
  );
}
