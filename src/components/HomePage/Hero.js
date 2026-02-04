import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    // <div
    //   className="min-h-dvh bg-top bg-[#063231]"
    //   style={{
    //     backgroundImage: "url('/hero-bg.jpg')",
    //     backgroundSize: "1800px",
    //   }}
    // >
    <div className="relative min-h-dvh bg-top bg-[#063231] overflow-hidden">
      {/* Background image becomes discoverable + priority */}
      <Image
        src="/hero-bg.jpg" // ideally convert to hero-bg.webp later
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-top object-cover -z-10"
      />

      <section className="font-jakarta mx-auto px-6 md:px-10 pt-14 md:pt-20 md:pb-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-2 items-center">
          <div className="w-full lg:w-2/3 text-center md:text-left">
            <h3 className="text-base md:text-lg lg:text-xl uppercase font-semibold text-[#c2e28fdd]">
              Business Consulting Agency
            </h3>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-white font-bold my-3">
              Inspire, Support, Empower &{" "}
              <span className="inline-block">
                Elevate yourself
                <Image
                  src="/h1-img.webp"
                  alt="Business consulting"
                  width={220}
                  height={80}
                  className="inline-block w-32 h-10 md:w-40 md:h-12 lg:w-42 lg:h-14 ml-2 md:ml-4 rounded-full reveal-img"
                />
              </span>
            </h1>

            <div className="my-6" />

            {/* Better: Link wrapper + Button styles */}
            <Link
              aria-label="membership_page"
              href="/membership"
              className="inline-block"
            >
              <Button
                className="
                  relative overflow-hidden group
                  bg-primary/90 text-black hover:text-white
                  text-base md:text-lg tracking-wide rounded-none
                  !px-6 !py-6 md:!px-7 md:!py-7 cursor-pointer
                "
              >
                <span className="relative z-10 flex items-center gap-2">
                  Apply for Membership <ArrowRight size={20} />
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
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* HERO MEDIA */}
      <section aria-labelledby="hero-media">
        <figure data-gsap="hero-container" className="relative mt-10 md:mt-18">
          <Image
            data-gsap="hero-image"
            src="/p1.webp"
            alt="Hero Bottom"
            width={865}
            height={487}
            sizes="(max-width: 768px) 465px, 90vw"
            priority={true} // Keeps the preload behavior
            fetchPriority="high" // Manually forces the attribute (try this)
            className="w-[465px] md:w-full max-h-[700px] object-cover md:absolute md:mb-0 top-10 object-center z-20 px-5 py-10 md:py-0 md:px-10"
          />

          <div className="hidden md:block md:w-[770px] lg:w-[800px] xl:w-[865px] md:h-[700px] lg:h-[750px] xl:h-[800px] bg-primary ml-auto" />
        </figure>
      </section>
    </div>
  );
}
