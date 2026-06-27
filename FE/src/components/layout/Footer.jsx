import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const footerGroups = [
    { title: "Danh Mục", links: ["Điện tử", "Gia dụng", "Phụ kiện"] },
    { title: "Công Ty", links: ["Về chúng tôi", "Tuyển dụng", "Liên hệ"] },
    { title: "Hỗ Trợ", links: ["Trung tâm bảo hành", "Giao hàng & Đổi trả", "Câu hỏi thường gặp"] },
];

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-luxe-charcoal text-white">
            <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-16 sm:px-6 lg:px-10 md:grid-cols-[2fr_repeat(4,1fr)]">
                <div>
                    <h2 className="font-display text-base font-bold tracking-normal">LUMINA</h2>
                    <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
                        Điểm đến mua sắm đa ngành với danh mục sản phẩm phong phú, trải nghiệm tìm kiếm nhanh và lựa chọn phù hợp cho nhu cầu hằng ngày.
                    </p>
                </div>

                {footerGroups.map((group) => (
                    <div key={group.title}>
                        <h3 className="text-xs font-bold uppercase tracking-normal">{group.title}</h3>
                        <ul className="mt-5 space-y-3 text-sm text-white/55">
                            {group.links.map((link) => (
                                <li key={link}>
                                    <a className="transition hover:text-white" href="/">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div>
                    <h3 className="text-xs font-bold uppercase tracking-normal">Kết Nối</h3>
                    <div className="mt-5 flex gap-3 text-lg text-white/60">
                        <a className="transition hover:text-white" aria-label="Instagram" href="/">
                            <FaInstagram />
                        </a>
                        <a className="transition hover:text-white" aria-label="Facebook" href="/">
                            <FaFacebook />
                        </a>
                        <a className="transition hover:text-white" aria-label="YouTube" href="/">
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-6 text-xs text-white/45 sm:px-6 md:flex-row md:justify-between lg:px-10">
                    <p>© 2026 LUMINA. Tất cả quyền được bảo lưu.</p>
                    <div className="flex flex-wrap gap-6">
                        <a href="/">Chính sách bảo mật</a>
                        <a href="/">Điều khoản sử dụng</a>
                        <a href="/">Liên hệ</a>
                        <a href="/">Hệ thống cửa hàng</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
