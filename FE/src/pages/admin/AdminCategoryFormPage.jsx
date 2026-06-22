import { useParams } from "react-router-dom";
import { AdminShell } from "../../components/admin-layout/AdminShell";
import { AdminCategoryPageHeader } from "../../components/admin-categories/AdminCategoryPageHeader";
import { CategoryAdvancedPanel } from "../../components/admin-categories/CategoryAdvancedPanel";
import { CategoryFormActions } from "../../components/admin-categories/CategoryFormActions";
import { CategoryGeneralForm } from "../../components/admin-categories/CategoryGeneralForm";
import { CategoryImagePanel } from "../../components/admin-categories/CategoryImagePanel";
import { CategoryStatusPanel } from "../../components/admin-categories/CategoryStatusPanel";
import { editCategory } from "../../components/admin-categories/categoryFormData";

const blankCategory = {
  name: "",
  slug: "dong-ho-cao-cap",
  description: "",
};

export function AdminCategoryFormPage({ mode = "create" }) {
  const { id } = useParams();
  const isEdit = mode === "edit";
  const category = isEdit ? editCategory : blankCategory;

  return (
    <AdminShell title="Quản lý danh mục">
      <div className="mx-auto w-full max-w-[1120px]">
        <AdminCategoryPageHeader mode={mode} categoryId={id} />
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-7">
            <CategoryGeneralForm mode={mode} category={category} />
            {isEdit ? <CategoryImagePanel mode={mode} image={editCategory.image} /> : null}
          </div>

          <div className="space-y-7">
            {!isEdit ? <CategoryImagePanel mode={mode} /> : null}
            <CategoryStatusPanel mode={mode} category={editCategory} />
            {isEdit ? <CategoryAdvancedPanel /> : null}
          </div>
        </div>
        {!isEdit ? <CategoryFormActions /> : null}
      </div>
    </AdminShell>
  );
}
