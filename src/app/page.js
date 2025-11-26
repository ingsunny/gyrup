"use client"; // Required for GSAP hooks

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Page = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const fadeRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ===============================
       PARALLAX DISCONNECT EFFECT
    =============================== */
      gsap.to(imageRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".page-load-y", {
        y: 40, // come from a little below
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      /* ===============================
       FADE-UP ANIMATIONS
    =============================== */
      gsap.utils.toArray(".gsap-fade-up").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });

      const tl_img_reveal = gsap.timeline();

      // 1️⃣ Avatars come first
      tl_img_reveal.from(
        ".gsap-avatar",
        {
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        },
        0 // start at timeline beginning
      );

      // 2️⃣ THEN reveal images from right to left
      gsap.utils.toArray(".reveal-img").forEach((img) => {
        tl_img_reveal.fromTo(
          img,
          {
            clipPath: "inset(0% 100% 0% 0%)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "+=0.3" // waits a bit after avatars
        );
      });

      const tl_why = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: fadeRef.current, // the whole section
          start: "top 70%", // when section enters viewport
          once: true, // PLAY ONLY ONCE per page load
        },
      });

      tl_why.from(".gsap-why", {
        opacity: 0,
        duration: 0.8,
      });

      tl_why.fromTo(
        ".gsap-heading",
        {
          x: 150,
          opacity: 0,
          scaleX: 1.4,
          transformOrigin: "right center",
        },
        {
          x: 0,
          opacity: 1,
          scaleX: 1,
          duration: 1.1,
        },
        "-=0.3"
      );

      tl_why.fromTo(
        ".gsap-para",
        {
          x: 120,
          opacity: 0,
          scaleX: 1.2,
          transformOrigin: "right center",
        },
        {
          x: 0,
          opacity: 1,
          scaleX: 1,
          duration: 1,
        },
        "-=0.6"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        className="min-h-dvh bg-top bg-[#063231]"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "1800px",
        }}
      >
        <Header />

        <section className="font-jakarta mx-auto px-10 pt-24 pb-12">
          <div className="flex flex-row gap-2 items-center page-load-y">
            {/* Left Side */}
            <div className="w-2/3">
              <h3 className="text-xl uppercase text font-semibold text-[#c2e28fdd]">
                Business Consulting Agency
              </h3>
              <h1 className="text-6xl xl:text-7xl leading-20 text-white font-bold my-3 ">
                Inspire, Support, Empower &
                <span className="inline-block items-end">
                  &nbsp;Elevate yourself
                  <img
                    src="/h1-img.jpg"
                    alt="Business consulting"
                    className="inline-block w-42 h-14 ml-4 rounded-full reveal-img"
                  />
                </span>
              </h1>
              <div className="my-6"></div>

              <Button
                className="
    relative overflow-hidden group
    bg-primary/90 text-black
    hover:text-white
    text-lg tracking-wide rounded-none
    !px-7 !py-7 mt-2 cursor-pointer
  "
              >
                <span className="relative z-10 flex items-center gap-2">
                  Apply for Membership <ArrowRight size={20} />
                </span>

                {/* WAVY FILL */}
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
                ></span>

                {/* Hidden SVG wave definition */}
                <svg className="hidden">
                  <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
                    {/* <!-- ACTUAL WAVY SHAPE --> */}
                    <path d="M0,0.7 C0.25,0.6 0.75,0.8 1,0.7 L1,1 L0,1 Z"></path>
                  </clipPath>
                </svg>
              </Button>
            </div>

            {/* Right Side */}
            <div className="w-1/3 px-10">
              <div className="mb-4">
                <div className="flex gap-2 mb-4">
                  {/* 4 Avatars */}
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`/a${i}.jpg`} // Ensure these exist or use placeholders
                      alt="avatar"
                      className="w-12 h-12 rounded-full gsap-avatar"
                    />
                  ))}
                </div>
                <p className="text-lg text-white font-semibold">
                  <span className="text-2xl">180M</span> Active Customers
                </p>
              </div>
              <p className="text-white text-[15px] font-medium leading-8">
                Our mission is to empowers businesses off our all size too
                thrive in an businesses ever changing marketplaces. In today's
                dynamicis business environment
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="hero-media">
          <figure ref={containerRef} className="relative mt-18 ">
            <img
              ref={imageRef}
              src="/p1.jpg"
              alt="Hero Bottom"
              className="w-full max-h-[700px] object-cover absolute top-10 object-center z-20 px-10 page-load-y"
            />

            {/* This background box will scroll normally, creating the disconnect */}
            <div className="w-[865px] h-[810px] bg-primary ml-auto"></div>
          </figure>
        </section>
      </div>

      <section
        className="min-h-dvh bg-top py-14"
        style={{
          backgroundImage: "url('/service-bg.png')",
          backgroundSize: "1800px",
        }}
        ref={fadeRef}
      >
        <div className="text-center max-w-3xl mx-auto mb-16 gsap-fade-up">
          <h4 className="text-secondary text-xl font-bold uppercase tracking-wide mb-2 gsap-why">
            Why GYR UP?
          </h4>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0e1d34] mb-5 gsap-heading">
            Trusted Network
          </h2>
          <p className="text-gray-600 text-[15px] gsap-para">
            We are not just a networking group we are a growth-driven business
            community where credibility, ethics, and collaboration come first.
          </p>
        </div>
      </section>
    </>
  );
};

export default Page;
