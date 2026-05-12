import {Starfield} from "@/components/landing/starfield";
import {Hero} from "@/components/landing/hero";
import {Features} from "@/components/landing/features";
import {Footer} from "@/components/landing/footer";

export default function Page() {
  return (
    <>
      <Starfield />
      <main>
        <Hero />
        <Features />
        <Footer />
      </main>
    </>
  );
}
