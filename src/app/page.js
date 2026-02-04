import FAQSection from "@/components/FAQSection";

import HomeAnimations from "@/components/HomePage/HomeAnimation";
import WhyGyrUp from "@/components/HomePage/WhyGyrUp";
import Process from "@/components/HomePage/Process";
import WhoCanJoin from "@/components/HomePage/WhoCanJoin";
import EliteNetworkCTA from "@/components/HomePage/EliteNetworkCTA";
import Hero from "@/components/HomePage/Hero";

import { usps, processSteps } from "@/data/homeData";

export default function Page() {
  return (
    <>
      {/* GSAP driver (client) */}
      <HomeAnimations />

      {/* HERO WRAP */}
      {/* <div className="min-h-dvh bg-top bg-[#063231] pt-20 md:pt-24 pb-10 md:pb-24"> */}
      <div className="min-h-dvh bg-top bg-[#063231] md:pb-20 md:pt-5">
        <Hero />
      </div>

      <WhyGyrUp usps={usps} />
      <Process processSteps={processSteps} />
      <WhoCanJoin />
      <EliteNetworkCTA />

      <FAQSection title="GYR UP International – FAQs" highlight="Home · FAQ" />
    </>
  );
}
