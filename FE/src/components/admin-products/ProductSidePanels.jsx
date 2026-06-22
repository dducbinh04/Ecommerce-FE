import { productCategories } from "./adminProductData";

export function ProductSidePanels({ product }) {
  return (
    <div className="space-y-6">
      <section className="border border-luxe-line bg-white p-6">
        <h2 className="mb-5 text-base font-bold text-luxe-ink">Trạng thái</h2>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-luxe-ink">{product.status}</span>
          <span className="relative h-6 w-11 rounded-full bg-luxe-primary">
            <span className="absolute left-6 top-1 h-4 w-4 rounded-full bg-white" />
          </span>
        </div>
        <label className="mt-6 block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Danh mục</span>
          <select className="h-11 w-full border border-luxe-line bg-luxe-muted px-3 text-sm outline-none" defaultValue={product.categoryId}>
            {productCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </section>
      <section className="border border-luxe-line bg-white p-6">
        <h2 className="mb-5 text-base font-bold text-luxe-ink">Giá & Tồn kho</h2>
        <Field label="Giá niêm yết (VNĐ)" value={product.price} />
        <Field label="Giá khuyến mãi (VNĐ)" value={product.salePrice} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Số lượng" value={product.stock} />
          <Field label="Trọng lượng (g)" value={product.weight} />
        </div>
      </section>
      <section className="border border-luxe-line bg-white p-6 text-xs leading-5 text-luxe-mutedText">
        <h2 className="mb-4 text-base font-bold text-luxe-ink">Lịch sử thay đổi</h2>
        <p>• Cập nhật giá: Admin - 2 giờ trước</p>
        <p className="mt-2">• Nhập kho +5 cái: Hệ thống - Hôm qua</p>
      </section>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <label className="mb-4 block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">{label}</span>
      <input className="h-10 w-full border border-luxe-line bg-luxe-muted px-3 text-sm outline-none" defaultValue={value} />
    </label>
  );
}
