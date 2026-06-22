import { Link } from "react-router-dom";
import { AdminActionButton, AdminRowActions, AdminTableShell } from "../admin-layout/AdminTableShell";
import { adminCategories } from "./categoryAdminData";

export function CategoryTable() {
  const actions = (
    <>
      <AdminActionButton as={Link} tone="primary" to="/admin/categories/new">
        + Tạo category mới
      </AdminActionButton>
      <AdminActionButton>▾ Bộ lọc</AdminActionButton>
      <AdminActionButton>⇩ Xuất file</AdminActionButton>
    </>
  );

  return (
    <div className="mt-8">
      <AdminTableShell title="Danh sách danh mục" actions={actions} summary="Hiển thị 4 trên 12 danh mục">
        <table className="w-full min-w-[940px] border-collapse text-left">
          <thead className="bg-luxe-muted text-xs font-bold uppercase tracking-[0.1em] text-luxe-mutedText">
            <tr>
              <th className="px-6 py-4">Tên danh mục</th>
              <th className="px-6 py-4">Số lượng sản phẩm</th>
              <th className="px-6 py-4">Ngày tạo</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-luxe-line">
            {adminCategories.map((category) => (
              <tr key={category.name} className="transition hover:bg-luxe-muted/60">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img className="h-14 w-14 object-cover" src={category.image} alt={category.name} />
                    <div>
                      <p className="font-display text-sm font-bold tracking-normal text-luxe-ink">{category.name}</p>
                      <p className="mt-1 text-xs text-luxe-mutedText">{category.children}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-semibold text-luxe-ink">{category.products}</td>
                <td className="px-6 py-5 text-sm text-luxe-mutedText">{category.createdAt}</td>
                <td className="px-6 py-5">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${category.status === "Kích hoạt" ? "bg-emerald-100 text-emerald-700" : "bg-luxe-line text-luxe-mutedText"}`}>
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <AdminRowActions viewTo="/admin/categories" editTo="/admin/categories/furniture/edit" deleteLabel={`Xóa ${category.name}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTableShell>
    </div>
  );
}
