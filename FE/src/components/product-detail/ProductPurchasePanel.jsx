export function ProductPurchasePanel({ product }) {
  return (
    <section className="bg-luxe-surface">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-luxe-gold">{product.label}</p>
      <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-normal text-luxe-ink lg:text-5xl">{product.name}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-base text-luxe-gold">★★★★★</span>
        <span className="text-sm text-luxe-mutedText">{product.rating} ({product.reviews} nhận xét)</span>
      </div>

      <div className="mt-6 flex items-end gap-4 border-b border-luxe-line pb-5">
        <p className="font-display text-3xl font-bold tracking-normal text-luxe-primary">{product.price}</p>
        <p className="text-base text-luxe-mutedText line-through">{product.oldPrice}</p>
      </div>

      <p className="mt-6 text-sm leading-7 text-luxe-mutedText">{product.description}</p>

      <div className="mt-6">
        <p className="text-sm font-bold text-luxe-ink">Màu sắc: {product.material}</p>
        <div className="mt-3 flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              className={`h-9 w-9 rounded-md border p-1 ${color.active ? "border-luxe-primary" : "border-luxe-line"}`}
              aria-label={color.name}
            >
              <span className="block h-full w-full rounded" style={{ backgroundColor: color.value }} />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-luxe-ink">Kích thước:</p>
          <a className="border-b border-luxe-gold text-xs font-semibold text-luxe-gold" href="/">
            Bảng hướng dẫn
          </a>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {product.sizes.map((size, index) => (
            <button
              key={size}
              className={`h-12 border text-sm font-bold transition ${
                index === 0 ? "border-luxe-primary bg-luxe-primary text-white" : "border-luxe-line bg-white text-luxe-ink hover:border-luxe-primary"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 grid grid-cols-[112px_1fr] gap-3">
        <div className="grid h-12 grid-cols-3 border border-luxe-line bg-white text-sm font-semibold">
          <button aria-label="Giảm số lượng">−</button>
          <span className="grid place-items-center">1</span>
          <button aria-label="Tăng số lượng">+</button>
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
          <span>▱</span>
          <span>Miễn phí giao hàng</span>
        </div>
        <div className="flex items-center gap-2">
          <span>♢</span>
          <span>Bảo hành 5 năm</span>
        </div>
      </div>
    </section>
  );
}
