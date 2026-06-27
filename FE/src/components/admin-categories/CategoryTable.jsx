import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { AdminActionButton, AdminRowActions, AdminTableShell } from "../admin-layout/AdminTableShell";
import { adminCategories } from "./categoryAdminData";
import { deleteCategory, getCategories } from "../../services/api/api.js";

const PAGE_SIZE = 10;

function normalizeCategories(data) {
  const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : null;

  if (!items) {
    return adminCategories;
  }

  return items.map((category, index) => ({
    id: category.id ?? category._id ?? category.slug ?? String(index + 1),
    name: category.name ?? category.title ?? "Không có tên",
    slug: category.slug ?? "",
  }));
}

export function CategoryTable() {
  const [categories, setCategories] = useState(adminCategories);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function fetchCategories() {
      try {
        const data = await getCategories();
        if (isActive) {
          setCategories(normalizeCategories(data));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        if (isActive) {
          setCategories(adminCategories);
        }
      }
    }

    fetchCategories();

    return () => {
      isActive = false;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(categories.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return categories.slice(startIndex, startIndex + PAGE_SIZE);
  }, [categories, currentPage]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  async function handleDelete(categoryId, categoryName) {
    const confirmed = window.confirm(`Xóa ${categoryName}?`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(categoryId);
      setCategories((currentCategories) => currentCategories.filter((item) => item.id !== categoryId));
      setActionError("");
    } catch (error) {
      console.error("Error deleting category:", error);
      setActionError("Backend chưa sẵn sàng, chưa thể xóa danh mục lúc này.");
    }
  }

  const actions = (
    <AdminActionButton as={Link} to="/admin/categories/new" className="flex items-center gap-2 bg-luxe-primary px-4 py-2 font-semibold text-white">
      <FaPlus className="mr-2" />
      <p>Tạo category</p>
    </AdminActionButton>
  );

  const summary = `Hiển thị ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, categories.length)} của ${categories.length} danh mục`;

  return (
    <div className="mt-8">
      <AdminTableShell
        title="Danh sách danh mục"
        actions={actions}
        summary={categories.length > 0 ? summary : "Không có danh mục nào"}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
        }}
      >
        {actionError ? <p className="border-b border-luxe-line bg-luxe-surface px-6 py-3 text-sm text-[#ba1a1a]">{actionError}</p> : null}
        <table className="w-full min-w-[940px] border-collapse text-left">
          <thead className="bg-luxe-muted text-xs font-bold uppercase tracking-[0.1em] text-luxe-mutedText">
            <tr>
              <th className="px-6 py-4">STT</th>
              <th className="px-6 py-4">Tên danh mục</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-luxe-line">
            {paginatedCategories.map((category, index) => (
              <tr key={category.id} className="transition hover:bg-luxe-muted/60">
                <td className="px-6 py-5">{startIndex + index + 1}</td>
                <td className="px-6 py-5">{category.name}</td>
                <td className="px-6 py-5">
                  <AdminRowActions
                    editTo={`/admin/categories/${category.id}/edit`}
                    onDelete={() => handleDelete(category.id, category.name)}
                    deleteLabel={`Xóa ${category.name}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTableShell>
    </div>
  );
}
