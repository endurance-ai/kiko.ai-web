import {Header} from "@/components/landing/header";
import {Hero} from "@/components/landing/hero";
import {HowItWorks} from "@/components/landing/how-it-works";
import {Features} from "@/components/landing/features";
import {Pricing} from "@/components/landing/pricing";
import {InstallSection} from "@/components/landing/install-section";
import {Footer} from "@/components/landing/footer";

export default function Page() {
  return (
    <div className="w-full" style={{background: "#F0F0F2"}}>
      <Header />
      <main className="pt-[54px] sm:pt-14">
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <InstallSection />
        <Footer />
      </main>
    </div>
  );
}
