import { Link } from "react-router-dom";

export function AdminCategoryPageHeader({ mode }) {
  const isEdit = mode === "edit";

  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {isEdit ? (
          <Link className="mb-4 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-luxe-mutedText transition hover:text-luxe-ink" to="/admin/categories">
            ← Quay lại danh sách
          </Link>
        ) : (
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-luxe-mutedText">
            <span>Admin Dashboard</span>
            <span>›</span>
            <span>Quản lý danh mục</span>
            <span>›</span>
            <span className="text-luxe-ink">Thêm danh mục mới</span>
          </div>
        )}
        <h2 className="font-display text-2xl font-bold tracking-normal text-luxe-ink">
          {isEdit ? "Cập nhật Danh mục: Nội thất" : "Thêm Danh mục Mới"}
        </h2>
        {isEdit ? <p className="mt-2 text-sm text-luxe-mutedText">Chỉnh sửa thông tin và cấu hình danh mục sản phẩm của bạn.</p> : null}
      </div>

      {isEdit ? (
        <div className="flex gap-3">
          <button className="h-10 border border-[#ba1a1a] px-5 text-sm font-bold text-[#ba1a1a] transition hover:bg-[#ba1a1a]/5">Xóa danh mục</button>
          <button className="h-10 bg-luxe-primary px-5 text-sm font-bold text-white transition hover:bg-luxe-primarySoft">Lưu thay đổi</button>
        </div>
      ) : null}
    </div>
  );
}
