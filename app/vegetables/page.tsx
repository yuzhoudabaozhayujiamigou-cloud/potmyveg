import type { Metadata } from "next";
import Link from "next/link";
import { slugifyVegetable, vegetables } from "@/lib/vegetables";

function toLabel(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const metadata: Metadata = {
  title: "All Vegetables Container Size Guide",
  description:
    "Browse all 55 vegetables and their recommended container sizes, seasons, and growing difficulty levels.",
};

export default function VegetablesPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-green-900 sm:text-4xl">
          All Vegetables Container Size Guide
        </h1>
        <p className="mt-3 text-green-800">
          Compare pot size recommendations for all {vegetables.length} vegetables.
        </p>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vegetables.map((vegetable) => (
            <Link
              key={vegetable.name}
              href={`/vegetables/${slugifyVegetable(vegetable.name)}`}
              className="rounded-xl border border-green-200 bg-white p-4 shadow-sm transition hover:border-green-300 hover:shadow"
            >
              <h2 className="text-xl font-semibold text-green-900">
                {vegetable.name}
              </h2>
              <p className="mt-2 text-sm text-green-800">
                Optimal Pot Size:{" "}
                <span className="font-semibold">
                  {vegetable.optimal_gallons} gallons
                </span>
              </p>
              <p className="mt-1 text-sm text-green-800">
                Season: <span className="font-semibold">{toLabel(vegetable.season)}</span>
              </p>
              <p className="mt-1 text-sm text-green-800">
                Difficulty:{" "}
                <span className="font-semibold">
                  {toLabel(vegetable.difficulty)}
                </span>
              </p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
