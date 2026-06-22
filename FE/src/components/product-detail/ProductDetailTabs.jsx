export function ProductDetailTabs({ product }) {
  return (
    <section className="mt-8 border-t border-luxe-line">
      <div className="flex gap-12 border-b border-luxe-line">
        {["Mô tả chi tiết", "Thông số kỹ thuật", "Đánh giá (120)"].map((tab, index) => (
          <button
            key={tab}
            className={`py-6 text-sm font-bold ${index === 0 ? "border-b-2 border-luxe-primary text-luxe-primary" : "text-luxe-mutedText"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-12 py-12 lg:grid-cols-[1fr_1.45fr] lg:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold leading-snug tracking-normal text-luxe-ink">Trải nghiệm đỉnh cao của sự thoải mái</h2>
          <p className="mt-5 text-sm leading-7 text-luxe-mutedText">{product.details}</p>
          <ul className="mt-6 space-y-4 text-sm text-luxe-mutedText">
            {product.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-luxe-gold text-xs text-luxe-gold">✓</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        <img className="h-[360px] w-full object-cover" src={product.craftImage} alt="Nghệ nhân hoàn thiện ghế lounge" />
      </div>
    </section>
  );
}
