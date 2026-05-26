import {Hero} from "@/components/landing/hero";
import {HowItWorks} from "@/components/landing/how-it-works";
import {Features} from "@/components/landing/features";
import {InstallSection} from "@/components/landing/install-section";
import {Footer} from "@/components/landing/footer";

export default function Page() {
  return (
    <div className="w-full" style={{background: "#F0F0F2"}}>
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <InstallSection />
        <Footer />
      </main>
    </div>
  );
}
