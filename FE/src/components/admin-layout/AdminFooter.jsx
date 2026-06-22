export function AdminFooter() {
  return (
    <footer className="mt-auto border-t border-luxe-line bg-white px-8 py-6">
      <div className="flex flex-col gap-3 text-xs text-luxe-mutedText md:flex-row md:items-center md:justify-between">
        <p>© 2024 LUMINA Luxury E-commerce. All rights reserved.</p>
        <div className="flex gap-8">
          <a className="transition hover:text-luxe-ink" href="/">
            Support
          </a>
          <a className="transition hover:text-luxe-ink" href="/">
            Privacy Policy
          </a>
          <a className="transition hover:text-luxe-ink" href="/">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
