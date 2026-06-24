import { useEffect, useMemo, useState } from "react";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { ProductFilters } from "../../components/products/ProductFilters";
import { ProductGrid } from "../../components/products/ProductGrid";
import { ProductPageHeader } from "../../components/products/ProductPageHeader";
import { ProductPagination } from "../../components/products/ProductPagination";
import { ProductToolbar } from "../../components/products/ProductToolbar";
import { fetchCategories, fetchProducts } from "../../services/productService";

const PAGE_SIZE = 8;

export function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [selectedPrice, setSelectedPrice] = useState("Tất cả");
    const [selectedColor, setSelectedColor] = useState("Tất cả");
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const [categoryResponse, productResponse] = await Promise.all([
                    fetchCategories(),
                    fetchProducts({ page: 0, size: 100 }),
                ]);

                setCategories(categoryResponse || []);
                setProducts(productResponse?.content || []);
            } catch (err) {
                setError("Không thể tải danh sách sản phẩm.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const categoryMap = useMemo(() => {
        return categories.reduce((acc, category) => {
            acc[category.name] = category.id;
            return acc;
        }, {});
    }, [categories]);

    const selectedCategoryId = selectedCategory === "Tất cả" ? undefined : categoryMap[selectedCategory];

    useEffect(() => {
        async function reloadProducts() {
            try {
                setLoading(true);
                const response = await fetchProducts({
                    page: 0,
                    size: 100,
                    categoryId: selectedCategoryId,
                });
                setProducts(response?.content || []);
            } catch (err) {
                setError("Không thể tải danh sách sản phẩm.");
            } finally {
                setLoading(false);
            }
        }

        reloadProducts();
    }, [selectedCategoryId]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesPrice = selectedPrice === "Tất cả" || matchesPriceRange(product.price, selectedPrice);
            const matchesColor = selectedColor === "Tất cả" || product.color === selectedColor;
            return matchesPrice && matchesColor;
        }).sort((a, b) => {
            switch (sortBy) {
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                default:
                    return 0;
            }
        });
    }, [products, selectedColor, selectedPrice, sortBy]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedColor, selectedPrice, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
    const pagedProducts = filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);

    const visibleFrom = filteredProducts.length === 0 ? 0 : startIndex + 1;
    const visibleTo = filteredProducts.length === 0 ? 0 : Math.min(startIndex + PAGE_SIZE, filteredProducts.length);

    return (
        <div className="min-h-screen bg-luxe-container text-luxe-ink">
            <Header showSearch={false} />
            <main className="px-4 py-8 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-[1280px] border border-luxe-line bg-luxe-surface px-4 py-12 sm:px-8 lg:px-10">
                    <ProductPageHeader />
                    <div className="flex gap-8">
                        <ProductFilters
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            selectedPrice={selectedPrice}
                            onPriceChange={setSelectedPrice}
                            selectedColor={selectedColor}
                            onColorChange={setSelectedColor}
                        />
                        <section className="min-w-0 flex-1">
                            <div className="border border-luxe-line bg-white px-4 py-6 sm:px-6 lg:px-8">
                                {error ? (
                                    <p className="py-10 text-center text-sm text-red-500">{error}</p>
                                ) : (
                                    <>
                                        <ProductToolbar
                                            totalProducts={filteredProducts.length}
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
                                                <ProductGrid products={pagedProducts} viewMode={viewMode} />
                                                <ProductPagination
                                                    currentPage={safeCurrentPage}
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
        case "Dưới 1.000.000đ":
            return priceValue < 1000000;
        case "1.000.000đ - 5.000.000đ":
            return priceValue >= 1000000 && priceValue <= 5000000;
        case "Trên 5.000.000đ":
            return priceValue > 5000000;
        default:
            return true;
    }
}
