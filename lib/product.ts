import { products } from "@/data/products";
import { Product } from "@/types";

export async function getAllProducts(): Promise<Product[]> {
    return products;
}