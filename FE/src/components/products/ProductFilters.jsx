import { colors, priceRanges, productCategories, sizes } from "./productsData";

export function ProductFilters() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <FilterGroup title="Danh Mục">
        <ul className="space-y-4">
          {productCategories.map((category) => (
            <li key={category.name}>
              <button
                className={`flex w-full items-center justify-between text-left text-sm transition hover:text-luxe-ink ${
                  category.active ? "font-bold text-luxe-ink" : "text-luxe-mutedText"
                }`}
              >
                <span>{category.name}</span>
                <span className="text-xs font-medium text-luxe-mutedText">({category.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Khoảng Giá">
        <div className="space-y-4">
          {priceRanges.map((range) => (
            <label key={range} className="flex items-center gap-3 text-sm text-luxe-ink">
              <input className="h-4 w-4 rounded-none border-luxe-line accent-luxe-primary" type="checkbox" />
              <span>{range}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Màu Sắc">
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              className="h-8 w-8 rounded-full border border-luxe-line"
              style={{ backgroundColor: color.value }}
              aria-label={color.name}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Kích Thước" last>
        <div className="grid grid-cols-2 gap-2">
          {sizes.map((size) => (
            <button key={size} className="h-8 border border-luxe-line text-xs font-bold uppercase text-luxe-ink transition hover:border-luxe-primary">
              {size}
            </button>
          ))}
        </div>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children, last = false }) {
  return (
    <section className={`${last ? "" : "border-b border-luxe-line pb-7"} mb-7`}>
      <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-luxe-mutedText">{title}</h2>
      {children}
    </section>
  );
}
