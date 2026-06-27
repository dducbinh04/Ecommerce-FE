import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { AdminCategoriesPage } from "../pages/admin/AdminCategoriesPage";
import { AdminCategoryFormPage } from "../pages/admin/AdminCategoryFormPage";
import { AdminProductFormPage } from "../pages/admin/AdminProductFormPage";
import { AdminProductsPage } from "../pages/admin/AdminProductsPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { authStore } from "../stores/authStore";
import { HomePage } from "../pages/home/HomePage";
import { ProductDetailPage } from "../pages/products/ProductDetailsPage";
import { ProductsPage } from "../pages/products/ProductsPage";

function AdminRoute({ children }) {
  const location = useLocation();

  if (!authStore.isLoggedIn() || authStore.getRole() !== "ADMIN") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/azure-silk" element={<ProductDetailPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Navigate to="/admin/categories" replace />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProductsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products/new"
        element={
          <AdminRoute>
            <AdminProductFormPage mode="create" />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products/:id/edit"
        element={
          <AdminRoute>
            <AdminProductFormPage mode="edit" />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <AdminRoute>
            <AdminCategoriesPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/categories/new"
        element={
          <AdminRoute>
            <AdminCategoryFormPage mode="create" />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/categories/:id/edit"
        element={
          <AdminRoute>
            <AdminCategoryFormPage mode="edit" />
          </AdminRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

