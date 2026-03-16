import CTASection from "@/components/home/cta-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works";
import PricingSection from "@/components/home/pricing-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quicker — Summarize any PDF in seconds",
  description:
    "Transform lengthy PDFs into clear, concise summaries in under 30 seconds. Powered by AI. Perfect for research, work, and learning.",
};

export default function Home() {
  return (
    <div className="relative w-full">
      <HeroSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}
