import { NavLink } from "react-router-dom";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: "⌘" },
  { label: "Products", href: "/admin/products", icon: "▤" },
  { label: "Categories", href: "/admin/categories", icon: "◈" },
  { label: "Inventory", href: "/admin/inventory", icon: "◇" },
];

export function AdminSidebar() {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-luxe-line bg-white">
      <div className="border-b border-luxe-line px-7 py-7">
        <a className="font-display text-2xl font-bold tracking-normal text-luxe-ink" href="/admin/products">
          LUMINA Admin
        </a>
        <p className="mt-1 text-xs font-semibold tracking-[0.12em] text-luxe-mutedText">Management Suite</p>
      </div>

      <nav className="flex-1 px-5 py-8">
        <ul className="space-y-2">
          {adminNavItems.map((item) => (
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
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-5 pb-6">
        <div className="border-t border-luxe-line pt-6">
          <a className="flex items-center gap-3 text-sm font-semibold text-luxe-mutedText transition hover:text-luxe-ink" href="/login">
            <span aria-hidden="true">↩</span>
            Sign Out
          </a>
        </div>
      </div>
    </aside>
  );
}
