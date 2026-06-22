import { Link } from "react-router-dom";
import { AdminActionButton } from "../admin-layout/AdminTableShell";
import { productCategories } from "./adminProductData";

export function ProductListToolbar({ selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <label className="flex h-10 w-full items-center gap-2 border border-luxe-line bg-white px-3 text-sm text-luxe-mutedText sm:w-72">
        <span aria-hidden="true">⌕</span>
        <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-luxe-mutedText" placeholder="Tìm kiếm sản phẩm..." />
      </label>
      <select
        className="h-10 border border-luxe-line bg-white px-3 text-sm font-semibold text-luxe-ink outline-none transition focus:border-luxe-gold"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="all">Tất cả category</option>
        {productCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <AdminActionButton as={Link} tone="primary" to="/admin/products/new">
        + Thêm sản phẩm
      </AdminActionButton>
    </div>
  );
}
