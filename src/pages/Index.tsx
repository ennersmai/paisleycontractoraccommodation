import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import AvailabilityWidget from "@/components/AvailabilityWidget";
import GallerySection from "@/components/GallerySection";
import FeaturesStrip from "@/components/FeaturesStrip";
import AudienceSection from "@/components/AudienceSection";
import LocationSection from "@/components/LocationSection";
import PricingSection from "@/components/PricingSection";
import BookingSection from "@/components/BookingSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <HeroSection />
      <AvailabilityWidget />
      <GallerySection />
      <FeaturesStrip />
      <AudienceSection />
      <LocationSection />
      <PricingSection />
      <BookingSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default Index;
