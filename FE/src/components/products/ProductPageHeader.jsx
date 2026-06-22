export function ProductPageHeader() {
  return (
    <div className="mb-14">
      <div className="mb-5 flex items-center gap-2 text-xs font-semibold text-luxe-mutedText">
        <a className="transition hover:text-luxe-ink" href="/">
          Trang chủ
        </a>
        <span>›</span>
        <span className="text-luxe-ink">Sản phẩm</span>
      </div>
      <h1 className="font-display text-4xl font-bold leading-tight tracking-normal text-luxe-ink sm:text-5xl">Danh Sách Sản Phẩm</h1>
    </div>
  );
}
