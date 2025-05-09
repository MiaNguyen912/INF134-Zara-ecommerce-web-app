import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/catalog/${category.slug}`} className="group block relative aspect-[3/4]">
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 z-10" />

      <Image src={category.image} alt={category.name} fill className="object-cover" sizes="20vw" />

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <span className="text-white text-xl md:text-2xl font-medium tracking-wider uppercase">{category.name}</span>
      </div>
    </Link>
  );
}
