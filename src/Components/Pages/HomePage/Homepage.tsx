import HeroSection from "./Herosection";
import BrokerTicker from "./BrokerTicker";
import Footer from "./Footer";
import StrategyBuilderSection from "./StrategyBuilderSection";
import PositionsSection from "./PositionSection";
import WhyChooseSection from "./WhyChooseSection";
import ReviewsSection from "./ReviewSection";
import CTASection from "./CTASection";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BrokerTicker />
      <StrategyBuilderSection />
      <PositionsSection />
      <WhyChooseSection />
      <ReviewsSection />
      <CTASection />
      <Footer />
    </>
  );
}