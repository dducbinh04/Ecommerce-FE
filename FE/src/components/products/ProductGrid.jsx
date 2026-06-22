import { Link } from "react-router-dom";
import { lightingProducts } from "./productsData";

export function ProductGrid() {
  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
      {lightingProducts.map((product) => (
        <ListingProductCard key={product.name} product={product} />
      ))}
    </div>
  );
}

function ListingProductCard({ product }) {
  return (
    <article className="group">
      <div className="relative">
        <Link to="/products/azure-silk" className="block aspect-[4/5.3] overflow-hidden bg-luxe-container">
          <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={product.image} alt={product.name} />
          {product.tag ? (
            <span className="absolute left-4 top-4 bg-luxe-primary px-3 py-1.5 text-[10px] font-bold uppercase text-white">{product.tag}</span>
          ) : null}
        </Link>
        <button className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg text-luxe-ink transition hover:bg-white" aria-label={`Yêu thích ${product.name}`}>
          ♡
        </button>
      </div>

      <div className="pt-5">
        <Link to="/products/azure-silk">
          <h3 className="min-h-11 font-display text-base font-bold leading-snug tracking-normal text-luxe-ink transition hover:text-luxe-primarySoft">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-1 text-xs">
          <span className="text-luxe-gold" aria-label={`${product.rating} sao`}>
            {"★".repeat(product.rating)}
            <span className="text-luxe-line">{"★".repeat(5 - product.rating)}</span>
          </span>
          <span className="text-luxe-mutedText">({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-3">
          <p className="font-display text-base font-bold tracking-normal text-luxe-primary">{product.price}</p>
          {product.oldPrice ? <p className="text-sm text-luxe-mutedText line-through">{product.oldPrice}</p> : null}
        </div>
      </div>
    </article>
  );
}
