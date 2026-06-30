import { useForm } from "react-hook-form";

export function ProfileForm({ profile, onSubmit, isLoading }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            fullName: profile?.fullName || "",
            address: profile?.address || "",
            birthDate: profile?.birthDate || "",
            gender: profile?.gender || "MALE",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Họ tên */}
            <div>
                <label className="block text-sm font-semibold text-luxe-ink">
                    Họ tên *
                </label>
                <input
                    type="text"
                    placeholder="Nhập họ tên"
                    {...register("fullName", {
                        required: "Họ tên không được để trống",
                        minLength: {
                            value: 2,
                            message: "Họ tên phải có ít nhất 2 ký tự",
                        },
                        maxLength: {
                            value: 100,
                            message: "Họ tên không quá 100 ký tự",
                        },
                    })}
                    className="mt-2 w-full rounded-lg border border-luxe-line bg-white px-4 py-3 text-luxe-ink placeholder:text-luxe-mutedText focus:border-luxe-primary focus:outline-none"
                />
                {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                )}
            </div>

            {/* Địa chỉ */}
            <div>
                <label className="block text-sm font-semibold text-luxe-ink">
                    Địa chỉ
                </label>
                <input
                    type="text"
                    placeholder="Nhập địa chỉ"
                    {...register("address", {
                        maxLength: {
                            value: 255,
                            message: "Địa chỉ không quá 255 ký tự",
                        },
                    })}
                    className="mt-2 w-full rounded-lg border border-luxe-line bg-white px-4 py-3 text-luxe-ink placeholder:text-luxe-mutedText focus:border-luxe-primary focus:outline-none"
                />
                {errors.address && (
                    <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
                )}
            </div>

            {/* Ngày sinh */}
            <div>
                <label className="block text-sm font-semibold text-luxe-ink">
                    Ngày sinh
                </label>
                <input
                    type="date"
                    {...register("birthDate")}
                    className="bg-white mt-2 w-full rounded-lg border border-luxe-line px-4 py-3 text-luxe-ink focus:border-luxe-primary focus:outline-none"
                />
            </div>

            {/* Giới tính */}
            <div>
                <label className="block text-sm font-semibold text-luxe-ink">
                    Giới tính *
                </label>
                <select
                    {...register("gender", {
                        required: "Vui lòng chọn giới tính",
                    })}
                    className="mt-2 w-full rounded-lg border border-luxe-line bg-white px-4 py-3 text-luxe-ink focus:border-luxe-primary focus:outline-none"
                >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                </select>
                {errors.gender && (
                    <p className="mt-1 text-xs text-red-600">{errors.gender.message}</p>
                )}
            </div>

            {/* Submit button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-luxe-primary py-3 text-sm font-bold text-white transition hover:bg-luxe-primarySoft disabled:opacity-60"
            >
                {isLoading ? "Đang cập nhật..." : "Cập nhật thông tin"}
            </button>
        </form>
    );
}
