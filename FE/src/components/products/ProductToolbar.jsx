export function ProductToolbar() {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-luxe-mutedText">Hiển thị 1 - 12 trên 48 sản phẩm</p>
      <div className="flex items-center gap-3">
        <button className="h-9 border border-luxe-line px-5 text-xs font-bold uppercase text-luxe-ink transition hover:border-luxe-primary">
          Sắp Xếp: Mới Nhất
          <span className="ml-3 text-luxe-mutedText">⌄</span>
        </button>
        <div className="flex border border-luxe-line">
          <button className="grid h-9 w-9 place-items-center bg-luxe-primary text-white" aria-label="Xem dạng lưới">
            ▦
          </button>
          <button className="grid h-9 w-9 place-items-center text-luxe-mutedText transition hover:text-luxe-ink" aria-label="Xem dạng danh sách">
            ☰
          </button>
        </div>
      </div>
    </div>
  );
}
