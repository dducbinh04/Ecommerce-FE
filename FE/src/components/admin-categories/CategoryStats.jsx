import { categoryStats } from "./categoryAdminData";

export function CategoryStats() {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {categoryStats.map((stat) => (
        <article key={stat.label} className="border border-luxe-line bg-white px-6 py-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-luxe-mutedText">{stat.label}</p>
          <p className="mt-3 font-display text-2xl font-bold tracking-normal text-luxe-ink">{stat.value}</p>
        </article>
      ))}
    </section>
  );
}
