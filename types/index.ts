// Common types for the application

export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Italian' | 'Chinese';

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
  color: string;
  sizes: string[];
  isNew?: boolean;
  onSale?: boolean;
  discount?: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};

export type CartState = {
  items: CartItem[];
  total: number;
};