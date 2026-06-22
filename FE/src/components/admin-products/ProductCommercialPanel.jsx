export function ProductCommercialPanel({ product }) {
  return (
    <section className="border border-luxe-line bg-white p-6">
      <h2 className="mb-6 text-lg font-bold text-luxe-ink">Giá bán & Lợi nhuận</h2>
      <div className="grid gap-5 md:grid-cols-2">
        <MoneyField label="Giá gốc (VNĐ)" value={product.price} />
        <MoneyField label="Giá khuyến mãi (VNĐ)" value={product.salePrice} />
      </div>
    </section>
  );
}

function MoneyField({ label, value }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">{label}</span>
      <div className="flex h-11 border border-luxe-line bg-luxe-muted">
        <input className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none" defaultValue={value} />
        <span className="flex items-center px-4 text-xs font-bold text-luxe-mutedText">VNĐ</span>
      </div>
    </label>
  );
}
