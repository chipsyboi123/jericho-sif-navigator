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
