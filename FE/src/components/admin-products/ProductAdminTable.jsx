import { AdminRowActions, AdminTableShell } from "../admin-layout/AdminTableShell";
import { ProductListToolbar } from "./ProductListToolbar";

export function ProductAdminTable({ products, selectedCategory, onCategoryChange }) {
  const actions = <ProductListToolbar selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />;

  return (
    <AdminTableShell title="Danh sách sản phẩm" actions={actions} summary={`Hiển thị 1 - ${products.length} của 120 sản phẩm`}>
      <table className="w-full min-w-[940px] border-collapse text-left">
        <thead className="bg-luxe-muted text-xs font-bold uppercase tracking-[0.1em] text-luxe-mutedText">
          <tr>
            <th className="px-6 py-4">Hình ảnh</th>
            <th className="px-6 py-4">Tên sản phẩm</th>
            <th className="px-6 py-4">Danh mục</th>
            <th className="px-6 py-4">Giá bán</th>
            <th className="px-6 py-4">Kho</th>
            <th className="px-6 py-4">Trạng thái</th>
            <th className="px-6 py-4 text-right">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-luxe-line">
          {products.map((product) => (
            <tr key={product.id} className="transition hover:bg-luxe-muted/60">
              <td className="px-6 py-5">
                <img className="h-14 w-14 object-cover" src={product.image} alt={product.name} />
              </td>
              <td className="px-6 py-5">
                <p className="font-display text-sm font-bold tracking-normal text-luxe-ink">{product.name}</p>
                <p className="mt-1 text-xs text-luxe-mutedText">{product.sku}</p>
              </td>
              <td className="px-6 py-5 text-sm text-luxe-mutedText">{product.category}</td>
              <td className="px-6 py-5 text-sm font-bold text-luxe-ink">{product.price}</td>
              <td className="px-6 py-5 text-sm font-semibold text-luxe-ink">{product.stock}</td>
              <td className="px-6 py-5">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${product.status === "Còn hàng" ? "bg-emerald-100 text-emerald-700" : "bg-[#ffdad6] text-[#93000a]"}`}>
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-5">
                <AdminRowActions viewTo="/products/azure-silk" editTo={`/admin/products/${product.id}/edit`} deleteLabel={`Xóa ${product.name}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminTableShell>
  );
}
