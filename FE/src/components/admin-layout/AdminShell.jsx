import { AdminFooter } from "./AdminFooter";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

export function AdminShell({ title, children }) {
  return (
    <div className="min-h-screen bg-luxe-container text-luxe-ink">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar title={title} />
          <main className="flex-1 px-8 py-8">{children}</main>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
