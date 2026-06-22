export function ProductMediaPanel({ mode, images }) {
  const isEdit = mode === "edit";

  return (
    <section className="border border-luxe-line bg-white p-6">
      <h2 className="mb-6 text-lg font-bold text-luxe-ink">Hình ảnh {isEdit ? "& Truyền thông" : "sản phẩm"}</h2>
      {isEdit ? (
        <div className="grid gap-4 md:grid-cols-[180px_1fr]">
          <img className="h-48 w-full object-cover md:h-52" src={images[0]} alt="Ảnh chính sản phẩm" />
          <div className="grid grid-cols-3 gap-3">
            {images.slice(1).map((image) => (
              <img key={image} className="h-24 w-full object-cover" src={image} alt="Ảnh phụ sản phẩm" />
            ))}
            <button className="flex h-24 flex-col items-center justify-center border border-dashed border-luxe-line bg-luxe-surface text-xs font-semibold text-luxe-mutedText">
              ⊕
              <span className="mt-1">Thêm ảnh</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button className="flex h-40 w-full flex-col items-center justify-center border border-dashed border-luxe-line bg-luxe-surface text-center transition hover:border-luxe-gold">
            <span className="text-3xl" aria-hidden="true">⇧</span>
            <span className="mt-2 text-sm font-bold text-luxe-ink">Tải ảnh lên hoặc kéo thả vào đây</span>
            <span className="mt-1 text-xs text-luxe-mutedText">Hỗ trợ định dạng JPG, PNG, WebP. Tối đa 10MB.</span>
          </button>
          <div className="mt-5 flex gap-4">
            <img className="h-28 w-28 object-cover" src={images[0]} alt="Ảnh sản phẩm đã tải" />
            <button className="grid h-28 w-28 place-items-center bg-luxe-container text-2xl text-luxe-mutedText">+</button>
          </div>
        </div>
      )}
    </section>
  );
}
