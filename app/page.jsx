import Hero from "@/components/Hero";
import { About, Partners, Services, Process, Projects, Pricing, Showreel, Testimonials, CTA, Footer } from "@/components/Sections";

export default function Page() {
  return (
    <main>
      <Hero />
      <div className="stack">
        <About />
        <Partners />
        <Services />
        <Process />
        <Projects />
        <Pricing />
        <Showreel />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
