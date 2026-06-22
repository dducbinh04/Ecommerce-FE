import { useMemo, useState } from "react";
import { AdminShell } from "../../components/admin-layout/AdminShell";
import { ProductAdminTable } from "../../components/admin-products/ProductAdminTable";
import { adminProducts } from "../../components/admin-products/adminProductData";

export function AdminProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const products = useMemo(() => {
    if (selectedCategory === "all") return adminProducts;
    return adminProducts.filter((product) => product.categoryId === selectedCategory);
  }, [selectedCategory]);

  return (
    <AdminShell title="Quản lý sản phẩm">
      <div className="w-full">
        <ProductAdminTable products={products} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      </div>
    </AdminShell>
  );
}
