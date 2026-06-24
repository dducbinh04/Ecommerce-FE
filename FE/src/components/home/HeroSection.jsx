import { Link } from "react-router-dom";

export function HeroSection() {
    return (
        <section className="relative isolate min-h-[620px] overflow-hidden bg-luxe-surface">
            <img
                className="absolute inset-0 h-full w-full object-cover object-[64%_center]"
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=90"
                alt="Người mẫu mặc đầm trắng thanh lịch"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(252,249,248,0.98)_0%,rgba(252,249,248,0.82)_34%,rgba(252,249,248,0.18)_60%,rgba(0,0,0,0.38)_100%)]" />
            <div className="relative mx-auto flex min-h-[620px] max-w-[1280px] items-center px-4 py-20 sm:px-6 lg:px-10">
                <div className="max-w-xl">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-luxe-gold">Bộ sưu tập mùa thu 2026</p>
                    <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-normal text-luxe-ink sm:text-5xl lg:text-6xl">
                        Định Nghĩa Lại Sự Tinh Tế Của Bạn
                    </h1>
                    <p className="mt-6 max-w-md text-sm leading-7 text-luxe-mutedText sm:text-base">
                        Khám phá những thiết kế mới nhất, kết hợp giữa nghệ thuật tối giản và chất liệu cao cấp bền vững.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link className="bg-luxe-primary px-7 py-4 text-xs font-bold uppercase tracking-normal text-white transition hover:bg-luxe-primarySoft" to="/products">
                            Mua Ngay
                        </Link>
                        <a className="border border-luxe-primary px-7 py-4 text-xs font-bold uppercase tracking-normal text-luxe-primary transition hover:bg-white/55" href="#categories">
                            Bộ Sưu Tập
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
