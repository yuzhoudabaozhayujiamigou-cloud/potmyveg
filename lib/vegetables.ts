import vegetablesData from "@/data/vegetables.json";

export type Vegetable = {
  name: string;
  min_gallons: number;
  optimal_gallons: number;
  min_depth_inches: number;
  pot_diameter_inches: number;
  notes: string;
  difficulty: string;
  season: string;
};

export const vegetables = vegetablesData as Vegetable[];

export function slugifyVegetable(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
