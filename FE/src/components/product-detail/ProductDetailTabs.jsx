import { useState } from "react";

export function ProductDetailTabs({ product }) {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ["Mô tả chi tiết", "Thông số kỹ thuật", "Đánh giá"];
    const bullets = Array.isArray(product.bullets) && product.bullets.length
        ? product.bullets
        : product.description
            ? [product.description]
            : [];

    return (
        <section className="mt-8 border-t border-luxe-line">
            <div className="flex gap-12 border-b border-luxe-line">
                {tabs.map((tab, index) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(index)}
                        className={`py-6 text-sm font-bold ${index === activeTab ? "border-b-2 border-luxe-primary text-luxe-primary" : "text-luxe-mutedText"}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 0 ? (
                <div className="grid gap-12 py-12 lg:grid-cols-[1fr_1.45fr] lg:items-center">
                    <div>
                        <h2 className="font-display text-2xl font-bold leading-snug tracking-normal text-luxe-ink">Thông tin sản phẩm</h2>
                        <p className="mt-5 text-sm leading-7 text-luxe-mutedText">{product.description}</p>
                        <ul className="mt-6 space-y-4 text-sm text-luxe-mutedText">
                            {bullets.map((bullet) => (
                                <li key={bullet} className="flex gap-3">
                                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-luxe-gold text-xs text-luxe-gold">✓</span>
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <img className="h-[360px] w-full object-cover" src={product.imageUrl} alt={product.name} />
                </div>
            ) : null}

            {activeTab === 1 ? (
                <div className="py-12 text-sm leading-7 text-luxe-mutedText">
                    <p><span className="font-semibold text-luxe-ink">Danh mục:</span> {product.categoryName || "Chưa có danh mục"}</p>
                    <p className="mt-3"><span className="font-semibold text-luxe-ink">Số lượng tồn kho:</span> {product.quantity ?? 0}</p>
                    <p className="mt-3"><span className="font-semibold text-luxe-ink">Mã sản phẩm:</span> {product.id}</p>
                </div>
            ) : null}

            {activeTab === 2 ? (
                <div className="py-12 text-sm text-luxe-mutedText">
                    <p>Đánh giá khách hàng sẽ được cập nhật sớm.</p>
                </div>
            ) : null}
        </section>
    );
}
