export function CategoryStatusPanel({ mode, category }) {
  const isEdit = mode === "edit";

  return (
    <section className="border border-luxe-line bg-white p-6">
      <h3 className="text-base font-bold text-luxe-ink">{isEdit ? "Trạng thái & Thống kê" : "Trạng thái hiển thị"}</h3>

      {isEdit ? (
        <div className="mt-7 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-luxe-ink">{category.status}</p>
              <p className="mt-1 text-xs leading-5 text-luxe-mutedText">Cho phép khách hàng nhìn thấy</p>
            </div>
            <Toggle checked />
          </div>
          <Metric label="Số lượng sản phẩm" value={category.productCount} pill />
          <Metric label="Lượt xem danh mục" value={category.monthlyViews} />
          <Metric label="Xếp hạng hiển thị" value={category.seoRank} />
          <div className="border border-luxe-line bg-luxe-surface p-4 text-xs leading-5 text-luxe-mutedText">
            <span className="mr-2 text-luxe-gold">ⓘ</span>
            Danh mục này hiện đang là danh mục bán chạy nhất trong 90 ngày qua.
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div className="flex items-center justify-between bg-luxe-surface px-4 py-3">
            <div className="flex items-center gap-3">
              <span aria-hidden="true">◎</span>
              <span className="text-sm font-bold text-luxe-ink">Công khai</span>
            </div>
            <Toggle checked />
          </div>
          <p className="mt-4 text-xs leading-5 text-luxe-mutedText">Tắt công khai nếu bạn muốn lưu tạm danh mục này mà không hiển thị trên website.</p>
        </div>
      )}
    </section>
  );
}

function Metric({ label, value, pill = false }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-luxe-mutedText">{label}</span>
      <span className={pill ? "rounded-full bg-luxe-primary px-3 py-1 text-xs font-bold text-white" : "font-bold text-luxe-ink"}>{value}</span>
    </div>
  );
}

function Toggle({ checked }) {
  return (
    <button className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-luxe-gold" : "bg-luxe-line"}`} type="button" aria-pressed={checked}>
      <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`} />
    </button>
  );
}
