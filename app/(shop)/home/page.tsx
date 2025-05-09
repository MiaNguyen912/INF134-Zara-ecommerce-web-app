import { CategoriesSection } from "@/components/home/categories-section";
import HorizontalCarousel from "@/components/home/horizontal-carousel";
import { carouselImages } from "@/data/landing-page-data";

export default function HomePage() {
  return (
    <div>
      <HorizontalCarousel images={carouselImages} />
      <CategoriesSection />
    </div>
  );
}
