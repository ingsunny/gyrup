import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Process({ processSteps }) {
  return (
    <section className="py-26 bg-[#063231] text-white font-jakarta">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="lg:w-1/3 gsap-fade-up">
            <h4 className="text-secondary text-xl font-bold uppercase tracking-widest mb-4">
              How It Works
            </h4>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">The Process</h2>
            <p className="text-gray-400 text-lg mb-8">
              A structured approach designed to maximize efficiency and generate
              real business results for every member.
            </p>

            <Button
              asChild
              className="
    relative overflow-hidden group
    bg-primary/90 text-black hover:text-white
    text-lg tracking-wide rounded-none
    !px-7 !py-7 mt-2 cursor-pointer
    min-h-[44px] min-w-[44px]
  "
            >
              <Link href="/contact" aria-label="Contact page: Learn more">
                <span className="relative z-10 flex items-center gap-2">
                  Learn More <ArrowRight size={20} />
                </span>

                <span
                  className="
        absolute inset-0 -z-0
        before:absolute before:inset-0
        before:bg-secondary
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
              </Link>
            </Button>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="gsap-fade-up flex items-center gap-4 p-4 border-b border-gray-700 hover:border-primary transition-colors"
              >
                <span className="text-4xl font-bold text-[#1b5b5bd8]">
                  0{i + 1}
                </span>
                <span className="text-lg font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
