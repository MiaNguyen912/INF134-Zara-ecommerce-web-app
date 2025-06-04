"use client";

import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/catalog/product-grid";
import { SortButton } from "@/components/catalog/sort-button";
import { FilterButton } from "@/components/catalog/filter-button";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const [currentSort, setCurrentSort] = useState("newest");
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string[] }>({});

  // Find the category
  const categoryData = categories.find((cat) => cat.slug === category);

  if (!categoryData) {
    notFound();
  }

  // Filter products by category
  let categoryProducts = products.filter((product) => product.categoryId === categoryData.id);

  // Apply filters
  if (Object.keys(activeFilters).length > 0) {
    categoryProducts = categoryProducts.filter((product) => {
      // Price filter
      if (activeFilters.price?.length) {
        const priceMatch = activeFilters.price.some((range) => {
          switch (range) {
            case "under_50":
              return product.price < 50;
            case "50_100":
              return product.price >= 50 && product.price <= 100;
            case "100_200":
              return product.price > 100 && product.price <= 200;
            case "over_200":
              return product.price > 200;
            default:
              return true;
          }
        });
        if (!priceMatch) return false;
      }

      // Size filter
      if (activeFilters.size?.length) {
        const sizeMatch = activeFilters.size.some((size) => product.sizes.includes(size));
        if (!sizeMatch) return false;
      }

      // Color filter
      if (activeFilters.color?.length) {
        const colorMatch = activeFilters.color.some((color) => product.color.some((productColor) => productColor.toLowerCase() === color));
        if (!colorMatch) return false;
      }

      return true;
    });
  }

  // Sort products based on current sort option
  categoryProducts = sortProducts(categoryProducts, currentSort);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-light">{categoryData.name}</h1>
          <div className="flex items-center gap-4">
            <SortButton onSort={setCurrentSort} currentSort={currentSort} />
            <FilterButton onFilterChange={setActiveFilters} activeFilters={activeFilters} />
            {/* <button className="text-gray-600 hover:text-black" aria-label="Filter">
              <SlidersHorizontal className="w-5 h-5" />
            </button> */}
          </div>
        </div>
        {categoryProducts.length > 0 ? <ProductGrid products={categoryProducts} /> : <p className="text-center py-12 text-gray-500">No products found matching your filters.</p>}
      </div>
    </div>
  );
}

function sortProducts(products: Product[], sortBy: string): Product[] {
  const sortedProducts = [...products];

  switch (sortBy) {
    case "price_asc":
      return sortedProducts.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sortedProducts.sort((a, b) => b.price - a.price);
    case "popular":
      return sortedProducts.sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0)); // Sort by number of reviews
    case "newest":
    default:
      return sortedProducts.sort((a, b) => b.id.localeCompare(a.id)); // sort by id as a fallback since we don't have createdAt attribute
  }
}
