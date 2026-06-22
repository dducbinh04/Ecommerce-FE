import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthField } from "./AuthField";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // TODO: Gọi API register với data
    console.log(data);
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="font-display text-3xl font-bold tracking-normal text-luxe-ink">Tạo tài khoản mới</h1>
      <p className="mt-3 text-sm leading-6 text-luxe-mutedText">Chào mừng bạn đến với cộng đồng LUMINA.</p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <AuthField
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          error={errors.fullName?.message}
          registration={register("fullName", {
            required: "Họ và tên không được để trống",
            minLength: {
              value: 2,
              message: "Họ và tên phải có ít nhất 2 ký tự",
            },
          })}
        />

        <AuthField
          label="Email"
          type="email"
          placeholder="example@lumina.com"
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
          label="Số điện thoại"
          type="tel"
          placeholder="090 1234 567"
          error={errors.phone?.message}
          registration={register("phone", {
            required: "Số điện thoại không được để trống",
            pattern: {
              value: /^(0|\+84)[3-9]\d{8}$/,
              message: "Số điện thoại không đúng định dạng",
            },
          })}
        />

        <AuthField
          label="Mật khẩu"
          type="password"
          placeholder="••••••••"
          icon="◉"
          error={errors.password?.message}
          registration={register("password", {
            required: "Mật khẩu không được để trống",
            minLength: {
              value: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự",
            },
          })}
        />

        <AuthField
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          registration={register("confirmPassword", {
            required: "Vui lòng xác nhận mật khẩu",
            validate: (value) =>
              value === watch("password") || "Mật khẩu xác nhận không khớp",
          })}
        />

        <label className="flex items-start gap-3 text-sm leading-6 text-luxe-mutedText">
          <input
            className="mt-1 h-4 w-4 border-luxe-line accent-luxe-primary"
            type="checkbox"
            {...register("agreeTerms", {
              required: "Bạn cần đồng ý với điều khoản để tiếp tục",
            })}
          />
          <span>
            Tôi đồng ý với các{" "}
            <a className="font-semibold text-luxe-ink" href="/">
              Điều khoản sử dụng
            </a>{" "}
            và{" "}
            <a className="font-semibold text-luxe-ink" href="/">
              Chính sách bảo mật
            </a>{" "}
            của LUMINA.
          </span>
        </label>
        {errors.agreeTerms ? (
          <p className="-mt-3 text-xs text-red-500">{errors.agreeTerms.message}</p>
        ) : null}

        <button
          className="h-12 w-full bg-luxe-primary text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-luxe-primarySoft"
          type="submit"
        >
          Đăng ký
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-luxe-mutedText">
        Đã có tài khoản?{" "}
        <Link className="font-bold text-luxe-ink transition hover:text-luxe-primarySoft" to="/login">
          Đăng nhập
        </Link>
      </p>

      <div className="mt-12 flex justify-center gap-8 text-xs font-semibold uppercase tracking-[0.12em] text-luxe-mutedText">
        <a href="/">Hỗ trợ</a>
        <a href="/">Ngôn ngữ Tiếng Việt</a>
      </div>
    </div>
  );
}