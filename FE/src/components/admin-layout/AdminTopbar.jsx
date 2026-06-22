export function AdminTopbar({ title }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-luxe-line bg-white px-8">
      <h1 className="font-display text-xl font-bold tracking-normal text-luxe-ink">{title}</h1>
      <div className="flex items-center gap-4">
        <label className="hidden h-9 w-64 items-center gap-2 rounded-md bg-luxe-muted px-3 text-xs text-luxe-mutedText md:flex">
          <span aria-hidden="true">⌕</span>
          <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-luxe-mutedText" placeholder="Tìm kiếm..." />
        </label>
        <button className="grid h-8 w-8 place-items-center text-luxe-mutedText transition hover:bg-luxe-muted hover:text-luxe-ink" aria-label="Thông báo">
          ♢
        </button>
        <button className="grid h-8 w-8 place-items-center text-luxe-mutedText transition hover:bg-luxe-muted hover:text-luxe-ink" aria-label="Cài đặt">
          ⚙
        </button>
        <button className="grid h-8 w-8 place-items-center text-luxe-mutedText transition hover:bg-luxe-muted hover:text-luxe-ink" aria-label="Trợ giúp">
          ?
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-full bg-luxe-primary text-xs font-bold text-white" aria-label="Tài khoản admin">
          LA
        </button>
      </div>
    </header>
  );
}
