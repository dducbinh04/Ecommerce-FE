import { productCategories } from "./adminProductData";

export function ProductBasicForm({ mode, product }) {
  const isEdit = mode === "edit";

  return (
    <section className="border border-luxe-line bg-white p-6">
      <h2 className="mb-6 text-lg font-bold text-luxe-ink">Thông tin cơ bản</h2>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Tên sản phẩm</span>
          <input className="h-11 w-full border border-luxe-line bg-luxe-muted px-4 text-sm outline-none focus:border-luxe-gold" defaultValue={product.name} placeholder="Ví dụ: Đồng hồ Heritage Silver Edition" />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Danh mục</span>
          <select className="h-11 w-full border border-luxe-line bg-luxe-muted px-4 text-sm outline-none focus:border-luxe-gold" defaultValue={product.categoryId}>
            <option value="">Chọn danh mục</option>
            {productCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Mã SKU</span>
          <input className="h-11 w-full border border-luxe-line bg-luxe-muted px-4 text-sm outline-none focus:border-luxe-gold" defaultValue={product.sku} />
        </label>
        {isEdit ? (
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Thương hiệu</span>
            <input className="h-11 w-full border border-luxe-line bg-luxe-muted px-4 text-sm outline-none focus:border-luxe-gold" defaultValue={product.brand} />
          </label>
        ) : null}
        <label className="block md:col-span-2">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Mô tả sản phẩm</span>
          <div className="border border-luxe-line">
            {!isEdit ? <div className="flex h-9 items-center gap-3 bg-luxe-container px-4 text-sm font-bold">B I U ☷ ≡ ⌁ ◎ ▣</div> : null}
            <textarea
              className="min-h-36 w-full resize-none bg-white px-4 py-4 text-sm leading-6 outline-none placeholder:text-luxe-mutedText"
              defaultValue={product.description}
              placeholder="Mô tả chi tiết về đặc điểm, chất liệu và cảm hứng của sản phẩm..."
            />
          </div>
        </label>
      </div>
    </section>
  );
}
