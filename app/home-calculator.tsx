"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { type Vegetable, vegetables } from "@/lib/vegetables";

function toLabel(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function HomeCalculator() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Vegetable | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? vegetables.filter((v) => v.name.toLowerCase().includes(q))
      : [...vegetables].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [query]);

  function handleSelect(veg: Vegetable) {
    setSelected(veg);
    setQuery(veg.name);
    setOpen(false);
  }

  const resultCards = selected
    ? [
        { label: "Minimum Container Volume", value: `${selected.min_gallons} gallons` },
        { label: "Optimal Container Volume", value: `${selected.optimal_gallons} gallons` },
        { label: "Minimum Soil Depth", value: `${selected.min_depth_inches} inches` },
        { label: "Recommended Pot Diameter", value: `${selected.pot_diameter_inches} inches` },
        { label: "Difficulty", value: toLabel(selected.difficulty) },
        { label: "Best Season", value: toLabel(selected.season) },
        { label: "Notes", value: selected.notes },
      ]
    : [];

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-green-50">
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-green-900 sm:text-4xl">
          PotMyVeg - Find the Right Pot Size for Your Vegetables
        </h1>
        <p className="mt-3 max-w-3xl text-base text-green-800 sm:text-lg">
          Pick a vegetable to instantly see the container size, depth, diameter, and growing tips for healthier harvests.
        </p>

        <section className="mt-8 rounded-2xl border border-green-200 bg-white p-5 shadow-sm sm:p-6">
          <label htmlFor="vegetable-search" className="mb-2 block text-sm font-semibold text-green-900">
            Search and select a vegetable
          </label>

          {/* Custom dropdown */}
          <div className="relative">
            <div className="relative">
              <input
                ref={inputRef}
                id="vegetable-search"
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(null);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                placeholder="Type to search vegetables..."
                className="w-full rounded-xl border border-green-300 bg-green-50 px-4 py-3 pr-10 text-green-900 placeholder-green-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                autoComplete="off"
              />
              <button
                type="button"
                aria-label={open ? "Close vegetable list" : "Open vegetable list"}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setOpen((v) => !v);
                  if (!open) inputRef.current?.focus();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-green-800 hover:bg-green-100"
              >
                {open ? "▲" : "▼"}
              </button>
            </div>
            {open && filtered.length > 0 && (
              <ul className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-green-200 bg-white shadow-lg">
                {filtered.map((veg) => (
                  <li
                    key={veg.name}
                    onMouseDown={() => handleSelect(veg)}
                    className="cursor-pointer px-4 py-2 text-green-900 hover:bg-green-50"
                  >
                    {veg.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="mt-6">
          {selected ? (
            <>
              <h2 className="text-2xl font-semibold text-green-900">
                Container Guide: {selected.name}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resultCards.map((card) => (
                  <article
                    key={card.label}
                    className="rounded-xl border border-green-200 bg-white p-4 shadow-sm"
                  >
                    <p className="text-sm font-medium text-green-700">{card.label}</p>
                    <p className="mt-2 text-lg font-semibold text-green-900">{card.value}</p>
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
          <Link href="/vegetables" className="font-semibold text-green-900 underline">
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
