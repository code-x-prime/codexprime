import HeroComponent from "@/components/Hero";
import ContactSection from "@/components/shared/ContactSection";
import Faq from "@/components/shared/Faq";
import Portfolio from "@/components/shared/Portfolio";
import Process from "@/components/shared/Process";
import ServicesSection from "@/components/shared/ServicesSection";
import StillConfusedSection from "@/components/shared/StillConfusedSection";
import Testimonials from "@/components/shared/Testimonials";
import WhyChooseUsSection from "@/components/shared/WhyChooseUsSection";
import { PostHogDebug } from "@/components/PostHogDebug";


export default function Home() {
  return (
    <>
      <PostHogDebug />
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
