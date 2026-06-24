import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminShell } from "../../components/admin-layout/AdminShell";
import { AdminCategoryPageHeader } from "../../components/admin-categories/AdminCategoryPageHeader";
import { CategoryFormActions } from "../../components/admin-categories/CategoryFormActions";
import { CategoryGeneralForm } from "../../components/admin-categories/CategoryGeneralForm";
import { editCategory } from "../../components/admin-categories/categoryFormData";
import { deleteCategory, getCategoryById, postCategory, putCategory } from "../../services/api/api.js";

const blankCategory = {
  name: "",
  slug: "dong-ho-cao-cap",
};

function normalizeCategory(data) {
  const categoryData = data?.data ?? data;

  if (!categoryData) {
    return blankCategory;
  }

  return {
    id: categoryData.id ?? categoryData._id ?? "",
    name: categoryData.name ?? categoryData.title ?? "",
    slug: categoryData.slug ?? "",
  };
}

export function AdminCategoryFormPage({ mode = "create" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === "edit";
  const [category, setCategory] = useState(isEdit ? editCategory : blankCategory);
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadCategory() {
      if (!isEdit || !id) {
        return;
      }

      try {
        const data = await getCategoryById(id);
        if (isActive) {
          setCategory(normalizeCategory(data));
        }
      } catch (error) {
        console.error("Error loading category:", error);
        if (isActive) {
          setCategory(editCategory);
        }
      }
    }

    loadCategory();

    return () => {
      isActive = false;
    };
  }, [id, isEdit]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    
    if (!name) {
      setFormError("Vui lòng nhập tên danh mục.");
      return;
    }

    setIsSaving(true);
    setFormError("");

    const payload = { name };

    try {
      if (isEdit && id) {
        await putCategory(id, payload);
      } else {
        await postCategory(payload);
      }
      navigate("/admin/categories");
    } catch (error) {
      console.error("Error saving category:", error);
      setFormError("API chưa sẵn sàng, mình đã nối sẵn luồng nhưng chưa thể lưu lúc này.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!isEdit || !id) {
      return;
    }

    const confirmed = window.confirm(`Xóa ${category.name}?`);
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setFormError("");

    try {
      await deleteCategory(id);
      navigate("/admin/categories");
    } catch (error) {
      console.error("Error deleting category:", error);
      setFormError("API chưa sẵn sàng, mình đã nối sẵn nút xóa nhưng chưa thể thực thi lúc này.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AdminShell title="Quản lý danh mục">
      <div className="mx-auto w-full max-w-4xl">
        <AdminCategoryPageHeader mode={mode} category={category} formId="category-form" onDelete={handleDelete} isSaving={isSaving} isDeleting={isDeleting} />

        <form id="category-form" onSubmit={handleSubmit} className="space-y-8">
          {formError ? <p className="border border-[#ba1a1a] bg-[#ba1a1a]/5 px-4 py-3 text-sm text-[#ba1a1a]">{formError}</p> : null}
          <CategoryGeneralForm mode={mode} category={category} />
          {!isEdit ? <CategoryFormActions /> : null}
        </form>
      </div>
    </AdminShell>
  );
}
