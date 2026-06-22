import { products } from "./homeData";

export function BestSellers() {
  return (
    <section id="best-sellers" className="bg-luxe-surface py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-normal text-luxe-ink">Sản Phẩm Bán Chạy</h2>
          <p className="mt-4 text-sm leading-6 text-luxe-mutedText">
            Những thiết kế được yêu thích nhất bởi cộng đồng Lumina, sự kết hợp hoàn hảo giữa chức năng và thẩm mỹ.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <article className="group border border-luxe-line bg-white">
      <div className="relative aspect-[4/5] overflow-hidden bg-luxe-container">
        <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={product.image} alt={product.name} />
        {product.tag ? (
          <span className="absolute left-3 top-3 bg-luxe-gold px-2.5 py-1 text-[10px] font-bold text-white">{product.tag}</span>
        ) : null}
        <button className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-sm text-luxe-ink transition hover:bg-white" aria-label={`Yêu thích ${product.name}`}>
          ♡
        </button>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase text-luxe-mutedText">{product.category}</p>
        <h3 className="mt-1 min-h-10 text-sm font-semibold leading-5 text-luxe-ink">{product.name}</h3>
        <p className="mt-3 text-sm font-bold text-luxe-primary">{product.price}</p>
      </div>
    </article>
  );
}
