import { categories } from "./homeData";

export function FeaturedCategories() {
  const [mainCategory, ...sideCategories] = categories;

  return (
    <section id="categories" className="bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-normal text-luxe-ink">Danh Mục Nổi Bật</h2>
            <p className="mt-2 text-sm text-luxe-mutedText">Lựa chọn hàng đầu cho phong cách sống hiện đại</p>
          </div>
          <a className="shrink-0 border-b border-luxe-ink text-xs font-bold text-luxe-ink" href="/products">
            Xem tất cả
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <CategoryTile category={mainCategory} large />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {sideCategories.map((category) => (
              <CategoryTile key={category.name} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryTile({ category, large = false }) {
  return (
    <article className={`group relative overflow-hidden bg-luxe-container ${large ? "min-h-[560px]" : "min-h-[268px]"}`}>
      <img className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" src={category.image} alt={category.name} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.68)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 p-7 text-white">
        <h3 className="font-display text-2xl font-semibold tracking-normal">{category.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.08em] text-white/80">{category.detail}</p>
        {large ? (
          <a className="mt-5 inline-flex bg-white px-5 py-3 text-xs font-bold uppercase text-luxe-primary transition hover:bg-luxe-surface" href="/products">
            {category.cta}
          </a>
        ) : null}
      </div>
    </article>
  );
}
