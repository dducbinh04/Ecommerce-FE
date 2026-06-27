import { useEffect, useMemo, useState } from "react";
import { getMyProfile } from "../../services/api/api.js";
import { authStore } from "../../stores/authStore";

import { IoMdPerson } from "react-icons/io";

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

export function AdminTopbar({ title }) {
  const [profile, setProfile] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadProfile() {
      setIsLoadingProfile(true);
      try {
        const data = await getMyProfile();
        if (isActive) {
          setProfile(data?.data ?? data);
        }
      } catch (error) {
        console.error("Error loading admin profile:", error);
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

  const fallbackRole = authStore.getRole();
  const displayName = profile?.fullName || profile?.email || (isLoadingProfile ? "Dang tai..." : "Admin");
  const displayMeta = profile?.email && profile?.fullName ? profile.email : profile?.role || fallbackRole || "ADMIN";
  const initials = useMemo(() => getInitials(profile), [profile]);

  return (
    <header className="flex h-16 items-center justify-between border-b border-luxe-line bg-white px-8">
      <h1 className="font-display text-xl font-bold tracking-normal text-luxe-ink">{title}</h1>
      <button
        type="button"
        className="flex min-w-0 max-w-[280px] items-center gap-3 bg-white px-3 py-2 text-left transition hover:border-luxe-primary hover:bg-luxe-muted"
        aria-label="Tai khoan dang dang nhap"
        title={profile?.email || displayName}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-luxe-primary text-xs font-bold text-white"><IoMdPerson size={18} /></span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold text-luxe-ink">{displayName}</span>
          <span className="block truncate text-xs font-semibold uppercase tracking-[0.08em] text-luxe-mutedText">{displayMeta}</span>
        </span>
      </button>
    </header>
  );
}
