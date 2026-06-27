import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { formatCurrency } from "../../utils/format";

export function ProductGrid({ products, viewMode = "grid" }) {
    if (!products.length) {
        return (
            <div className="flex min-h-[240px] items-center justify-center border border-dashed border-luxe-line text-sm text-luxe-mutedText">
                Không có sản phẩm phù hợp với bộ lọc hiện tại.
            </div>
        );
    }

    return (
        <div className={viewMode === "list" ? "space-y-4" : "grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4"}>
            {products.map((product) => (
                <ListingProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
        </div>
    );
}

function ListingProductCard({ product, viewMode }) {
    const imageUrl = product.imageUrl || product.image_url || product.image || "";
    const isOutOfStock = Number(product.quantity) <= 0;

    const cardContent = (
        <>
            <div className="relative">
                <Link to={`/products/${product.id}`} className={viewMode === "list" ? "block w-48 shrink-0" : "block aspect-[4/5.3] overflow-hidden bg-luxe-container"}>
                    <img className={`${viewMode === "list" ? "h-40 w-full object-cover" : "h-full w-full object-cover transition duration-500 group-hover:scale-105"}`} src={imageUrl} alt={product.name} />
                </Link>
                {isOutOfStock ? (
                    <span className="absolute left-4 top-4 rounded-full bg-luxe-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                        Hết hàng
                    </span>
                ) : null}
                <button className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg text-luxe-ink transition hover:bg-white" aria-label={`Yêu thích ${product.name}`}>
                    <FaRegHeart />
                </button>
            </div>

            <div className={viewMode === "list" ? "flex-1" : "pt-5"}>
                <Link to={`/products/${product.id}`}>
                    <h3 className="min-h-11 font-display text-base font-bold leading-snug tracking-normal text-luxe-ink transition hover:text-luxe-primarySoft">
                        {product.name}
                    </h3>
                </Link>
                <div className="mt-2 flex items-baseline gap-3">
                    <p className="font-display text-base font-bold tracking-normal text-luxe-primary">{formatCurrency(product.price)}</p>
                </div>
                {product.categoryName ? (
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-luxe-mutedText">{product.categoryName}</p>
                ) : null}
            </div>
        </>
    );

    if (viewMode === "list") {
        return (
            <article className="group flex gap-6 border border-luxe-line bg-white p-4">
                {cardContent}
            </article>
        );
    }

    return (
        <article className="group">
            {cardContent}
        </article>
    );
}
