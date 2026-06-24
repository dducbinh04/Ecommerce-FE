import { colors, priceRanges, productCategories } from "./productsData";

export function ProductFilters({
    selectedCategory,
    onCategoryChange,
    selectedPrice,
    onPriceChange,
    selectedColor,
    onColorChange,
}) {
    const categories = ["Tất cả", ...productCategories.map((category) => category.name)];

    return (
        <aside className="hidden w-64 shrink-0 lg:block">
            <FilterGroup title="Danh Mục">
                <ul className="space-y-4">
                    {categories.map((category) => (
                        <li key={category}>
                            <button
                                onClick={() => onCategoryChange(category)}
                                className={`flex w-full items-center justify-between text-left text-sm transition hover:text-luxe-ink ${selectedCategory === category ? "font-bold text-luxe-ink" : "text-luxe-mutedText"}`}
                            >
                                <span>{category}</span>
                                {category !== "Tất cả" ? (
                                    <span className="text-xs font-medium text-luxe-mutedText">({productCategories.find((item) => item.name === category)?.count || 0})</span>
                                ) : null}
                            </button>
                        </li>
                    ))}
                </ul>
            </FilterGroup>

            <FilterGroup title="Khoảng Giá">
                <div className="space-y-4">
                    {[
                        "Tất cả",
                        ...priceRanges,
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

            <FilterGroup title="Màu Sắc">
                <div className="flex gap-3">
                    {[
                        "Tất cả",
                        ...colors.map((color) => color.name),
                    ].map((colorName) => (
                        <button
                            key={colorName}
                            onClick={() => onColorChange(colorName)}
                            className={`h-8 w-8 rounded-full border ${selectedColor === colorName ? "border-luxe-primary ring-2 ring-luxe-primary/20" : "border-luxe-line"}`}
                            style={colorName === "Tất cả" ? { backgroundColor: "#f5f5f5" } : { backgroundColor: colors.find((color) => color.name === colorName)?.value }}
                            aria-label={colorName}
                        />
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
