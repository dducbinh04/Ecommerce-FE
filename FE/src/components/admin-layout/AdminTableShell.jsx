export function AdminTableShell({ title, actions, children, summary, pages = ["‹", "1", "2", "3", "›"] }) {
  return (
    <section className="border border-luxe-line bg-white">
      <div className="flex flex-col gap-4 border-b border-luxe-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-xl font-bold tracking-normal text-luxe-ink">{title}</h2>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>

      <div className="overflow-x-auto">{children}</div>

      <div className="flex flex-col gap-4 border-t border-luxe-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-luxe-mutedText">{summary}</p>
        <div className="flex gap-2">
          {pages.map((page) => (
            <button
              key={page}
              className={`grid h-8 min-w-8 place-items-center border px-2 text-xs font-semibold ${
                page === "1" ? "border-luxe-primary bg-luxe-primary text-white" : "border-luxe-line text-luxe-ink hover:border-luxe-primary"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AdminActionButton({ children, to, tone = "default", as: Component = "button", ...props }) {
  const className =
    tone === "primary"
      ? "grid h-10 place-items-center bg-luxe-primary px-5 text-sm font-bold text-white transition hover:bg-luxe-primarySoft"
      : "h-10 border border-luxe-line px-4 text-sm font-semibold text-luxe-ink transition hover:border-luxe-primary";

  if (to) {
    const LinkComponent = Component;
    return (
      <LinkComponent className={className} to={to} {...props}>
        {children}
      </LinkComponent>
    );
  }

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

export function AdminRowActions({ viewTo, editTo, deleteLabel }) {
  return (
    <div className="flex justify-end gap-2">
      <a className="grid h-8 w-8 place-items-center border border-luxe-line text-luxe-mutedText transition hover:border-luxe-primary hover:text-luxe-ink" href={viewTo} aria-label="Xem">
        ◎
      </a>
      <a className="grid h-8 w-8 place-items-center border border-luxe-line text-luxe-mutedText transition hover:border-luxe-primary hover:text-luxe-ink" href={editTo} aria-label="Sửa">
        ✎
      </a>
      <button className="grid h-8 w-8 place-items-center border border-luxe-line text-luxe-mutedText transition hover:border-[#ba1a1a] hover:text-[#ba1a1a]" aria-label={deleteLabel}>
        ×
      </button>
    </div>
  );
}
