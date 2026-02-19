import Hero from "@/components/Hero";
import FeaturedEvents from "@/components/FeaturedEvents";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedEvents />
      <StatsSection />
      <CTASection />
    </>
  );
}
