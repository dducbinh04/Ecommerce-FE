export function NewsletterSection() {
  return (
    <section className="bg-luxe-primary py-20 text-white">
      <div className="mx-auto max-w-[1280px] px-4 text-center sm:px-6 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/60">Tham gia cộng đồng Lumina</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-normal">Nhận Thông Tin Đặc Quyền</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/70">
          Đăng ký để nhận thông tin về các bộ sưu tập mới nhất, ưu đãi độc quyền và tin tức thời trang sớm nhất.
        </p>
        <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            className="h-12 flex-1 border border-white/10 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-white/45 focus:border-luxe-gold"
            placeholder="Địa chỉ email của bạn"
            type="email"
          />
          <button className="h-12 bg-white px-8 text-xs font-bold uppercase text-luxe-primary transition hover:bg-luxe-surface" type="submit">
            Đăng Ký
          </button>
        </form>
        <p className="mt-4 text-[11px] text-white/45">Bằng cách đăng ký, bạn đồng ý với chính sách bảo mật của chúng tôi.</p>
      </div>
    </section>
  );
}
