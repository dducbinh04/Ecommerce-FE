import { useMemo, useState } from "react";
import { GrDeliver } from "react-icons/gr";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { formatCurrency } from "../../utils/format";

export function ProductPurchasePanel({ product }) {
    const [quantity, setQuantity] = useState(1);

    const stockLabel = useMemo(() => {
        if (product.quantity === 0) return "Hết hàng";
        if (product.quantity <= 5) return `Chỉ còn ${product.quantity} sản phẩm`;
        return "Còn hàng";
    }, [product.quantity]);

    const isOutOfStock = product.quantity === 0;
    return (
        <section className="bg-luxe-surface">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-luxe-gold">{product.category?.name || "Sản phẩm"}</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-normal text-luxe-ink lg:text-5xl">{product.name}</h1>

            <div className="mt-6 flex items-end gap-4 border-b border-luxe-line pb-5">
                <p className="font-display text-3xl font-bold tracking-normal text-luxe-primary">{formatCurrency(product.price)}</p>
            </div>

            <p className="mt-6 text-sm leading-7 text-luxe-mutedText">{product.description}</p>
            <p className={`mt-3 text-sm font-medium ${isOutOfStock ? "text-red-500" : "text-luxe-mutedText"}`}>{stockLabel}</p>

            <div className="mt-7 grid grid-cols-[112px_1fr] gap-3">
                <div className="grid h-12 grid-cols-3 border border-luxe-line bg-white text-sm font-semibold">
                    <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Giảm số lượng" disabled={isOutOfStock} className="disabled:opacity-40">-</button>
                    <span className="grid place-items-center">{quantity}</span>
                    <button onClick={() => setQuantity((value) => Math.min(product.quantity, value + 1))} aria-label="Tăng số lượng" disabled={isOutOfStock} className="disabled:opacity-40">+</button>
                </div>
                <button disabled={isOutOfStock} className="h-12 bg-luxe-primary text-sm font-bold uppercase text-white transition hover:bg-luxe-primarySoft disabled:cursor-not-allowed disabled:opacity-50">
                    Thêm vào giỏ hàng
                </button>
            </div>
            <button disabled={isOutOfStock} className="mt-3 h-12 w-full bg-luxe-primary text-sm font-bold uppercase text-white transition hover:bg-luxe-primarySoft disabled:cursor-not-allowed disabled:opacity-50">
                Mua Ngay
            </button>

            <div className="mt-8 grid grid-cols-2 gap-5 border-t border-luxe-line pt-5 text-xs text-luxe-mutedText">
                <div className="flex items-center gap-2">
                    <span><GrDeliver /></span>
                    <span>Miễn phí giao hàng</span>
                </div>
                <div className="flex items-center gap-2">
                    <span><IoShieldCheckmarkOutline /></span>
                    <span>Bảo hành 5 năm</span>
                </div>
            </div>
        </section>
    );
}
