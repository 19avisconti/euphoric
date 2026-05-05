import Nav from "../components/Nav";
import Hero from "../components/Hero";
import SocialProof from "../components/SocialProof";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import CtaStrip from "../components/CtaStrip";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Features />
        <Pricing />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
