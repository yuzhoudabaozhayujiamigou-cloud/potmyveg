import { notFound } from "next/navigation";
import vegetables from "../../../data/vegetables.json";
import type { Metadata } from "next";
import Link from "next/link";

type Vegetable = {
  name: string;
  min_gallons: number;
  optimal_gallons: number;
  min_depth_inches: number;
  pot_diameter_inches: number;
  notes: string;
  difficulty: string;
  season: string;
};

function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function generateStaticParams() {
  return (vegetables as Vegetable[]).map((v) => ({
    slug: nameToSlug(v.name),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const veg = (vegetables as Vegetable[]).find((v) => nameToSlug(v.name) === slug);
  if (!veg) return {};
  return {
    title: `${veg.name} Container Size Guide - PotMyVeg`,
    description: `Find the right pot size for ${veg.name}. Minimum ${veg.min_gallons} gallons, optimal ${veg.optimal_gallons} gallons. Free container gardening calculator.`,
  };
}

export default async function VegetablePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const veg = (vegetables as Vegetable[]).find((v) => nameToSlug(v.name) === slug);
  if (!veg) notFound();

  return (
    <main className="min-h-screen bg-green-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/vegetables"
          className="mb-4 inline-block text-sm text-green-700 hover:underline"
        >
          ← All Vegetables
        </Link>
        <h1 className="mb-2 text-3xl font-bold text-green-900">
          {veg.name} Container Size Guide
        </h1>
        <p className="mb-6 text-green-700">
          Everything you need to grow {veg.name} in containers.
        </p>

        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-200 bg-white p-4">
            <div className="mb-1 text-sm text-green-600">Optimal Size</div>
            <div className="text-2xl font-bold text-green-900">
              {veg.optimal_gallons} gal
            </div>
          </div>
          <div className="rounded-xl border border-green-200 bg-white p-4">
            <div className="mb-1 text-sm text-green-600">Minimum Size</div>
            <div className="text-2xl font-bold text-green-900">
              {veg.min_gallons} gal
            </div>
          </div>
          <div className="rounded-xl border border-green-200 bg-white p-4">
            <div className="mb-1 text-sm text-green-600">Min Depth</div>
            <div className="text-2xl font-bold text-green-900">
              {veg.min_depth_inches}&quot;
            </div>
          </div>
          <div className="rounded-xl border border-green-200 bg-white p-4">
            <div className="mb-1 text-sm text-green-600">Pot Diameter</div>
            <div className="text-2xl font-bold text-green-900">
              {veg.pot_diameter_inches}&quot;
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-green-200 bg-white p-5">
          <h2 className="mb-3 font-semibold text-green-800">Growing Info</h2>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-green-600">Season:</span>{" "}
              <span className="font-medium capitalize">{veg.season}</span>
            </div>
            <div>
              <span className="text-green-600">Difficulty:</span>{" "}
              <span className="font-medium capitalize">{veg.difficulty}</span>
            </div>
          </div>
          {veg.notes && <p className="mt-3 text-sm text-gray-600">💡 {veg.notes}</p>}
        </div>

        <div className="rounded-xl bg-green-700 p-5 text-center text-white">
          <p className="mb-2 font-semibold">Use our free calculator</p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-white px-6 py-2 font-bold text-green-700 hover:bg-green-50"
          >
            Try the Calculator →
          </Link>
        </div>
      </div>
    </main>
  );
}
