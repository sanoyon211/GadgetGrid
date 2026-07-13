import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TrendingGadgets from "@/components/home/TrendingGadgets";
import StatisticsSection from "@/components/home/StatisticsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import NewsletterSection from "@/components/home/NewsletterSection";
import ImageSlider from "@/components/home/ImageSlider";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "GadgetGrid offers the best deals on premium electronics, smartphones, laptops, and wearables. Shop now and upgrade your lifestyle.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <TrendingGadgets />
      <ImageSlider />
      <WhyChooseUs />
      <StatisticsSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
}
