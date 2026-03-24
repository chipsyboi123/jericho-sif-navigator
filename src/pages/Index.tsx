import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import Marquee from "@/components/home/Marquee";
import FundCarousel from "@/components/home/FundCarousel";
import ComparisonPreview from "@/components/home/ComparisonPreview";
import EducationTabs from "@/components/home/EducationTabs";
import WhyJericho from "@/components/home/WhyJericho";
import KnowledgePreview from "@/components/home/KnowledgePreview";
import CTAStrip from "@/components/home/CTAStrip";

const Index = () => {
  return (
    <>
      <SEOHead
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "SIF Insider",
          description: "India's go-to platform for Specialized Investment Funds.",
          publisher: { "@type": "Organization", name: "Jericho Ventures" },
        }}
      />
      <HeroSection />
      <Marquee />
      <FundCarousel />
      <ComparisonPreview />
      <EducationTabs />
      <WhyJericho />
      <KnowledgePreview />
      <CTAStrip />
    </>
  );
};

export default Index;
