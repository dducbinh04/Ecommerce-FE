import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { ProductDetailTabs } from "../../components/product-detail/ProductDetailTabs";
import { ProductGallery } from "../../components/product-detail/ProductGallery";
import { ProductPurchasePanel } from "../../components/product-detail/ProductPurchasePanel";
import { ProductDetail } from "../../components/product-detail/productDetailData";

export function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-luxe-container text-luxe-ink">
      <Header />
      <main className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1280px] border border-luxe-line bg-luxe-surface px-4 py-8 sm:px-8 lg:px-10">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-luxe-mutedText">
            {productDetail.breadcrumb.map((item, index) => (
              <span key={item} className="flex items-center gap-2">
                <span className={index === productDetail.breadcrumb.length - 1 ? "text-luxe-ink" : ""}>{item}</span>
                {index < productDetail.breadcrumb.length - 1 ? <span>›</span> : null}
              </span>
            ))}
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
            <ProductGallery product={productDetail} />
            <ProductPurchasePanel product={productDetail} />
          </div>

          <ProductDetailTabs product={productDetail} />
        </div>
      </main>
      <Footer newsletter />
    </div>
  );
}
