import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Network, Phone } from "lucide-react";

export default function EliteNetworkCTA() {
  return (
    <section className="relative py-22 md:py-28 bg-[#063231] overflow-hidden isolate">
      <div className="absolute inset-0 opacity-[0.05]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 select-none">
        <h1
          className="text-[15vw] font-bold text-transparent leading-none opacity-10"
          style={{ WebkitTextStroke: "2px rgba(255,255,255, 0.1)" }}
        >
          GYR UP
        </h1>
      </div>

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center gsap-fade-up">
        <div className="inline-flex items-center mb-4 rounded-full bg-white/5 border border-white/10 text-secondary text-base md:text-lg font-bold tracking-widest uppercase backdrop-blur-md py-2 px-4 gap-2">
          <Network className="w-5 h-5 text-secondary" />
          <span>The Elite Network</span>
        </div>

        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Ready to <span className="text-primary">Elevate</span> Your Business?
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-12 md:max-w-2xl mx-auto leading-relaxed">
          Join a community where credibility meets opportunity. Empower others,
          get verified referrals, and scale your growth.
        </p>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-6 w-full">
          <Link
            aria-label="membership_p"
            href="/membership"
            className="inline-block"
          >
            <Button
              className="
                relative overflow-hidden group
                bg-primary/90 text-black hover:text-white
                text-xl tracking-wide rounded-none
                !px-8 !py-8 md:scale-100 scale-85
                flex items-center justify-center cursor-pointer
              "
            >
              <span className="relative z-10 flex items-center gap-2">
                Apply for Membership <ArrowRight size={20} />
              </span>

              <span
                className="
                  absolute inset-0 -z-0
                  before:absolute before:inset-0 before:bg-secondary
                  before:[clip-path:url(#wave-clip)]
                  before:translate-y-full
                  group-hover:before:translate-y-0
                  before:transition-transform before:duration-700 before:ease-in-out
                "
              />
              <svg className="hidden">
                <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
                  <path d="M0,0.7 C0.25,0.6 0.75,0.8 1,0.7 L1,1 L0,1 Z" />
                </clipPath>
              </svg>
            </Button>
          </Link>

          <a href="tel:+919873123396" className="group w-full md:w-auto">
            <div
              className="
                flex items-center gap-4
                !px-8 !py-[10px] md:scale-100 scale-85
                border border-white/10
                hover:border-primary/50 hover:bg-white/5
                transition-all duration-300 
                rounded-none bg-white/5 backdrop-blur-sm
              "
            >
              <div
                className="
                  bg-white/10 p-2 rounded-full
                  group-hover:bg-primary group-hover:text-black transition-colors
                "
              >
                <Phone className="w-4 h-4 text-white group-hover:text-black" />
              </div>

              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                  Call Us Directly
                </p>
                <p className="text-xl font-bold text-white">9873123396</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
