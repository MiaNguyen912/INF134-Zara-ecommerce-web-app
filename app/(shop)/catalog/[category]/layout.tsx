import { Metadata } from "next";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse our collection of products",
};

// Generate static pages for all categories at build time
export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
