const pages = ["1", "2", "3", "...", "8"];

export function ProductPagination() {
  return (
    <nav className="mt-20 flex items-center justify-center gap-2" aria-label="Phân trang sản phẩm">
      <PageButton label="Trang trước">‹</PageButton>
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`${page}-${index}`} className="grid h-10 w-10 place-items-center text-sm text-luxe-mutedText">
            ...
          </span>
        ) : (
          <PageButton key={page} active={page === "1"} label={`Trang ${page}`}>
            {page}
          </PageButton>
        ),
      )}
      <PageButton label="Trang sau">›</PageButton>
    </nav>
  );
}

function PageButton({ children, active = false, label }) {
  return (
    <button
      className={`grid h-10 w-10 place-items-center border text-sm font-semibold transition ${
        active ? "border-luxe-primary bg-luxe-primary text-white" : "border-luxe-line text-luxe-ink hover:border-luxe-primary"
      }`}
      aria-label={label}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </button>
  );
}
