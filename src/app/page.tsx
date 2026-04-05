import HeroComponent from "@/components/Hero";
import ContactSection from "@/components/shared/ContactSection";
import Faq from "@/components/shared/Faq";
import Marquee from "@/components/shared/Marquee";
import Portfolio from "@/components/shared/Portfolio";
import Process from "@/components/shared/Process";
import ServicesSection from "@/components/shared/ServicesSection";
import StillConfusedSection from "@/components/shared/StillConfusedSection";
import TechStack from "@/components/shared/TechStack";
import Testimonials from "@/components/shared/Testimonials";
import WhyChooseUsSection from "@/components/shared/WhyChooseUsSection";

export default function Home() {
  return (
    <>
      <HeroComponent />
      <Marquee />
      <ServicesSection />
      <WhyChooseUsSection />
      <TechStack />
      <Process />
      <Portfolio limit={3} />
      <Testimonials />
      <Faq limit={6} />
      <ContactSection />
      <StillConfusedSection />
    </>
  );
}
