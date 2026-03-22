"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { type Vegetable, vegetables } from "@/lib/vegetables";

function toLabel(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function HomeCalculator() {
  const [query, setQuery] = useState("");

  const selectedVegetable = useMemo<Vegetable | null>(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return null;
    }
    return (
      vegetables.find(
        (vegetable) => vegetable.name.toLowerCase() === normalizedQuery,
      ) ?? null
    );
  }, [query]);

  const resultCards = selectedVegetable
    ? [
        {
          label: "Minimum Container Volume",
          value: `${selectedVegetable.min_gallons} gallons`,
        },
        {
          label: "Optimal Container Volume",
          value: `${selectedVegetable.optimal_gallons} gallons`,
        },
        {
          label: "Minimum Soil Depth",
          value: `${selectedVegetable.min_depth_inches} inches`,
        },
        {
          label: "Recommended Pot Diameter",
          value: `${selectedVegetable.pot_diameter_inches} inches`,
        },
        {
          label: "Difficulty",
          value: toLabel(selectedVegetable.difficulty),
        },
        {
          label: "Best Season",
          value: toLabel(selectedVegetable.season),
        },
        {
          label: "Notes",
          value: selectedVegetable.notes,
        },
      ]
    : [];

  return (
    <div className="flex flex-1 flex-col bg-green-50">
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-green-900 sm:text-4xl">
          PotMyVeg - Find the Right Pot Size for Your Vegetables
        </h1>
        <p className="mt-3 max-w-3xl text-base text-green-800 sm:text-lg">
          Pick a vegetable to instantly see the container size, depth, diameter,
          and growing tips for healthier harvests.
        </p>

        <section className="mt-8 rounded-2xl border border-green-200 bg-white p-5 shadow-sm sm:p-6">
          <label
            htmlFor="vegetable-search"
            className="mb-2 block text-sm font-semibold text-green-900"
          >
            Search and select a vegetable
          </label>
          <input
            id="vegetable-search"
            type="text"
            list="vegetable-options"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Start typing, for example: Tomato, Pepper, Cucumber..."
            className="w-full rounded-lg border border-green-300 bg-green-50 px-3 py-2 text-green-900 outline-none ring-green-200 transition focus:ring-2"
          />
          <datalist id="vegetable-options">
            {vegetables.map((vegetable) => (
              <option key={vegetable.name} value={vegetable.name} />
            ))}
          </datalist>
          {!selectedVegetable && query.trim().length > 0 ? (
            <p className="mt-2 text-sm text-green-700">
              Select one of the 55 vegetables from the dropdown suggestions.
            </p>
          ) : null}
        </section>

        <section className="mt-8">
          {selectedVegetable ? (
            <>
              <h2 className="text-2xl font-semibold text-green-900">
                Container Guide: {selectedVegetable.name}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resultCards.map((card) => (
                  <article
                    key={card.label}
                    className="rounded-xl border border-green-200 bg-white p-4 shadow-sm"
                  >
                    <p className="text-sm font-medium text-green-700">
                      {card.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-green-900">
                      {card.value}
                    </p>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <article className="rounded-xl border border-dashed border-green-300 bg-white p-6 text-green-800">
              Choose a vegetable above to see the right pot size instantly.
            </article>
          )}
        </section>

        <p className="mt-8 text-sm text-green-800">
          Looking for every crop in one place?{" "}
          <Link href="/vegetables" className="font-semibold text-green-900">
            Browse all vegetables
          </Link>
          .
        </p>
      </main>

      <footer className="border-t border-green-200 bg-green-100 px-4 py-4 text-center text-sm font-medium text-green-800">
        Free container gardening calculator | PotMyVeg
      </footer>
    </div>
  );
}
