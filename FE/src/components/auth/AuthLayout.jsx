import { Link } from "react-router-dom";

export function AuthLayout({ children, mode }) {
  const isRegister = mode === "register";
  const image = isRegister
    ? "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=90"
    : "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=90";
  const title = isRegister ? "LUMINA" : "LUMINA";
  const description = isRegister
    ? "Nơi tinh hoa hội tụ. Khám phá không gian mua sắm đẳng cấp và định hình phong cách cá nhân của bạn."
    : "Nơi nghệ thuật gặp gỡ sự tinh tế. Trải nghiệm không gian mua sắm đẳng cấp với thời gian.";

  return (
    <main className="min-h-screen bg-luxe-charcoal p-3 text-luxe-ink">
      <div className="mx-auto grid min-h-[calc(100vh-24px)] max-w-[1280px] overflow-hidden bg-luxe-surface lg:grid-cols-2">
        <section className="relative hidden min-h-[640px] overflow-hidden lg:block">
          <img className="absolute inset-0 h-full w-full object-cover" src={image} alt="Không gian nội thất LUMINA" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,13,34,0.08)_0%,rgba(0,13,34,0.78)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-12 text-white">
            <Link to="/" className="font-display text-5xl font-bold tracking-normal">
              {title}
            </Link>
            <p className="mt-5 max-w-md text-base leading-7 text-white/78">{description}</p>
          </div>
        </section>
        <section className="flex min-h-[calc(100vh-24px)] items-center justify-center px-6 py-12 sm:px-10 lg:min-h-[640px]">
          {children}
        </section>
      </div>
    </main>
  );
}
