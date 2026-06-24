export function CategoryGeneralForm({ mode, category }) {
  const isEdit = mode === "edit";

  return (
    <section className="overflow-hidden border border-luxe-line bg-white shadow-sm">
      <div className="border-b border-luxe-line px-6 py-5">
        <h3 className="flex items-center gap-2 text-base font-bold text-luxe-ink">
          <span className="text-luxe-gold" aria-hidden="true">
            {isEdit ? "≡" : "ⓘ"}
          </span>
          Thông tin danh mục
        </h3>
      </div>

      <div className="space-y-6 p-6">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Tên danh mục</span>
          <input
            name="name"
            className="h-11 w-full border border-luxe-line bg-luxe-muted px-4 text-sm text-luxe-ink outline-none transition placeholder:text-luxe-mutedText focus:border-luxe-gold"
            defaultValue={isEdit ? category.name : ""}
            placeholder="Ví dụ: Đồng hồ cao cấp, Trang sức..."
          />
        </label>
      </div>
    </section>
  );
}
