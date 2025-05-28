import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { Metadata } from "next";
import ProductDetails from "@/components/product/product-details";

export const metadata: Metadata = {
  title: "Product",
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
