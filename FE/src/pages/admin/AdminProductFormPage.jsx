import { Link, useParams } from "react-router-dom";
import { AdminShell } from "../../components/admin-layout/AdminShell";
import { ProductBasicForm } from "../../components/admin-products/ProductBasicForm";
import { ProductCommercialPanel } from "../../components/admin-products/ProductCommercialPanel";
import { ProductFormActions } from "../../components/admin-products/ProductFormActions";
import { ProductMediaPanel } from "../../components/admin-products/ProductMediaPanel";
import { ProductSidePanels } from "../../components/admin-products/ProductSidePanels";
import { blankProduct, editableProduct } from "../../components/admin-products/adminProductData";

export function AdminProductFormPage({ mode = "create" }) {
  const { id } = useParams();
  const isEdit = mode === "edit";
  const product = isEdit ? editableProduct : blankProduct;

  return (
    <AdminShell title={isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}>
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {isEdit ? (
              <Link className="mb-4 inline-flex text-base font-bold text-luxe-mutedText transition hover:text-luxe-ink" to="/admin/products">
                ← Quay lại Danh sách
              </Link>
            ) : (
              <div className="mb-4 flex gap-8 border-b border-luxe-line text-sm font-bold">
                <span className="border-b-2 border-luxe-primary pb-3 text-luxe-primary">Sản phẩm</span>
                <span className="pb-3 text-luxe-mutedText">Đơn hàng</span>
                <span className="pb-3 text-luxe-mutedText">Khách hàng</span>
              </div>
            )}
            <h1 className="font-display text-4xl font-bold tracking-normal text-luxe-ink">{isEdit ? "" : "Thêm Sản Phẩm Mới"}</h1>
            {!isEdit ? <p className="mt-2 text-sm text-luxe-mutedText">Điền các thông tin chi tiết dưới đây để đăng tải sản phẩm mới lên cửa hàng Lumina.</p> : null}
          </div>
          {isEdit ? <ProductFormActions mode={mode} productId={id} /> : null}
        </div>

        {isEdit ? (
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-7">
              <ProductBasicForm mode={mode} product={product} />
              <ProductMediaPanel mode={mode} images={product.images} />
            </div>
            <ProductSidePanels product={product} />
          </div>
        ) : (
          <div className="space-y-7">
            <ProductBasicForm mode={mode} product={product} />
            <ProductCommercialPanel product={product} />
            <ProductMediaPanel mode={mode} images={product.images} />
            <ProductFormActions mode={mode} />
          </div>
        )}
      </div>
    </AdminShell>
  );
}
