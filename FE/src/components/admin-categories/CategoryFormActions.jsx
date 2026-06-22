import { Link } from "react-router-dom";

export function CategoryFormActions() {
  return (
    <div className="mt-8 flex justify-end gap-4 border-t border-luxe-line pt-6">
      <Link className="grid h-11 min-w-28 place-items-center border border-luxe-primary px-5 text-sm font-bold text-luxe-primary transition hover:bg-white" to="/admin/categories">
        Hủy bỏ
      </Link>
      <button className="h-11 min-w-40 bg-luxe-primary px-6 text-sm font-bold text-white shadow-sm transition hover:bg-luxe-primarySoft">Lưu danh mục</button>
    </div>
  );
}
