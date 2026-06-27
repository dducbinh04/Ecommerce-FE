import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../services/productService";
import { formatCurrency } from "../../utils/format";

export function BestSellers() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await fetchProducts({ page: 0, size: 4 });
                setProducts(response?.content || []);
            } catch {

            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return (
        <section id="best-sellers" className="bg-luxe-surface py-24">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h2 className="fade-in-up font-display text-4xl font-bold tracking-normal text-luxe-ink">Sản Phẩm Nổi Bật</h2>
                    <p className="fade-in-up fade-in-delay-1 mt-4 text-sm leading-6 text-luxe-mutedText">Những sản phẩm được tìm mua nhiều trong nhiều nhóm hàng khác nhau, giúp bạn khám phá nhanh các lựa chọn phù hợp nhất.</p>
                </div>

                {loading ? (
                    <div className="flex min-h-[240px] items-center justify-center text-sm text-luxe-mutedText">Đang tải sản phẩm...</div>
                ) : products.length === 0 ? (
                    <div className="flex min-h-[240px] items-center justify-center text-sm text-luxe-mutedText">Chưa có sản phẩm.</div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product, index) => (
                            <ProductCard key={product.id} product={product} delayClass={`fade-in-delay-${Math.min(index + 1, 4)}`} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function ProductCard({ product, delayClass }) {
    const isOutOfStock = product.quantity === 0;
    const imageUrl = product.imageUrl || product.image_url || product.image || "";
    return (
        <Link to={`/products/${product.id}`} className={`fade-in-up ${delayClass} group block border border-luxe-line bg-white`}>
            <article>
                <div className="relative aspect-[4/5] overflow-hidden bg-luxe-container">
                    <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={imageUrl} alt={product.name} />
                    {isOutOfStock ? (<span className="absolute left-3 top-3 bg-luxe-ink px-2.5 py-1 text-[10px] font-bold text-white">Hết hàng</span>
                    ) : null}
                </div>
                <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase text-luxe-mutedText">{product.category?.name || ""}</p>
                    <h3 className="mt-1 min-h-10 text-sm font-semibold leading-5 text-luxe-ink">{product.name}</h3>
                    <p className="mt-3 text-sm font-bold text-luxe-primary">{formatCurrency(product.price)}</p>
                </div>
            </article>
        </Link>
    );
}
