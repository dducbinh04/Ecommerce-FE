import { useEffect, useMemo, useRef, useState } from "react";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { ProductFilters } from "../../components/products/ProductFilters";
import { ProductGrid } from "../../components/products/ProductGrid";
import { ProductPageHeader } from "../../components/products/ProductPageHeader";
import { ProductPagination } from "../../components/products/ProductPagination";
import { ProductToolbar } from "../../components/products/ProductToolbar";
import { fetchCategories, fetchProducts } from "../../services/productService";
import { PRICE_RANGES } from "../../components/products/productConstants";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

const PAGE_SIZE = 8;
const SEARCH_DEBOUNCE_MS = 300;

export function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [selectedPrice, setSelectedPrice] = useState("Tất cả");
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const debounceTimer = useRef(null);

    function handleSearchChange(e) {
        const value = e.target.value;
        setSearchQuery(value);
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            setDebouncedQuery(value); setCurrentPage(1);
        }, SEARCH_DEBOUNCE_MS);
    }

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await fetchCategories();
                setCategories(data || []);
            } catch {
            }
        }
        loadCategories();
    }, []);

    const categoryMap = useMemo(() => {
        return categories.reduce((acc, category) => {
            acc[category.name] = category.id;
            return acc;
        }, {});
    }, [categories]);

    const selectedCategoryId = selectedCategory === "Tất cả" ? undefined : categoryMap[selectedCategory];

    const sortConfig = useMemo(() => {
        switch (sortBy) {
            case "price-asc":
                return {
                    sortBy: "price",
                    sortDirection: "asc",
                };

            case "price-desc":
                return {
                    sortBy: "price",
                    sortDirection: "desc",
                };

            default:
                return {
                    sortBy: "id",
                    sortDirection: "desc",
                };
        }
    }, [sortBy]);

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);
                setError("");
                const response = await fetchProducts({
                    page: currentPage - 1,
                    size: PAGE_SIZE,
                    categoryId: selectedCategoryId,
                    name: debouncedQuery.trim() || undefined,
                    sortBy: sortConfig.sortBy,
                    sortDirection: sortConfig.sortDirection,
                });
                setProducts(response?.content || []);
                setTotalElements(response?.totalElements || 0);
            } catch {
                setError("Không thể tải danh sách sản phẩm.");
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, [currentPage, selectedCategoryId, debouncedQuery, sortConfig]);

    const displayedProducts = useMemo(() => {
        return products.filter(product =>
            selectedPrice === "Tất cả" ||
            matchesPriceRange(product.price, selectedPrice)
        );
    }, [products, selectedPrice]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedPrice, sortBy]);

    const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));
    const visibleFrom = totalElements === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
    const visibleTo = totalElements === 0 ? 0 : Math.min(currentPage * PAGE_SIZE, totalElements);

    useEffect(() => {
        return () => {
            clearTimeout(debounceTimer.current);
        };
    }, []);

    return (
        <div className="min-h-screen bg-luxe-container text-luxe-ink">
            <Header showSearch={false} />
            <main className="px-4 py-8 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-[1280px] border border-luxe-line bg-luxe-surface px-4 py-12 sm:px-8 lg:px-10">
                    <ProductPageHeader />
                    <div className="flex gap-8">
                        <ProductFilters
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            selectedPrice={selectedPrice}
                            onPriceChange={setSelectedPrice}
                        />
                        <section className="min-w-0 flex-1">
                            <div className="border border-luxe-line bg-white px-4 py-6 sm:px-6 lg:px-8">
                                {error ? (
                                    <p className="py-10 text-center text-sm text-red-500">{error}</p>
                                ) : (
                                    <>
                                        <label className="mb-5 flex h-10 items-center gap-2 border border-luxe-line bg-luxe-muted px-3 text-xs text-luxe-mutedText">
                                            <FaMagnifyingGlass className="h-3.5 w-3.5 shrink-0" />
                                            <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Tìm kiếm theo tên sản phẩm..." className="min-w-0 flex-1 bg-transparent text-luxe-ink outline-none placeholder:text-luxe-mutedText" />
                                            {searchQuery ? (
                                                <button onClick={() => {
                                                    setSearchQuery("");
                                                    setDebouncedQuery("");
                                                    setCurrentPage(1);
                                                }}
                                                    aria-label="Xóa tìm kiếm" className="shrink-0 text-luxe-mutedText transition hover:text-luxe-ink"><RxCross1 /></button>
                                            ) : null}
                                        </label>
                                        <ProductToolbar
                                            totalProducts={totalElements}
                                            visibleFrom={visibleFrom}
                                            visibleTo={visibleTo}
                                            sortBy={sortBy}
                                            onSortChange={setSortBy}
                                            viewMode={viewMode}
                                            onViewModeChange={setViewMode}
                                        />
                                        {loading ? (
                                            <div className="flex min-h-[240px] items-center justify-center text-sm text-luxe-mutedText">
                                                Đang tải sản phẩm...
                                            </div>
                                        ) : (
                                            <>
                                                <ProductGrid products={displayedProducts} viewMode={viewMode} />
                                                <ProductPagination
                                                    currentPage={currentPage}
                                                    totalPages={totalPages}
                                                    onPageChange={setCurrentPage}
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function matchesPriceRange(priceValue, range) {
    switch (range) {
        case PRICE_RANGES[0]:
            return priceValue < 1000000;
        case PRICE_RANGES[1]:
            return priceValue >= 1000000 && priceValue <= 5000000;
        case PRICE_RANGES[2]:
            return priceValue > 5000000;
        default:
            return true;
    }
}
