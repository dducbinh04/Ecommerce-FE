export function CategoryImagePanel({ mode, image }) {
  const isEdit = mode === "edit";

  return (
    <section className="border border-luxe-line bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-bold text-luxe-ink">
          <span className="text-luxe-gold" aria-hidden="true">
            ▧
          </span>
          Ảnh đại diện
        </h3>
        {isEdit ? <button className="text-sm font-bold text-luxe-primary transition hover:text-luxe-primarySoft">Thay đổi</button> : null}
      </div>

      {isEdit ? (
        <>
          <img className="aspect-[16/7] w-full border border-dashed border-luxe-line object-cover" src={image} alt="Ảnh đại diện danh mục" />
          <p className="mt-3 text-center text-xs text-luxe-mutedText">Kích thước khuyến nghị: 1200 x 675 px. Định dạng: JPG, PNG.</p>
        </>
      ) : (
        <button className="flex h-56 w-full flex-col items-center justify-center border border-dashed border-luxe-line bg-luxe-surface text-center transition hover:border-luxe-gold">
          <span className="text-4xl text-luxe-mutedText" aria-hidden="true">
            ☁
          </span>
          <span className="mt-3 text-base font-bold text-luxe-ink">Tải lên hình ảnh</span>
          <span className="mt-2 max-w-44 text-xs leading-5 text-luxe-mutedText">Hỗ trợ JPG, PNG, WebP. Tối đa 2MB. Khuyến nghị tỷ lệ 5:11</span>
        </button>
      )}
    </section>
  );
}
