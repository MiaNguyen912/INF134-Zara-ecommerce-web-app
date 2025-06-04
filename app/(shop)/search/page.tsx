import { ProductCard } from "@/components/catalog/product-card";
import { Product } from "@/types";
import { getAllProducts } from "@/lib/product";
import { products } from "@/data/products";

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.toLowerCase() || "";

  const prod: Product[] = await getAllProducts();
  const filtered = products.filter((product) => product.name.toLowerCase().includes(query));

  if (!query || filtered.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2x1 font-semibold mb-4">No products found</h1>
        <p>Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2x1 font-semibold mb-6">Results for &quot;{query}&quot;</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
