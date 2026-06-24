import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const navItems = [
    { label: "Trang Chủ", href: "/", route: true },
    { label: "Sản Phẩm", href: "/products", route: true },
    { label: "Bộ Sưu Tập", href: "/#categories" },
    { label: "Về Chúng Tôi", href: "/#about" },
];

function HeaderIconButton({ label, children, badge, to }) {
    const className = "relative grid h-8 w-8 place-items-center text-luxe-ink transition hover:bg-luxe-muted";
    const content = (
        <>
            {children}
            {badge ? (
                <span className="absolute right-0 top-0 grid h-4 w-4 place-items-center rounded-full bg-luxe-primary text-[9px] font-bold text-white">
                    {badge}
                </span>
            ) : null}
        </>
    );

    if (to) {
        return (
            <Link className={className} to={to} aria-label={label}>
                {content}
            </Link>
        );
    }

    return (
        <button className={className} aria-label={label}>
            {content}
        </button>
    );
}

function AccountArea({ isAuthenticated, user }) {
    if (isAuthenticated) {
        return (
            <Link className="ml-2 flex items-center gap-3 rounded-full border border-luxe-line bg-white py-1 pl-1 pr-3 text-luxe-ink transition hover:border-luxe-primary" to="/account">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-luxe-primary text-xs font-bold text-white">
                    {user?.initials || "LA"}
                </span>
                <span className="hidden text-xs font-bold md:inline">{user?.name || "Lumina Member"}</span>
            </Link>
        );
    }

    return (
        <HeaderIconButton label="Đăng nhập" to="/login">
            <FaUser />
        </HeaderIconButton>
    );
}

export function Header({ showSearch = true, isAuthenticated = false, user }) {
    return (
        <header className="sticky top-0 z-30 border-b border-luxe-line bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-[1280px] items-center px-4 sm:px-6 lg:px-10">
                <NavLink to="/" className="mr-8 font-display text-3xl font-bold tracking-normal text-luxe-ink">
                    LUMINA
                </NavLink>

                <nav className="hidden items-center gap-8 text-xs font-semibold text-luxe-mutedText md:flex">
                    {navItems.map((item) =>
                        item.route ? (
                            <NavLink
                                key={item.label}
                                to={item.href}
                                end={item.href === "/"}
                                className={({ isActive }) =>
                                    `border-b border-transparent py-6 transition hover:text-luxe-ink ${isActive ? "border-luxe-ink text-luxe-ink" : ""
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ) : (
                            <a key={item.label} className="border-b border-transparent py-6 transition hover:text-luxe-ink" href={item.href}>
                                {item.label}
                            </a>
                        ),
                    )}
                </nav>

                <div className="ml-auto flex min-w-0 items-center gap-2">
                    {showSearch ? (
                        <label className="hidden h-9 w-72 items-center gap-2 rounded-md border border-luxe-line bg-luxe-muted px-3 text-xs text-luxe-mutedText md:flex">
                            <span aria-hidden="true"><FaMagnifyingGlass /></span>
                            <input
                                className="min-w-0 flex-1 bg-transparent text-luxe-ink outline-none placeholder:text-luxe-mutedText"
                                placeholder="Tìm kiếm sản phẩm..."
                            />
                        </label>
                    ) : null}
                    <HeaderIconButton label="Yêu thích">
                        <FaHeart />
                    </HeaderIconButton>
                    <HeaderIconButton label="Giỏ hàng" badge="2">
                        <FaShoppingCart />
                    </HeaderIconButton>
                    <AccountArea isAuthenticated={isAuthenticated} user={user} />
                </div>
            </div>
        </header>
    );
}
