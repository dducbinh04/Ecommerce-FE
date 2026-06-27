import { useState } from "react";

export function ProductDetailTabs({ product }) {
    const [activeTab, setActiveTab] = useState(0);
    // const tabs = ["Mô tả chi tiết", "Thông số kỹ thuật", "Đánh giá"];
    const tabs = ["Mô tả chi tiết"];
    const detailImage =
        product.craftImage ||
        product.imageUrl ||
        product.image_url ||
        (Array.isArray(product.images) && product.images.length ? product.images[0] : "");

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
                <div className="grid gap-8 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                    <div className="space-y-6">
                        <div>
                            <h2 className="mt-3 font-display text-2xl font-bold leading-snug tracking-normal text-luxe-ink">Thông tin sản phẩm</h2>
                            <p className="mt-4 text-sm leading-7 text-luxe-mutedText">{product.description}</p>
                        </div>

                        {product.details ? (
                            <div className="border border-luxe-line bg-white px-5 py-5">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-luxe-mutedText">Chi tiết nổi bật</h3>
                                <p className="mt-4 text-sm leading-7 text-luxe-mutedText">{product.details}</p>
                            </div>
                        ) : null}

                        {Array.isArray(product.bullets) && product.bullets.length ? (
                            <div className="border border-luxe-line bg-luxe-muted px-5 py-5">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-luxe-mutedText">Điểm nổi bật</h3>
                                <ul className="mt-4 space-y-3 text-sm leading-6 text-luxe-ink">
                                    {product.bullets.map((bullet) => (
                                        <li key={bullet} className="flex gap-3">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-luxe-primary" />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>

                    {detailImage ? (
                        <figure className="overflow-hidden border border-luxe-line bg-white">
                            <img className="h-[440px] w-full object-cover" src={detailImage} alt={product.name} />
                            <figcaption className="px-5 py-4 text-xs uppercase tracking-[0.18em] text-luxe-mutedText">
                                Hình ảnh minh họa sản phẩm
                            </figcaption>
                        </figure>
                    ) : null}
                </div>
            ) : null}

            {/* {activeTab === 1 ? (
                <div className="py-12 text-sm leading-7 text-luxe-mutedText">
                    <p><span className="font-semibold text-luxe-ink">Danh mục:</span>{" "} {product.category?.name || "Chưa có danh mục"}</p>
                    <p className="mt-3"><span className="font-semibold text-luxe-ink">Số lượng tồn kho:</span>{" "} {product.quantity ?? 0}</p>
                    <p className="mt-3"><span className="font-semibold text-luxe-ink">Mã sản phẩm:</span> {product.id}</p>
                </div>
            ) : null}

            {activeTab === 2 ? (
                <div className="py-12 text-sm text-luxe-mutedText">
                    <p>Đánh giá khách hàng sẽ được cập nhật sớm.</p>
                </div>
            ) : null} */}
        </section>
    );
}
