import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TrendingGadgets from "@/components/home/TrendingGadgets";
import StatisticsSection from "@/components/home/StatisticsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <TrendingGadgets />
      <WhyChooseUs />
      <StatisticsSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
}
