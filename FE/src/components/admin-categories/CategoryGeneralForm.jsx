import { formToolbarItems } from "./categoryFormData";

export function CategoryGeneralForm({ mode, category }) {
  const isEdit = mode === "edit";

  return (
    <section className="border border-luxe-line bg-white p-6">
      <h3 className="mb-6 flex items-center gap-2 text-base font-bold text-luxe-ink">
        <span className="text-luxe-gold" aria-hidden="true">
          {isEdit ? "≡" : "ⓘ"}
        </span>
        Thông tin chung
      </h3>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Tên danh mục</span>
          <input
            className="h-11 w-full border border-luxe-line bg-luxe-muted px-4 text-sm text-luxe-ink outline-none transition placeholder:text-luxe-mutedText focus:border-luxe-gold"
            defaultValue={isEdit ? category.name : ""}
            placeholder="Ví dụ: Đồng hồ cao cấp, Trang sức..."
          />
        </label>

        {!isEdit ? (
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Slug</span>
            <div className="grid grid-cols-[150px_1fr]">
              <span className="flex h-11 items-center border border-r-0 border-luxe-line bg-luxe-muted px-4 text-sm text-luxe-mutedText">lumina.vn/category/</span>
              <input
                className="h-11 border border-luxe-line bg-luxe-muted px-4 text-sm text-luxe-ink outline-none transition placeholder:text-luxe-mutedText focus:border-luxe-gold"
                defaultValue={category.slug}
              />
            </div>
            <p className="mt-2 text-xs text-luxe-mutedText">Slug được tạo tự động từ tên danh mục để tối ưu SEO.</p>
          </label>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">
            {isEdit ? "Mô tả" : "Mô tả danh mục"}
          </span>
          {isEdit ? (
            <textarea
              className="min-h-40 w-full resize-none border border-luxe-line bg-luxe-muted px-4 py-3 text-sm leading-7 text-luxe-ink outline-none transition focus:border-luxe-gold"
              defaultValue={category.description}
            />
          ) : (
            <div className="border border-luxe-line">
              <div className="flex h-10 items-center gap-3 bg-luxe-container px-4 text-sm font-bold text-luxe-ink">
                {formToolbarItems.map((item) => (
                  <button key={item} type="button" className="grid h-6 min-w-5 place-items-center transition hover:text-luxe-gold">
                    {item}
                  </button>
                ))}
              </div>
              <textarea
                className="min-h-36 w-full resize-none bg-white px-4 py-4 text-sm leading-6 text-luxe-ink outline-none placeholder:text-luxe-mutedText"
                placeholder="Nhập mô tả chi tiết về danh mục sản phẩm này..."
              />
            </div>
          )}
        </label>
      </div>
    </section>
  );
}
