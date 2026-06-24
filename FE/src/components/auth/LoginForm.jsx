import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../services/api/authService";
import { authStore } from "../../stores/authStore";
import { AuthField } from "./AuthField";

export function LoginForm() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setServerError("");
        setIsLoading(true);

        try {
            const response = await signIn({
                email: data.email,
                password: data.password,
                role: "ADMIN", // hardcode role
            });

            authStore.save(response);

            // Redirect
            if (response.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            // Lỗi BE: { status, message, timestamp }
            const message =
                error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
            setServerError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <h1 className="font-display text-3xl font-bold tracking-normal text-luxe-ink">
                Chào mừng trở lại
            </h1>
            <p className="mt-3 text-sm leading-6 text-luxe-mutedText">
                Vui lòng đăng nhập để tiếp tục hành trình của bạn.
            </p>

            <form className="mt-9 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <AuthField
                    label="Email"
                    type="email"
                    placeholder="example@lumina.vn"
                    icon="✉"
                    error={errors.email?.message}
                    registration={register("email", {
                        required: "Email không được để trống",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email không đúng định dạng",
                        },
                    })}
                />

                <AuthField
                    label="Mật khẩu"
                    type="password"
                    placeholder="••••••••"
                    icon=""
                    helper="Quên mật khẩu?"
                    error={errors.password?.message}
                    registration={register("password", {
                        required: "Mật khẩu không được để trống",
                        minLength: {
                            value: 8,
                            message: "Mật khẩu phải có ít nhất 8 ký tự",
                        },
                    })}
                />

                {/* Lỗi từ server */}
                {serverError ? (
                    <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {serverError}
                    </p>
                ) : null}

                <label className="flex items-center gap-3 text-sm text-luxe-mutedText">
                    <input
                        className="h-4 w-4 border-luxe-line accent-luxe-primary"
                        type="checkbox"
                    />
                    <span>Ghi nhớ đăng nhập</span>
                </label>

                <button
                    className="h-12 w-full bg-luxe-primary text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-luxe-primarySoft disabled:opacity-60"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Đang đăng nhập..." : <>Đăng nhập <span aria-hidden="true">→</span></>}
                </button>
            </form>

            <div className="my-9 h-px bg-luxe-line" />

            <p className="text-center text-sm text-luxe-mutedText">
                Bạn chưa có tài khoản?{" "}
                <Link
                    className="font-bold text-luxe-ink transition hover:text-luxe-primarySoft"
                    to="/register"
                >
                    Đăng ký tài khoản mới
                </Link>
            </p>

            <p className="mt-28 text-center text-xs font-semibold uppercase tracking-[0.12em] text-luxe-line">
                © 2026 LUMINA. All rights reserved.
            </p>
        </div>
    );
}