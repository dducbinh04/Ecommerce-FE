import { Link } from "react-router-dom";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";

function getPageItems(currentPage, totalPages) {
  if (totalPages <= 1) {
    return [1];
  }

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const items = [];
  let previousPage = 0;

  for (const page of Array.from(pages).filter((page) => page >= 1 && page <= totalPages).sort((left, right) => left - right)) {
    if (page - previousPage > 1) {
      items.push(`ellipsis-${page}`);
    }

    items.push(page);
    previousPage = page;
  }

  return items;
}

export function AdminTableShell({ title, actions, children, summary, pagination }) {
  const currentPage = pagination?.currentPage ?? 1;
  const totalPages = pagination?.totalPages ?? 1;
  const onPageChange = pagination?.onPageChange;
  const pageItems = getPageItems(currentPage, totalPages);

  return (
    <section className="border border-luxe-line bg-white">
      <div className="flex flex-col gap-4 border-b border-luxe-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-xl font-bold tracking-normal text-luxe-ink">{title}</h2>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>

      <div className="overflow-x-auto">{children}</div>

      <div className="flex flex-col gap-4 border-t border-luxe-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-luxe-mutedText">{summary}</p>
        {totalPages > 1 ? (
          <div className="flex flex-wrap gap-2">
            <button
              className="grid h-8 min-w-8 place-items-center border border-luxe-line px-2 text-xs font-semibold text-luxe-ink transition hover:border-luxe-primary disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label="Trang trước"
            >
              ‹
            </button>
            {pageItems.map((pageItem) =>
              typeof pageItem === "number" ? (
                <button
                  key={pageItem}
                  className={`grid h-8 min-w-8 place-items-center border px-2 text-xs font-semibold transition ${
                    pageItem === currentPage ? "border-luxe-primary bg-luxe-primary text-white" : "border-luxe-line text-luxe-ink hover:border-luxe-primary"
                  }`}
                  type="button"
                  onClick={() => onPageChange?.(pageItem)}
                  aria-current={pageItem === currentPage ? "page" : undefined}
                >
                  {pageItem}
                </button>
              ) : (
                <span key={pageItem} className="grid h-8 min-w-8 place-items-center px-2 text-xs font-semibold text-luxe-mutedText">
                  …
                </span>
              )
            )}
            <button
              className="grid h-8 min-w-8 place-items-center border border-luxe-line px-2 text-xs font-semibold text-luxe-ink transition hover:border-luxe-primary disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              aria-label="Trang sau"
            >
              ›
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function AdminActionButton({ children, to, tone = "default", as: Component = "button", ...props }) {
  const { className: customClassName, ...restProps } = props;
  const className =
    tone === "primary"
      ? "grid h-10 place-items-center bg-luxe-primary px-5 text-sm font-bold text-white transition hover:bg-luxe-primarySoft"
      : "h-10 border border-luxe-line px-4 text-sm font-semibold text-luxe-ink transition hover:border-luxe-primary";
  const mergedClassName = customClassName ? `${className} ${customClassName}` : className;

  if (to) {
    const LinkComponent = Component;
    return (
      <LinkComponent className={mergedClassName} to={to} {...restProps}>
        {children}
      </LinkComponent>
    );
  }

  return (
    <Component className={mergedClassName} {...restProps}>
      {children}
    </Component>
  );
}

export function AdminRowActions({ viewTo, editTo, deleteLabel, onView, onEdit, onDelete }) {
  return (
    <div className="flex justify-end gap-2">
      {onView ? (
        <button className="grid h-8 w-8 place-items-center border border-luxe-line text-luxe-mutedText transition hover:border-luxe-primary hover:text-luxe-ink" type="button" onClick={onView} aria-label="Xem">
          <FiEye className="h-4 w-4" />
        </button>
      ) : viewTo ? (
        <Link className="grid h-8 w-8 place-items-center border border-luxe-line text-luxe-mutedText transition hover:border-luxe-primary hover:text-luxe-ink" to={viewTo} aria-label="Xem">
          <FiEye className="h-4 w-4" />
        </Link>
      ) : null}
      {onEdit ? (
        <button className="grid h-8 w-8 place-items-center border border-luxe-line text-luxe-mutedText transition hover:border-luxe-primary hover:text-luxe-ink" type="button" onClick={onEdit} aria-label="Sửa">
          <FiEdit2 className="h-4 w-4" />
        </button>
      ) : editTo ? (
        <Link className="grid h-8 w-8 place-items-center border border-luxe-line text-luxe-mutedText transition hover:border-luxe-primary hover:text-luxe-ink" to={editTo} aria-label="Sửa">
          <FiEdit2 className="h-4 w-4" />
        </Link>
      ) : null}
      <button className="grid h-8 w-8 place-items-center border border-luxe-line text-luxe-mutedText transition hover:border-[#ba1a1a] hover:text-[#ba1a1a]" type="button" aria-label={deleteLabel} onClick={onDelete}>
        <FiTrash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
