import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { AdminCategoriesPage } from "../pages/admin/AdminCategoriesPage";
import { AdminCategoryFormPage } from "../pages/admin/AdminCategoryFormPage";
import { AdminProductFormPage } from "../pages/admin/AdminProductFormPage";
import { AdminProductsPage } from "../pages/admin/AdminProductsPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { HomePage } from "../pages/home/HomePage";
import { ProductDetailPage } from "../pages/products/ProductDetailPage";
import { ProductsPage } from "../pages/products/ProductsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/azure-silk" element={<ProductDetailPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<Navigate to="/admin/categories" replace />} />
      <Route path="/admin/products" element={<AdminProductsPage />} />
      <Route path="/admin/products/new" element={<AdminProductFormPage mode="create" />} />
      <Route path="/admin/products/:id/edit" element={<AdminProductFormPage mode="edit" />} />
      <Route path="/admin/categories" element={<AdminCategoriesPage />} />
      <Route path="/admin/categories/new" element={<AdminCategoryFormPage mode="create" />} />
      <Route path="/admin/categories/:id/edit" element={<AdminCategoryFormPage mode="edit" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

