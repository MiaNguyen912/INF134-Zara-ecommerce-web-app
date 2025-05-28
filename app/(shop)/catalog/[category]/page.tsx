import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/catalog/product-grid";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export const metadata: Metadata = {
  title: "Catalog",
};

// Generate static pages for all categories at build time
export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  // Find the category
  const categoryData = categories.find((cat) => cat.slug === category);

  if (!categoryData) {
    notFound();
  }

  // Filter products by category
  const categoryProducts = products.filter((product) => product.categoryId === categoryData.id);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-light mb-8">{categoryData.name}</h1>

        {categoryProducts.length > 0 ? <ProductGrid products={categoryProducts} /> : <p className="text-center py-12 text-gray-500">No products found in this category.</p>}
      </div>
    </div>
  );
}
