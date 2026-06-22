const footerGroups = [
  { title: "Sản Phẩm", links: ["Mới về", "Bán chạy", "Ưu đãi"] },
  { title: "Công Ty", links: ["Về chúng tôi", "Tuyển dụng", "Liên hệ"] },
  { title: "Hỗ Trợ", links: ["Vận chuyển", "Bảo hành", "Đổi trả"] },
];

const newsletterFooterGroups = [
  { title: "Sản Phẩm", links: ["Nội thất phòng khách", "Nội thất phòng ngủ", "Phụ kiện trang trí"] },
  { title: "Hỗ Trợ", links: ["Trung tâm bảo hành", "Giao hàng & Đổi trả", "Câu hỏi thường gặp"] },
];

export function Footer({ newsletter = false }) {
  const groups = newsletter ? newsletterFooterGroups : footerGroups;

  return (
    <footer className="border-t border-white/10 bg-luxe-charcoal text-white">
      <div className={`mx-auto grid max-w-[1280px] gap-12 px-4 py-16 sm:px-6 lg:px-10 ${newsletter ? "md:grid-cols-4" : "md:grid-cols-[2fr_repeat(4,1fr)]"}`}>
        <div>
          <h2 className="font-display text-base font-bold tracking-normal">LUMINA</h2>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
            Mang đến không gian sống đẳng cấp với những thiết kế nội thất tối giản, sang trọng và trường tồn với thời gian.
          </p>
        </div>

        {groups.map((group) => (
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

        {newsletter ? (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-normal">Đăng ký nhận tin</h3>
            <form className="mt-5 flex h-10 border border-white/15 bg-white/5">
              <input className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40" placeholder="Email của bạn" type="email" />
              <button className="grid w-11 place-items-center bg-luxe-primary text-white" type="submit" aria-label="Đăng ký">
                →
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-normal">Kết Nối</h3>
            <div className="mt-5 flex gap-3 text-lg text-white/60">
              <a className="transition hover:text-white" aria-label="Instagram" href="/">
                ◎
              </a>
              <a className="transition hover:text-white" aria-label="Facebook" href="/">
                f
              </a>
              <a className="transition hover:text-white" aria-label="YouTube" href="/">
                ▻
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-6 text-xs text-white/45 sm:px-6 md:flex-row md:justify-between lg:px-10">
          <p>© 2026 LUMINA. Bản quyền thuộc về Lumina Việt Nam.</p>
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
