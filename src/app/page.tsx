import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TrendingGadgets from "@/components/home/TrendingGadgets";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <TrendingGadgets />
      <NewsletterSection />
    </div>
  );
}
