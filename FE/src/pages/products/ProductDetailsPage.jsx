import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { ProductDetailTabs } from "../../components/product-detail/ProductDetailTabs";
import { ProductGallery } from "../../components/product-detail/ProductGallery";
import { ProductPurchasePanel } from "../../components/product-detail/ProductPurchasePanel";
import { fetchProductById } from "../../services/productService";

export function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProduct() {
            try {
                setLoading(true);
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (err) {
                setError("Không thể tải thông tin sản phẩm.");
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            loadProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-luxe-container text-luxe-ink">
                <Header />
                <main className="px-4 py-8 sm:px-6 lg:px-10">
                    <div className="mx-auto max-w-[1280px] border border-luxe-line bg-luxe-surface px-4 py-8 text-center text-sm text-luxe-mutedText">
                        Đang tải sản phẩm...
                    </div>
                </main>
                <Footer newsletter />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-luxe-container text-luxe-ink">
                <Header />
                <main className="px-4 py-8 sm:px-6 lg:px-10">
                    <div className="mx-auto max-w-[1280px] border border-luxe-line bg-luxe-surface px-4 py-8 text-center text-sm text-red-500">
                        {error || "Không tìm thấy sản phẩm."}
                    </div>
                </main>
                <Footer newsletter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-luxe-container text-luxe-ink">
            <Header />
            <main className="px-4 py-8 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-[1280px] border border-luxe-line bg-luxe-surface px-4 py-8 sm:px-8 lg:px-10">
                    <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-luxe-mutedText">
                        <span>Trang chủ</span>
                        <span>›</span>
                        <span>{product.categoryName || "Sản phẩm"}</span>
                        <span>›</span>
                        <span className="text-luxe-ink">{product.name}</span>
                    </nav>

                    <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
                        <ProductGallery product={product} />
                        <ProductPurchasePanel product={product} />
                    </div>

                    <ProductDetailTabs product={product} />
                </div>
            </main>
            <Footer newsletter />
        </div>
    );
}
