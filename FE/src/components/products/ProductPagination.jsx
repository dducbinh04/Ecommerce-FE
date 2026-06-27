import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export function ProductPagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <nav className="mt-20 flex items-center justify-center gap-2" aria-label="Phân trang sản phẩm">
            <PageButton label="Trang trước" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                <LuChevronLeft />
            </PageButton>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <PageButton
                    key={page}
                    active={page === currentPage}
                    label={`Trang ${page}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </PageButton>
            ))}
            <PageButton label="Trang sau" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                <LuChevronRight />
            </PageButton>
        </nav>
    );
}

function PageButton({ children, active = false, label, onClick, disabled = false }) {
    return (
        <button
            className={`grid h-10 w-10 place-items-center border text-sm font-semibold transition ${active ? "border-luxe-primary bg-luxe-primary text-white" : "border-luxe-line text-luxe-ink hover:border-luxe-primary"} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            onClick={disabled ? undefined : onClick}
        >
            {children}
        </button>
    );
}
