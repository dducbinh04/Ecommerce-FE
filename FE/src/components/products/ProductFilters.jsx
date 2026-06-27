import { PRICE_RANGES } from "./productConstants";

export function ProductFilters({
    categories,
    selectedCategory,
    onCategoryChange,
    selectedPrice,
    onPriceChange,
}) {
    const categoryNames = ["Tất cả", ...categories.map((category) => category.name)];

    return (
        <aside className="hidden w-64 shrink-0 lg:block">
            <FilterGroup title="Danh Mục">
                <ul className="space-y-4">
                    {categoryNames.map((category) => (
                        <li key={category}>
                            <button
                                onClick={() => onCategoryChange(category)}
                                className={`flex w-full items-center justify-between text-left text-sm transition hover:text-luxe-ink ${selectedCategory === category ? "font-bold text-luxe-ink" : "text-luxe-mutedText"}`}
                            >
                                <span>{category}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </FilterGroup>

            <FilterGroup title="Khoảng Giá">
                <div className="space-y-4">
                    {[
                        "Tất cả",
                        ...PRICE_RANGES
                    ].map((range) => (
                        <label key={range} className="flex items-center gap-3 text-sm text-luxe-ink">
                            <input
                                className="h-4 w-4 rounded-none border-luxe-line accent-luxe-primary"
                                type="radio"
                                name="price-range"
                                checked={selectedPrice === range}
                                onChange={() => onPriceChange(range)}
                            />
                            <span>{range}</span>
                        </label>
                    ))}
                </div>
            </FilterGroup>
        </aside>
    );
}

function FilterGroup({ title, children }) {
    return (
        <section className="mb-7 border-b border-luxe-line pb-7">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-luxe-mutedText">{title}</h2>
            {children}
        </section>
    );
}
