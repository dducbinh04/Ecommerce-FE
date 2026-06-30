import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile, updateMyProfile } from "../../services/api/profileService";
import { authStore } from "../../stores/authStore";
import { signOut } from "../../services/api/authService";
import { Header } from "../../components/layout/Header";
import { ProfileForm } from "./ProfileForm";

export function ProfilePage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Load profile
    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getMyProfile();
                setProfile(data?.data ?? data);
            } catch (err) {
                setError("Không thể tải thông tin cá nhân");
                console.error(err);
            }
        }

        if (!authStore.isLoggedIn()) {
            navigate("/login");
        } else {
            fetchProfile();
        }
    }, [navigate]);

    // Handle update profile
    const handleUpdateProfile = async (formData) => {
        setIsLoading(true);
        setError("");

        try {
            const updated = await updateMyProfile({
                fullName: formData.fullName,
                address: formData.address,
                birthDate: formData.birthDate,
                gender: formData.gender,
            });

            setProfile(updated?.data ?? updated);
            alert("Cập nhật thông tin thành công!");
        } catch (err) {
            setError(err.message || "Cập nhật thất bại. Vui lòng thử lại.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        if (!window.confirm("Bạn chắc chắn muốn đăng xuất?")) {
            return;
        }

        try {
            const refreshToken = authStore.getRefreshToken();
            if (refreshToken) {
                await signOut({ refreshToken });
            }
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            authStore.clear();
            navigate("/login");
        }
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-luxe-muted">
                <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-10">
                    <div className="rounded-lg bg-white p-8 shadow-sm">
                        <h1 className="mb-8 font-display text-3xl font-bold text-luxe-ink">
                            Thông tin cá nhân
                        </h1>

                        {error && (
                            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {profile ? (
                            <ProfileForm
                                profile={profile}
                                onSubmit={handleUpdateProfile}
                                isLoading={isLoading}
                            />
                        ) : (
                            <div className="text-center text-luxe-mutedText">
                                Đang tải thông tin...
                            </div>
                        )}

                        {/* Logout button */}
                        <div className="mt-8 border-t border-luxe-line pt-8">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
