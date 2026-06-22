import { Link } from "react-router-dom";

export function ProductFormActions({ mode }) {
  const isEdit = mode === "edit";

  return (
    <div className={`flex gap-4 ${isEdit ? "justify-end" : "justify-end border-t border-luxe-line pt-6"}`}>
      {isEdit ? (
        <button className="h-10 border border-[#ba1a1a] px-5 text-sm font-bold text-[#ba1a1a] transition hover:bg-[#ba1a1a]/5">Delete Product</button>
      ) : (
        <Link className="grid h-10 min-w-24 place-items-center border border-luxe-primary px-5 text-sm font-bold text-luxe-primary" to="/admin/products">
          Hủy bỏ
        </Link>
      )}
      <button className="h-10 min-w-32 bg-luxe-primary px-5 text-sm font-bold text-white transition hover:bg-luxe-primarySoft">
        {isEdit ? "Lưu thay đổi" : "Lưu sản phẩm"}
      </button>
    </div>
  );
}
