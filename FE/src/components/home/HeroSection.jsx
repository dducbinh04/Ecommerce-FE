import { Link } from "react-router-dom";

export function HeroSection() {
    return (
        <section className="relative isolate min-h-[620px] overflow-hidden bg-luxe-surface">
            <img
                className="absolute inset-0 h-full w-full object-cover object-[64%_center]"
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1800&q=90"
                alt="Người mua sắm trong cửa hàng"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(252,249,248,0.98)_0%,rgba(252,249,248,0.82)_34%,rgba(252,249,248,0.18)_60%,rgba(0,0,0,0.38)_100%)]" />
            <div className="relative mx-auto flex min-h-[620px] max-w-[1280px] items-center px-4 py-20 sm:px-6 lg:px-10">
                <div className="max-w-xl">
                    <p className="fade-in-up text-xs font-bold uppercase tracking-[0.22em] text-luxe-gold">Điểm đến hấp dẫn</p>
                    <h1 className="fade-in-up fade-in-delay-1 mt-5 font-display text-4xl font-bold leading-tight tracking-normal text-luxe-ink sm:text-5xl lg:text-6xl">
                        Mọi thứ bạn cần chỉ trong một trang
                    </h1>
                    <p className="fade-in-up fade-in-delay-2 mt-6 max-w-md text-sm leading-7 text-luxe-mutedText sm:text-base">
                        Khám phá điện tử, gia dụng, phụ kiện, đồ dùng hằng ngày và nhiều nhóm sản phẩm khác trong một trải nghiệm mua sắm rõ ràng, tiện lợi.
                    </p>
                    <div className="fade-in-up fade-in-delay-3 mt-8 flex flex-wrap gap-4">
                        <Link className="bg-luxe-primary px-7 py-4 text-xs font-bold uppercase tracking-normal text-white transition hover:bg-luxe-primarySoft" to="/products">
                            Mua Sắm Ngay
                        </Link>
                        <a className="border border-luxe-primary px-7 py-4 text-xs font-bold uppercase tracking-normal text-luxe-primary transition hover:bg-white/55" href="#categories">
                            Xem Danh Mục
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
