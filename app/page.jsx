import Hero from "@/components/Hero";
import SocialRail from "@/components/SocialRail";
import { About, Partners, Services, Process, Projects, Websites, Pricing, Showreel, Testimonials, CTA, Footer } from "@/components/Sections";

export default function Page() {
  return (
    <main>
      <Hero />
      <SocialRail />
      <div className="stack">
        <About />
        <Partners />
        <Services />
        <Process />
        <Projects />
        <Websites />
        <Pricing />
        <Showreel />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
