import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
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
          name: "Jericho SIF",
          description: "Compare SIF strategies, track fund performance, and invest through Jericho.",
          publisher: { "@type": "Organization", name: "Jericho Ventures" },
        }}
      />
      <HeroSection />
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
