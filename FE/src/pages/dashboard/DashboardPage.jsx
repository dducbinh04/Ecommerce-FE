import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiArrowRight, FiBarChart2, FiBox, FiCalendar, FiLayers, FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import { AdminShell } from "../../components/admin-layout/AdminShell";
import { AdminActionButton } from "../../components/admin-layout/AdminTableShell";
import { getCategories, getMyProfile, getProducts } from "../../services/api/api.js";
import { formatCurrency } from "../../utils/format";

const RECENT_PRODUCTS_LIMIT = 5;

function normalizeList(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

function normalizePage(data) {
  const payload = data?.data ?? data;

  return {
    content: Array.isArray(payload?.content) ? payload.content : [],
    totalElements: Number(payload?.totalElements ?? 0),
  };
}

function getInitials(profile) {
  const source = profile?.fullName || profile?.email || profile?.role || "Admin";
  const words = source
    .split(/[.\s@_-]+/)
    .map((word) => word.trim())
    .filter(Boolean);

  if (words.length === 0) {
    return "AD";
  }

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function formatCompactNumber(value) {
  return new Intl.NumberFormat("vi-VN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function normalizeProduct(product) {
  return {
    id: product.id ?? product._id ?? "",
    name: product.name ?? "Không có tên",
    price: Number(product.price ?? 0),
    quantity: Number(product.quantity ?? 0),
    imageUrl: product.imageUrl ?? "",
    categoryId: product.categoryId ?? "",
    categoryName: product.categoryName ?? "Chưa phân loại",
  };
}

function buildCategoryOverview(categories, products) {
  const counts = new Map();

  products.forEach((product) => {
    const key = product.categoryId || "uncategorized";
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  return categories
    .map((category) => ({
      ...category,
      productCount: counts.get(category.id) || 0,
    }))
    .sort((left, right) => right.productCount - left.productCount || left.name.localeCompare(right.name));
}

export function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadDashboard() {
      setIsLoading(true);

      try {
        const [profileData, categoriesData, productsData] = await Promise.all([
          getMyProfile(),
          getCategories(),
          getProducts({ page: 0, size: 1000, sortBy: "id", sortDirection: "desc" }),
        ]);

        if (!isActive) {
          return;
        }

        setProfile(profileData?.data ?? profileData);
        setCategories(normalizeList(categoriesData));
        setProducts((normalizePage(productsData).content || []).map(normalizeProduct));
        setError("");
      } catch (loadError) {
        console.error("Error loading dashboard data:", loadError);

        if (isActive) {
          setError("Không thể tải dữ liệu dashboard từ API lúc này.");
          setProfile(null);
          setCategories([]);
          setProducts([]);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isActive = false;
    };
  }, []);

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const outOfStockProducts = products.filter((product) => Number(product.quantity) <= 0).length;
  const inStockProducts = totalProducts - outOfStockProducts;
  const activeCategories = categories.filter((category) => products.some((product) => product.categoryId === category.id)).length;
  const categoryOverview = useMemo(() => buildCategoryOverview(categories, products), [categories, products]);
  const topCategory = categoryOverview[0];
  const recentProducts = useMemo(() => products.slice(0, RECENT_PRODUCTS_LIMIT), [products]);
  const displayName = profile?.fullName || profile?.email || "Admin";
  const displayMeta = profile?.email || profile?.role || "ADMIN";
  const initials = useMemo(() => getInitials(profile), [profile]);
  const stockRate = totalProducts > 0 ? Math.round((inStockProducts / totalProducts) * 100) : 0;
  const categoryCoverage = totalCategories > 0 ? Math.round((activeCategories / totalCategories) * 100) : 0;

  const overviewCards = [
    {
      label: "Tổng sản phẩm",
      value: formatCompactNumber(totalProducts),
      hint: "Toan bộ sản phẩm trong kho",
      icon: FiBox,
    },
    {
      label: "Danh mục",
      value: formatCompactNumber(activeCategories),
      hint: `${totalCategories} danh mục`,
      icon: FiLayers,
    },
    {
      label: "Còn hàng",
      value: formatCompactNumber(inStockProducts),
      hint: `${outOfStockProducts} sản phẩm đang hết hàng`,
      icon: FiShoppingBag,
    },
  ];

  return (
    <AdminShell title="Dashboard">
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-1 xl:grid-cols-3">
          {overviewCards.map((card) => {
            const Icon = card.icon;

            return (
              <article key={card.label} className="border border-luxe-line bg-white px-6 py-5 shadow-[0_10px_30px_rgba(28,27,27,0.04)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-luxe-mutedText">{card.label}</p>
                    <p className="mt-3 font-display text-3xl font-bold tracking-normal text-luxe-ink">{card.value}</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center border border-luxe-line bg-luxe-muted text-luxe-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-luxe-mutedText">{card.hint}</p>
              </article>
            );
          })}
        </section>

        {error ? (
          <div className="flex items-start gap-3 border border-[#ba1a1a] bg-[#ba1a1a]/5 px-4 py-3 text-sm text-[#ba1a1a]">
            <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>{error}</p>
          </div>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <article className="border border-luxe-line bg-white">
            <div className="flex items-center justify-between border-b border-luxe-line px-6 py-5">
              <div>
                <h2 className="font-display text-xl font-bold tracking-normal text-luxe-ink">Sản phẩm gần đây</h2>
                <p className="mt-1 text-sm text-luxe-mutedText">Các sản phẩm mới nhất.</p>
              </div>
              <Link className="inline-flex items-center gap-2 text-sm font-semibold text-luxe-primary transition hover:text-luxe-primarySoft" to="/admin/products">
                Xem tất cả
                <FiArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead className="bg-luxe-muted text-xs font-bold uppercase tracking-[0.1em] text-luxe-mutedText">
                  <tr>
                    <th className="px-6 py-4">Sản phẩm</th>
                    <th className="px-6 py-4">Danh mục</th>
                    <th className="px-6 py-4">Giá</th>
                    <th className="px-6 py-4">Tồn kho</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-luxe-line">
                  {recentProducts.length > 0 ? (
                    recentProducts.map((product) => {
                      const isInStock = Number(product.quantity) > 0;

                      return (
                        <tr key={product.id} className="transition hover:bg-luxe-muted/60">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 shrink-0 overflow-hidden bg-luxe-muted">
                                <img className="h-full w-full object-cover" src={product.imageUrl} alt={product.name} />
                              </div>
                              <div>
                                <p className="font-display text-sm font-bold tracking-normal text-luxe-ink">{product.name}</p>
                                <p className="mt-1 text-xs text-luxe-mutedText">{product.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-luxe-mutedText">{product.categoryName || "Chưa phân loại"}</td>
                          <td className="px-6 py-4 text-sm font-bold text-luxe-ink">{formatCurrency(product.price)}</td>
                          <td className="px-6 py-4">
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${isInStock ? "bg-emerald-100 text-emerald-700" : "bg-[#ffdad6] text-[#93000a]"}`}>
                              {isInStock ? `Còn ${product.quantity}` : "Hết hàng"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="px-6 py-10 text-sm text-luxe-mutedText" colSpan={4}>
                        {isLoading ? "Đang tải dữ liệu sản phẩm..." : "Chưa có sản phẩm nào để hiển thị."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <aside className="space-y-6">
            <article className="border border-luxe-line bg-white px-6 py-5">
              <h2 className="font-display text-xl font-bold tracking-normal text-luxe-ink">Lối tắt quản trị</h2>
              <p className="mt-1 text-sm text-luxe-mutedText">Đi nhanh đến các trang được dùng nhiều nhất.</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <AdminActionButton as={Link} to="/admin/products" tone="primary" className="justify-center">
                  Xem sản phẩm
                </AdminActionButton>
                <AdminActionButton as={Link} to="/admin/products/new" className="justify-center">
                  Thêm sản phẩm
                </AdminActionButton>
                <AdminActionButton as={Link} to="/admin/categories" className="justify-center">
                  Xem danh mục
                </AdminActionButton>
                <AdminActionButton as={Link} to="/admin/categories/new" className="justify-center">
                  Thêm danh mục
                </AdminActionButton>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </AdminShell>
  );
}

