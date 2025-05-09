import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "WOMAN",
    slug: "woman",
    image: "https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "2",
    name: "MAN",
    slug: "man",
    image: "https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "3",
    name: "KIDS",
    slug: "kids",
    image: "https://images.pexels.com/photos/5693890/pexels-photo-5693890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "4",
    name: "HOME",
    slug: "home",
    image: "https://images.pexels.com/photos/5693890/pexels-photo-5693890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "5",
    name: "BEAUTY",
    slug: "Beauty",
    image: "https://images.pexels.com/photos/5693890/pexels-photo-5693890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export const subcategories = {
  WOMAN: [
    { id: "w1", type: "TRENDING", name: "THE NEW", slug: "new" },
    { id: "w2", type: "TRENDING", name: "SPECIAL OCCASION", slug: "special-occasion" },
    { id: "w3", type: "TRENDING", name: "SPECIAL PRICES", slug: "special-prices" },
    { id: "w4", type: "CLOTHING", name: "TOPS", slug: "dresses" },
    { id: "w5", type: "CLOTHING", name: "DRESSES", slug: "dresses" },
    { id: "w6", type: "CLOTHING", name: "JEANS", slug: "tops" },
    { id: "w7", type: "CLOTHING", name: "COATS", slug: "jeans" },
    { id: "w8", type: "CLOTHING", name: "SKIRTS", slug: "skirts" },
    { id: "w9", type: "ACCESSORIES", name: "ACCESSORIES/JEWELLERY", slug: "accessories/jewellery" },
    { id: "w10", type: "ACCESSORIES", name: "BAGS", slug: "bags" },
    { id: "w11", type: "BEAUTY", name: "PERFUMES", slug: "perfumes" },
    { id: "w12", type: "BEAUTY", name: "BEAUTY", slug: "beauty" },
    { id: "w13", type: "BEAUTY", name: "ZARA HAIR", slug: "zara hair" },
  ],
  MAN: [
    { id: "m1", type: "TRENDING", name: "NEW IN", slug: "new-in" },
    { id: "m2", type: "CLOTHING", name: "T-SHIRTS", slug: "t-shirts" },
    { id: "m3", type: "CLOTHING", name: "SHIRTS", slug: "shirts" },
    { id: "m4", type: "CLOTHING", name: "TROUSERS", slug: "trousers" },
    { id: "m5", type: "CLOTHING", name: "JACKETS", slug: "jackets" },
    { id: "m6", type: "CLOTHING", name: "KNITWEAR", slug: "knitwear" },
    { id: "m7", type: "CLOTHING", name: "JEANS", slug: "jeans" },
    { id: "m8", type: "CLOTHING", name: "SHOES", slug: "shoes" },
    { id: "m9", type: "ACCESSORIES", name: "BAGS", slug: "bags" },
  ],
  KIDS: [
    { id: "k1", type: "GIRL", name: "6-14 YEARS", slug: "girl" },
    { id: "k2", type: "BOY", name: "6-14 YEARS", slug: "boy" },
    { id: "k3", type: "BABY", name: "0 - 18 MONTHS", slug: "baby" },
  ],
  HOME: [
    { id: "h1", type: "", name: "BED LINEN", slug: "baby" },
    { id: "h2", type: "", name: "DECOR", slug: "girl" },
    { id: "h3", type: "", name: "FURNITURE", slug: "boy" },
  ],
  BEAUTY: [
    { id: "b1", type: "", name: "WOMEN", slug: "women" },
    { id: "b2", type: "", name: "MAN", slug: "man" },
    { id: "b3", type: "", name: "KIDS", slug: "kids" },
  ],
};
