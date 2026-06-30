import { FiBox, FiGrid, FiLayers, FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "../../services/api/authService";
import { authStore } from "../../stores/authStore";

const adminNavItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: FiGrid },
  { label: "Products", href: "/admin/products", icon: FiBox },
  { label: "Categories", href: "/admin/categories", icon: FiLayers },
];

export function AdminSidebar() {
  const navigate = useNavigate();

  async function handleSignOut() {
    const refreshToken = authStore.getRefreshToken();

    try {
      if (refreshToken) {
        await signOut({ refreshToken });
      }
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      authStore.clear();
      navigate("/login", { replace: true });
    }
  }

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-luxe-line bg-white">
      <div className="border-b border-luxe-line px-7 py-7">
        <a className="font-display text-2xl font-bold tracking-normal text-luxe-ink" href="/admin/dashboard">
          LUMINA
        </a>
        <p className="mt-1 text-xs font-semibold tracking-[0.12em] text-luxe-mutedText">Management Suite</p>
      </div>

      <nav className="flex-1 px-5 py-8">
        <ul className="space-y-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <NavLink
                  to={item.href}
                  end={item.href === "/admin"}
                  className={({ isActive }) =>
                    `flex h-11 items-center gap-3 px-4 text-sm font-semibold transition ${
                      isActive ? "bg-luxe-primary text-white" : "text-luxe-mutedText hover:bg-luxe-muted hover:text-luxe-ink"
                    }`
                  }
                >
                  <span className="grid h-5 w-5 place-items-center text-base" aria-hidden="true">
                    <Icon />
                  </span>
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-5 pb-6">
        <div className="border-t border-luxe-line pt-6">
          <button
            className="flex items-center gap-3 text-sm font-semibold text-luxe-mutedText transition hover:text-luxe-ink"
            type="button"
            onClick={handleSignOut}
          >
            <span aria-hidden="true">
              <FiLogOut />
            </span>
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
