import { AdminRowActions, AdminTableShell } from "../admin-layout/AdminTableShell";
import { ProductListToolbar } from "./ProductListToolbar";

const currencyFormatter = new Intl.NumberFormat("vi-VN");

function formatCurrency(value) {
  const numericValue = Number(value ?? 0);
  return `${currencyFormatter.format(Number.isNaN(numericValue) ? 0 : numericValue)}đ`;
}

export function ProductAdminTable({ products, selectedCategory, onCategoryChange, searchTerm, onSearchChange, categories, pagination, onDelete }) {
  const actions = (
    <ProductListToolbar
      selectedCategory={selectedCategory}
      onCategoryChange={onCategoryChange}
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      categories={categories}
    />
  );

  return (
    <AdminTableShell title="Danh sách sản phẩm" actions={actions} summary={pagination?.summary} pagination={pagination}>
      <table className="w-full min-w-[980px] border-collapse text-left">
        <thead className="bg-luxe-muted text-xs font-bold uppercase tracking-[0.1em] text-luxe-mutedText">
          <tr>
            <th className="px-6 py-4">Hình ảnh</th>
            <th className="px-6 py-4">Tên sản phẩm</th>
            <th className="px-6 py-4">Danh mục</th>
            <th className="px-6 py-4">Giá bán</th>
            <th className="px-6 py-4">Số lượng</th>
            <th className="px-6 py-4">Trạng thái</th>
            <th className="px-6 py-4 text-right">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-luxe-line">
          {products.map((product) => {
            const isInStock = Number(product.quantity) > 0;

            return (
              <tr key={product.id} className="transition hover:bg-luxe-muted/60">
                <td className="px-6 py-5">
                  <img className="h-14 w-14 object-cover" src={product.imageUrl} alt={product.name} />
                </td>
                <td className="px-6 py-5">
                  <p className="font-display text-sm font-bold tracking-normal text-luxe-ink">{product.name}</p>
                  <p className="mt-1 text-xs text-luxe-mutedText">{product.id}</p>
                </td>
                <td className="px-6 py-5 text-sm text-luxe-mutedText">{product.categoryName || "-"}</td>
                <td className="px-6 py-5 text-sm font-bold text-luxe-ink">{formatCurrency(product.price)}</td>
                <td className="px-6 py-5 text-sm font-semibold text-luxe-ink">{product.quantity}</td>
                <td className="px-6 py-5">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${isInStock ? "bg-emerald-100 text-emerald-700" : "bg-[#ffdad6] text-[#93000a]"}`}>
                    {isInStock ? "Còn hàng" : "Hết hàng"}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <AdminRowActions
                    viewTo={`/admin/products/${product.id}/edit`}
                    editTo={`/admin/products/${product.id}/edit`}
                    deleteLabel={`Xóa ${product.name}`}
                    onDelete={() => onDelete(product)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AdminTableShell>
  );
}
