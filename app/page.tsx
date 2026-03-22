import type { Metadata } from "next";
import HomeCalculator from "./home-calculator";

export const metadata: Metadata = {
  title: "PotMyVeg - Find the Right Pot Size for Your Vegetables",
  description:
    "Free container size calculator for vegetables. Find the right pot size for tomatoes, peppers, cucumbers and 50+ vegetables.",
};

export default function Home() {
  return <HomeCalculator />;
}
