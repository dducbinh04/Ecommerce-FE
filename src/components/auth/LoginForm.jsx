import { Link } from "react-router-dom";
import { AuthField } from "./AuthField";

export function LoginForm() {
  return (
    <div className="w-full max-w-md">
      <h1 className="font-display text-3xl font-bold tracking-normal text-luxe-ink">Chào mừng trở lại</h1>
      <p className="mt-3 text-sm leading-6 text-luxe-mutedText">Vui lòng đăng nhập để tiếp tục hành trình của bạn.</p>

      <form className="mt-9 space-y-6">
        <AuthField label="Email" type="email" placeholder="example@lumina.vn" icon="✉" />
        <AuthField label="Mật khẩu" type="password" placeholder="••••••••" helper="Quên mật khẩu?" icon="◉" />

        <label className="flex items-center gap-3 text-sm text-luxe-mutedText">
          <input className="h-4 w-4 border-luxe-line accent-luxe-primary" type="checkbox" />
          <span>Ghi nhớ đăng nhập</span>
        </label>

        <button className="h-12 w-full bg-luxe-primary text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-luxe-primarySoft" type="submit">
          Đăng nhập <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="my-9 h-px bg-luxe-line" />

      <p className="text-center text-sm text-luxe-mutedText">
        Bạn chưa có tài khoản?{" "}
        <Link className="font-bold text-luxe-ink transition hover:text-luxe-primarySoft" to="/register">
          Đăng ký tài khoản mới
        </Link>
      </p>

      <p className="mt-28 text-center text-xs font-semibold uppercase tracking-[0.12em] text-luxe-line">© 2025 LUMINA. All rights reserved.</p>
    </div>
  );
}
