// Common types for the application

export type Language = "English" | "Spanish" | "French" | "German" | "Italian" | "Chinese";

export type UserPreferences = {
  language: Language;
  location: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  categoryId: string;
  subCategoryId: string[];
  color: string[];
  sizes: string[];
  onSale?: boolean;
  discountPercentage?: number;
  rating: number;
  reviews: Review[];
};

export type Review = {
  id: string;
  username: string;
  date: string;
  rating: number;
  comment: string;
  images: string[] | null;
  sizeBought: string | null;
  colorBought: string | null;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  color: string;
};

export type CartState = {
  items: CartItem[];
  total: number;
};
