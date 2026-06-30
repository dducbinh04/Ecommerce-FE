import { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";

import { getMyProfile } from "../../services/api/api.js";
import { authStore } from "../../stores/authStore";

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

function getInitials(profile) {
    const source = profile?.fullName || profile?.email || profile?.role || "User";
    const words = source
        .split(/[.\s@_-]+/)
        .map((word) => word.trim())
        .filter(Boolean);

    if (words.length === 0) {
        return "US";
    }

    return words
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
}

function AccountArea({ isAuthenticated, user, isLoadingUser }) {
    if (isAuthenticated) {
        const displayName = user?.fullName || user?.email || (isLoadingUser ? "Dang tai..." : "User");
        const displayMeta = user?.email && user?.fullName ? user.email : user?.role || authStore.getRole() || "CUSTOMER";
        const initials = user?.initials || getInitials(user);

        return (
            <Link className="ml-2 flex items-center gap-3 rounded-full border border-luxe-line bg-white py-1 pl-1 pr-3 text-luxe-ink transition hover:border-luxe-primary" to="/profile">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-luxe-primary text-xs font-bold text-white"><IoMdPerson size={18} /></span>
                <span className="hidden min-w-0 md:flex md:flex-col md:items-start">
                    <span className="max-w-[160px] truncate text-xs font-bold">{displayName}</span>
                    <span className="max-w-[160px] truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-luxe-mutedText">{displayMeta}</span>
                </span>
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Link className="rounded-md border border-luxe-line px-4 py-2 text-xs font-semibold text-luxe-ink transition hover:border-luxe-primary" to="/login">
                Login
            </Link>

            <Link className="rounded-md bg-luxe-primary px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90" to="/register">
                Register
            </Link>
        </div>
    );
}

export function Header({ showSearch = true, isAuthenticated: isAuthenticatedProp, user: userProp }) {
    const [profile, setProfile] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);

    useEffect(() => {
        let isActive = true;

        async function loadProfile() {
            if (!authStore.isLoggedIn()) {
                if (isActive) {
                    setProfile(null);
                    setIsLoadingProfile(false);
                }
                return;
            }

            setIsLoadingProfile(true);

            try {
                const data = await getMyProfile();
                if (isActive) {
                    setProfile(data?.data ?? data);
                }
            } catch (error) {
                console.error("Error loading user profile:", error);
                if (isActive) {
                    setProfile(null);
                }
            } finally {
                if (isActive) {
                    setIsLoadingProfile(false);
                }
            }
        }

        loadProfile();

        return () => {
            isActive = false;
        };
    }, []);

    const isAuthenticated = isAuthenticatedProp ?? authStore.isLoggedIn();
    const user = userProp ?? profile;
    const initials = useMemo(() => getInitials(user), [user]);
    const mergedUser = user ? { ...user, initials } : null;

    return (
        <header className="sticky top-0 z-30 border-b border-luxe-line bg-white/95 backdrop-blur">
            <div className="relative mx-auto flex max-w-[1280px] flex-wrap items-center px-4 py-3 sm:px-6 lg:px-10">
                <NavLink to="/" className="mr-8 font-display text-3xl font-bold tracking-normal text-luxe-ink">
                    LUMINA
                </NavLink>

                <nav className="order-3 flex w-full justify-center gap-5 overflow-x-auto py-3 text-center text-[11px] font-semibold text-luxe-mutedText sm:gap-6 md:absolute md:left-1/2 md:order-none md:w-auto md:-translate-x-1/2 md:overflow-visible md:py-0 md:text-xs">
                    {navItems.map((item) =>
                        item.route ? (
                            <NavLink
                                key={item.label}
                                to={item.href}
                                end={item.href === "/"}
                                className={({ isActive }) =>
                                    `whitespace-nowrap border-b border-transparent py-1 transition hover:text-luxe-ink ${isActive ? "border-luxe-ink text-luxe-ink" : ""
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ) : (
                            <a key={item.label} className="whitespace-nowrap border-b border-transparent py-1 transition hover:text-luxe-ink" href={item.href}>
                                {item.label}
                            </a>
                        ),
                    )}
                </nav>

                <div className="order-2 ml-auto flex min-w-0 items-center gap-2 md:relative md:z-10 md:order-none">
                    {/* {showSearch ? (
                        <label className="hidden h-9 w-72 items-center gap-2 rounded-md border border-luxe-line bg-luxe-muted px-3 text-xs text-luxe-mutedText md:flex">
                            <span aria-hidden="true"><FaMagnifyingGlass /></span>
                            <input
                                className="min-w-0 flex-1 bg-transparent text-luxe-ink outline-none placeholder:text-luxe-mutedText"
                                placeholder="Tìm kiếm sản phẩm..."
                            />
                        </label>
                    ) : null} */}
                    <HeaderIconButton label="Yêu thích">
                        <FaHeart />
                    </HeaderIconButton>
                    <HeaderIconButton label="Giỏ hàng">
                        <FaShoppingCart />
                    </HeaderIconButton>
                    <AccountArea isAuthenticated={isAuthenticated} user={mergedUser} isLoadingUser={isLoadingProfile} />
                </div>
            </div>
        </header>
    );
}
