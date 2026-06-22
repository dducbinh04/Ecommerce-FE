const advancedItems = [
  { title: "Tối ưu SEO", detail: "Thẻ Meta, URL thân thiện" },
  { title: "Danh mục con", detail: "Quản lý 12 danh mục con" },
  { title: "Phân quyền", detail: "Ai có thể sửa danh mục" },
];

export function CategoryAdvancedPanel() {
  return (
    <section className="border border-luxe-line bg-white p-6">
      <h3 className="text-base font-bold text-luxe-ink">Cấu hình nâng cao</h3>
      <div className="mt-7 divide-y divide-luxe-line">
        {advancedItems.map((item) => (
          <button key={item.title} className="flex w-full items-center justify-between py-5 text-left transition hover:text-luxe-primarySoft">
            <span>
              <span className="block text-sm font-bold text-luxe-ink">{item.title}</span>
              <span className="mt-1 block text-xs text-luxe-mutedText">{item.detail}</span>
            </span>
            <span aria-hidden="true">›</span>
          </button>
        ))}
      </div>
    </section>
  );
}
