import { FaBars } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
export function ProductToolbar({
    totalProducts,
    visibleFrom,
    visibleTo,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange,
}) {
    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-luxe-mutedText">
                {totalProducts === 0 ? "Không có sản phẩm" : `Hiển thị ${visibleFrom} - ${visibleTo} trên ${totalProducts} sản phẩm`}
            </p>
            <div className="flex items-center gap-3">
                <select
                    className="h-9 border border-luxe-line bg-white px-3 text-xs font-bold uppercase text-luxe-ink outline-none"
                    value={sortBy}
                    onChange={(event) => onSortChange(event.target.value)}
                >
                    <option value="newest">Mới Nhất</option>
                    <option value="price-asc">Giá Tăng Dần</option>
                    <option value="price-desc">Giá Giảm Dần</option>
                </select>
                <div className="flex border border-luxe-line">
                    <button
                        className={`grid h-9 w-9 place-items-center ${viewMode === "grid" ? "bg-luxe-primary text-white" : "text-luxe-mutedText transition hover:text-luxe-ink"}`}
                        aria-label="Xem dạng lưới"
                        onClick={() => onViewModeChange("grid")}
                    >
                        <FiGrid />
                    </button>
                    <button
                        className={`grid h-9 w-9 place-items-center ${viewMode === "list" ? "bg-luxe-primary text-white" : "text-luxe-mutedText transition hover:text-luxe-ink"}`}
                        aria-label="Xem dạng danh sách"
                        onClick={() => onViewModeChange("list")}
                    >
                        <FaBars />
                    </button>
                </div>
            </div>
        </div>
    );
}
