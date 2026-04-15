import HeroComponent from "@/components/Hero";
import ContactSection from "@/components/shared/ContactSection";
import Faq from "@/components/shared/Faq";
import Portfolio from "@/components/shared/Portfolio";
import Process from "@/components/shared/Process";
import ServicesSection from "@/components/shared/ServicesSection";
import StillConfusedSection from "@/components/shared/StillConfusedSection";
import Testimonials from "@/components/shared/Testimonials";
import WhyChooseUsSection from "@/components/shared/WhyChooseUsSection";


export default function Home() {
  return (
    <>

      <HeroComponent />
      <ServicesSection />
      <WhyChooseUsSection />
      <Process />
      <Testimonials />
      <Portfolio limit={3} />
      <Faq limit={4} />
      <ContactSection />
      <StillConfusedSection />
    </>
  );
}
