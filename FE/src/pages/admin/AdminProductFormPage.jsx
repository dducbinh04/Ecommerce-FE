import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminShell } from "../../components/admin-layout/AdminShell";
import { ProductBasicForm } from "../../components/admin-products/ProductBasicForm";
import { ProductFormActions } from "../../components/admin-products/ProductFormActions";
import { blankProduct, editableProduct, productCategories } from "../../components/admin-products/adminProductData";
import { deleteProduct, getCategories, getProductById, postProduct, putProduct } from "../../services/api/api.js";

function normalizeCategories(data) {
  const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : null;

  if (!items) {
    return productCategories;
  }

  return items.map((category, index) => ({
    id: category.id ?? category._id ?? String(index + 1),
    name: category.name ?? "Không có tên",
  }));
}

function normalizeProduct(data) {
  const productData = data?.data ?? data;

  if (!productData) {
    return blankProduct;
  }

  const images = [
    ...(Array.isArray(productData.images) ? productData.images : []),
    ...(Array.isArray(productData.imageUrls) ? productData.imageUrls : []),
    productData.imageUrl,
  ].filter(Boolean);

  return {
    id: productData.id ?? productData._id ?? "",
    name: productData.name ?? "",
    description: productData.description ?? "",
    price: productData.price ?? "",
    quantity: productData.quantity ?? "",
    imageUrl: images[0] ?? "",
    images,
    categoryId: productData.categoryId ?? "",
  };
}

function appendProductField(formData, key, value) {
  if (value === undefined || value === null || value === "") {
    return;
  }

  formData.append(key, value);
}

export function AdminProductFormPage({ mode = "create" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === "edit";
  const [product, setProduct] = useState(isEdit ? editableProduct : blankProduct);
  const [categories, setCategories] = useState(productCategories);
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadCategories() {
      try {
        const data = await getCategories();
        if (isActive) {
          setCategories(normalizeCategories(data));
        }
      } catch (error) {
        console.error("Error loading categories for product form:", error);
        if (isActive) {
          setCategories(productCategories);
        }
      }
    }

    loadCategories();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadProduct() {
      if (!isEdit || !id) {
        return;
      }

      try {
        const data = await getProductById(id);
        if (isActive) {
          setProduct(normalizeProduct(data));
        }
      } catch (error) {
        console.error("Error loading product:", error);
        if (isActive) {
          setProduct(editableProduct);
        }
      }
    }

    loadProduct();

    return () => {
      isActive = false;
    };
  }, [id, isEdit]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const price = Number(formData.get("price"));
    const quantity = Number(formData.get("quantity"));
    const imageUrls = formData
      .getAll("imageUrls")
      .map((value) => String(value || "").trim())
      .filter((value) => value && !value.startsWith("data:image/"));
    const categoryId = String(formData.get("categoryId") || "").trim();
    const imageFiles = formData.getAll("files").filter((file) => file instanceof File && file.size > 0);

    if (!name) {
      setFormError("Vui lòng nhập tên sản phẩm.");
      return;
    }

    setIsSaving(true);
    setFormError("");

    const payload = new FormData();
    appendProductField(payload, "name", name);
    appendProductField(payload, "description", description);
    appendProductField(payload, "price", Number.isNaN(price) ? 0 : price);
    appendProductField(payload, "quantity", Number.isNaN(quantity) ? 0 : quantity);
    appendProductField(payload, "categoryId", categoryId);

    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => payload.append("files", file));
      if (imageFiles.length === 1) {
        payload.append("file", imageFiles[0]);
      }
    } else if (imageUrls.length > 0) {
      imageUrls.forEach((url) => payload.append("imageUrls", url));
      if (imageUrls.length === 1) {
        payload.append("imageUrl", imageUrls[0]);
      }
    }

    try {
      if (isEdit && id) {
        await putProduct(id, payload);
      } else {
        await postProduct(payload);
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      setFormError("API sản phẩm chưa sẵn sàng, mình đã nối sẵn luồng nhưng chưa thể lưu lúc này.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!isEdit || !id) {
      return;
    }

    const confirmed = window.confirm(`Xóa ${product.name}?`);
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setFormError("");

    try {
      await deleteProduct(id);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      setFormError("API sản phẩm chưa sẵn sàng, mình đã nối sẵn nút xóa nhưng chưa thể thực thi lúc này.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AdminShell title="Quản lý sản phẩm">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link className="mb-4 inline-flex text-base font-bold text-luxe-mutedText transition hover:text-luxe-ink" to="/admin/products">
              ← Quay lại danh sách
            </Link>
            <h1 className="font-display text-3xl font-bold tracking-normal text-luxe-ink">
              {isEdit ? `Cập nhật sản phẩm: ${product.name}` : "Thêm Sản Phẩm Mới"}
            </h1>
            <p className="mt-2 text-sm text-luxe-mutedText">Dữ liệu được đồng bộ theo schema của API sản phẩm.</p>
          </div>
        </div>

        <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
          {formError ? <p className="border border-[#ba1a1a] bg-[#ba1a1a]/5 px-4 py-3 text-sm text-[#ba1a1a]">{formError}</p> : null}
          <ProductBasicForm key={`${id || "create"}-${product.name || "blank"}-${categories.length}`} mode={mode} product={product} categories={categories} />
          <ProductFormActions mode={mode} formId="product-form" onDelete={handleDelete} isSaving={isSaving} isDeleting={isDeleting} />
        </form>
      </div>
    </AdminShell>
  );
}
