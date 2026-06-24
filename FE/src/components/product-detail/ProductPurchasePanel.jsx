import { useMemo, useState } from "react";
import { GrDeliver } from "react-icons/gr";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { formatCurrency } from "../../utils/format";

export function ProductPurchasePanel({ product }) {
    const availableColors = Array.isArray(product.colors) ? product.colors : [];
    const firstColor = availableColors.find((color) => color.active)?.name || availableColors[0]?.name || "";

    const [selectedColor, setSelectedColor] = useState(firstColor);
    const [quantity, setQuantity] = useState(1);

    const stockLabel = useMemo(() => {
        if (product.quantity === 0) return "Hết hàng";
        if (product.quantity <= 5) return `Chỉ còn ${product.quantity} sản phẩm`;
        return "Còn hàng";
    }, [product.quantity]);

    return (
        <section className="bg-luxe-surface">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-luxe-gold">{product.categoryName || "Sản phẩm"}</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-normal text-luxe-ink lg:text-5xl">{product.name}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-base text-luxe-gold">★★★★★</span>
                <span className="text-sm text-luxe-mutedText">5 (0 nhận xét)</span>
            </div>

            <div className="mt-6 flex items-end gap-4 border-b border-luxe-line pb-5">
                <p className="font-display text-3xl font-bold tracking-normal text-luxe-primary">{formatCurrency(product.price)}</p>
                {product.oldPrice ? <p className="text-base text-luxe-mutedText line-through">{formatCurrency(product.oldPrice)}</p> : null}
            </div>

            <p className="mt-6 text-sm leading-7 text-luxe-mutedText">{product.description}</p>
            <p className="mt-3 text-sm font-medium text-luxe-mutedText">{stockLabel}</p>

            {availableColors.length ? (
                <div className="mt-6">
                    <p className="text-sm font-bold text-luxe-ink">Màu sắc: {selectedColor}</p>
                    <div className="mt-3 flex gap-3">
                        {availableColors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color.name)}
                                className={`h-9 w-9 rounded-md border p-1 ${selectedColor === color.name ? "border-luxe-primary" : "border-luxe-line"}`}
                                aria-label={color.name}
                            >
                                <span className="block h-full w-full rounded" style={{ backgroundColor: color.value }} />
                            </button>
                        ))}
                    </div>
                </div>
            ) : null}

            <div className="mt-7 grid grid-cols-[112px_1fr] gap-3">
                <div className="grid h-12 grid-cols-3 border border-luxe-line bg-white text-sm font-semibold">
                    <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Giảm số lượng">−</button>
                    <span className="grid place-items-center">{quantity}</span>
                    <button onClick={() => setQuantity((value) => value + 1)} aria-label="Tăng số lượng">+</button>
                </div>
                <button className="h-12 bg-luxe-primary text-sm font-bold uppercase text-white transition hover:bg-luxe-primarySoft">
                    Thêm vào giỏ hàng
                </button>
            </div>
            <button className="mt-3 h-12 w-full bg-luxe-primary text-sm font-bold uppercase text-white transition hover:bg-luxe-primarySoft">
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
