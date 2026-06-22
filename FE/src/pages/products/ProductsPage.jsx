import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { ProductFilters } from "../../components/products/ProductFilters";
import { ProductGrid } from "../../components/products/ProductGrid";
import { ProductPageHeader } from "../../components/products/ProductPageHeader";
import { ProductPagination } from "../../components/products/ProductPagination";
import { ProductToolbar } from "../../components/products/ProductToolbar";

export function ProductsPage() {
  return (
    <div className="min-h-screen bg-luxe-container text-luxe-ink">
      <Header showSearch={false} />
      <main className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1280px] border border-luxe-line bg-luxe-surface px-4 py-12 sm:px-8 lg:px-10">
          <ProductPageHeader />
          <div className="flex gap-8">
            <ProductFilters />
            <section className="min-w-0 flex-1">
              <div className="border border-luxe-line bg-white px-4 py-6 sm:px-6 lg:px-8">
                <ProductToolbar />
                <ProductGrid />
                <ProductPagination />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
