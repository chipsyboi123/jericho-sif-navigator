import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import ComparisonPreview from "@/components/home/ComparisonPreview";
import EducationTabs from "@/components/home/EducationTabs";
import FundCarousel from "@/components/home/FundCarousel";
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
      <ComparisonPreview />
      <EducationTabs />
      <FundCarousel />
      <WhyJericho />
      <KnowledgePreview />
      <CTAStrip />
    </>
  );
};

export default Index;
