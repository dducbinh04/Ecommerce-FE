import { AdminShell } from "../../components/admin-layout/AdminShell";
import { CategoryStats } from "../../components/admin-categories/CategoryStats";
import { CategoryTable } from "../../components/admin-categories/CategoryTable";

export function AdminCategoriesPage() {
  return (
    <AdminShell title="Quản lý danh mục">
      <CategoryStats />
      <CategoryTable />
    </AdminShell>
  );
}
