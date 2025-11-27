"use client"; // Required for GSAP hooks

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Award,
  Ban,
  Briefcase,
  CheckCircle2,
  Clock,
  Network,
  Phone,
  ShieldCheck,
  StarIcon,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import Link from "next/link";

const Page = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const fadeRef = useRef(null);

  const uspsWrapperRef = useRef(null);

  const statsRef = useRef(null);

  const j_containerRef = useRef(null);
  const j_cardRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ======================================================
       1) PARALLAX "DISCONNECT" SCROLL EFFECT  HERO BOTTOM IMAGE
    ====================================================== */
      gsap.to(imageRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* ======================================================
       1) PARALLAX "DISCONNECT" SCROLL EFFECT  WHO CAN JOIN?
    ====================================================== */
      gsap.to(j_cardRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: j_containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* ======================================================
       2) PAGE-LOAD REVEAL (first load only)
    ====================================================== */
      gsap.from(".page-load-y", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      /* ======================================================
       3) FADE-UP ON SCROLL
    ====================================================== */
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

      /* ======================================================
       4) AVATARS → IMAGE REVEAL TIMELINE (page-load only)
    ====================================================== */
      const tl_img_reveal = gsap.timeline();

      // Avatars first
      tl_img_reveal.from(
        ".gsap-avatar",
        {
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        },
        0
      );

      // Then text/images with clip-path reveal
      gsap.utils.toArray(".reveal-img").forEach((img, i) => {
        tl_img_reveal.fromTo(
          img,
          { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          i === 0 ? "+=0.3" : "-=0.9" // smooth chaining
        );
      });

      /* ======================================================
       5) WHY GYR UP ANIMATION (runs once when visible)
    ====================================================== */
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: fadeRef.current,
            start: "top 70%",
            once: true,
          },
        })
        .from(".gsap-why", { opacity: 0, duration: 0.8 })
        .fromTo(
          ".gsap-heading",
          { x: 150, opacity: 0, scaleX: 1.4, transformOrigin: "right center" },
          { x: 0, opacity: 1, scaleX: 1, duration: 1.1 },
          "-=0.3"
        )
        .fromTo(
          ".gsap-para",
          { x: 120, opacity: 0, scaleX: 1.2, transformOrigin: "right center" },
          { x: 0, opacity: 1, scaleX: 1, duration: 1 },
          "-=0.6"
        );

      /* ======================================================
       6) USP CARDS ANIMATION (first time on scroll)
    ====================================================== */
      gsap.fromTo(
        ".gsap-usps-card",
        {
          y: 100, // Start 100px down
          opacity: 0, // Start invisible
        },
        {
          y: 0, // End at normal position
          opacity: 1, // End fully visible
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2, // 0.2s delay between each card
          scrollTrigger: {
            trigger: uspsWrapperRef.current, // Triggers when the wrapper hits viewport
            start: "top 80%", // Starts when top of wrapper is 80% down the screen
          },
        }
      );

      const statElements = gsap.utils.toArray(".stat-number");

      statElements.forEach((el) => {
        // Read the target values from the DOM attributes we set below
        const endValue = parseFloat(el.getAttribute("data-val"));
        const suffix = el.getAttribute("data-suffix");

        // This object tracks the current number state (starts at 0)
        const tracker = { val: 0 };

        gsap.to(tracker, {
          val: endValue, // Animate from 0 to 500 (or 1200, 98)
          duration: 2.5, // How long the count takes
          ease: "power2.out", // Slows down towards the end
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // Start counting when visible
          },
          onUpdate: () => {
            // On every frame, update the HTML with the current rounded number + suffix
            el.innerHTML = Math.ceil(tracker.val) + suffix;
          },
        });
      });
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
                <Link href="/membership">
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
                </Link>
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
        className=" min-h-dvh bg-top bg-cover pt-22 pb-32"
        style={{
          backgroundImage: "url('/service-bg.png')",
        }}
        ref={fadeRef}
      >
        <div className="container mx-auto text-center mb-20 gsap-fade-up font-jakarta">
          <h4 className="text-secondary text-xl font-bold uppercase tracking-widest mb-3 gsap-why">
            Why GYR UP?
          </h4>
          <h2 className="text-4xl lg:text-6xl font-bold text-[#0e1d34] mb-6 gsap-heading">
            Trusted Network
          </h2>
          <p className="text-gray-600 text-lg md:max-w-5xl xl:max-w-3xl mx-auto gsap-para">
            We are not just a networking group we are a growth-driven business
            community where credibility, ethics, and collaboration come first.
          </p>
        </div>

        <div
          ref={uspsWrapperRef}
          className="container mx-auto xl:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gsap-usps-wrapper"
        >
          {usps.map((item, index) => (
            <div
              key={index}
              className=" gsap-usps-card bg-transparent p-8 border border-[#e4e7ea] 
                 hover:shadow-lg hover:-translate-y-2 duration-300 
                 rounded-lg group"
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:bg-[#0e1d34] transition-colors">
                <div className="text-secondary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#0e1d34] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-26 bg-[#063231] text-white font-jakarta">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="lg:w-1/3 gsap-fade-up">
              <h4 className="text-secondary text-xl font-bold uppercase tracking-widest mb-4">
                How It Works
              </h4>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                The Process
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                A structured approach designed to maximize efficiency and
                generate real business results for every member.
              </p>
              <Button
                className="
    relative overflow-hidden group
    bg-primary/90 text-black
    hover:text-white
    text-lg tracking-wide rounded-none
    !px-7 !py-7 mt-2 cursor-pointer
  "
              >
                {" "}
                <Link href="/contact">
                  <span className="relative z-10 flex items-center gap-2">
                    Learn More <ArrowRight size={20} />
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

      {/* ---------------- SECTION 4: ELIGIBILITY ---------------- */}
      <section className="py-26 bg-gray-50">
        <div ref={j_containerRef} className="container mx-auto px-6 lg:px-12">
          <div
            ref={j_cardRef}
            className="bg-white p-10 lg:p-16 rounded-2xl shadow-xl flex flex-col lg:flex-row gap-12 items-center border-l-8 border-primary gsap-fade-up"
          >
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-6xl font-bold text-[#0e1d34] mb-6">
                Who Can Join?
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                We maintain high standards to ensure quality referrals.
              </p>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <TrendingUp className="text-secondary w-5 h-5" />
                  <span className="font-semibold text-[#0e1d34]">
                    Turnover:
                  </span>
                  <span className="text-gray-600">
                    ₹1 Cr+ (Trade) OR ₹20L+ (Service)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="text-secondary w-5 h-5" />
                  <span className="font-semibold text-[#0e1d34]">
                    Experience:
                  </span>
                  <span className="text-gray-600">Minimum 5 Years</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="text-secondary w-5 h-5" />
                  <span className="font-semibold text-[#0e1d34]">
                    CIBIL Score:
                  </span>
                  <span className="text-gray-600">700+ Required</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 relative text-lg">
              {/* Visual representation or Quote */}
              <div className="bg-[#0e1d34] p-8 rounded-lg text-white">
                <p className="italic text-lg mb-4">
                  "The strength of the wolf is the pack."
                </p>
                <p className="text-gray-400">
                  We verify ethical practices, strong reputation, and ensure
                  non-conflicting categories for every member.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: STATS BLOCK ---------------- */}
      <section ref={statsRef} className="bg-primary py-18">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-center gap-8">
          {[
            // 1. Updated Data Structure: Split value and suffix
            { label: "Businesses Evaluated", val: 500, suffix: "+" },
            { label: "Verified Referrals", val: 1200, suffix: "+" },
            { label: "Member Satisfaction", val: 98, suffix: "%" },
          ].map((stat, i) => (
            <div key={i} className="flex-1 gsap-fade-up">
              {/* 2. The Number Element 
                  - Added className="stat-number" for GSAP to find it
                  - Added data-val and data-suffix for GSAP to read
                  - Set initial text to "0" 
              */}
              <h2
                className="stat-number text-5xl font-bold text-[#0e1d34] mb-2"
                data-val={stat.val}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </h2>
              <p className="text-[#0e1d34] font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 6: TESTIMONIALS ---------------- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center gsap-fade-up">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center text-secondary gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon key={s} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0e1d34] leading-tight mb-8">
              “GYR UP helped me grow my business through real, verified
              referrals. The system actually works.”
            </h2>
            <div>
              <p className="font-bold text-lg text-[#0e1d34]">Rajesh Kumar</p>
              <p className="text-gray-500">CEO, TechFlow Solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* // The elite network site  */}
      <section className="relative py-28 bg-[#063231] overflow-hidden isolate">
        {/* 1. BACKGROUND TEXTURE (Grid Pattern) */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        {/* 2. GIANT OUTLINE TEXT (Depth) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 select-none">
          <h1
            className="text-[15vw] font-bold text-transparent leading-none opacity-10"
            style={{ WebkitTextStroke: "2px rgba(255,255,255, 0.1)" }}
          >
            GYR UP
          </h1>
        </div>

        {/* 3. GLOW BLOBS (Subtle Lighting) */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        {/* 4. MAIN CONTENT */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center gsap-fade-up">
          {/* Animated Badge */}

          {/* <div className="inline-flex items-center mb-6 rounded-full bg-white/5 border border-white/10 text-secondary text-lg font-bold tracking-widest uppercase backdrop-blur-md  gap-2">
            <span className="py-2 px-4">The Elite Network</span>
          </div> */}

          <div className="inline-flex items-center mb-4 rounded-full bg-white/5 border border-white/10 text-secondary text-lg font-bold tracking-widest uppercase backdrop-blur-md py-2 px-4 gap-2">
            <Network className="w-5 h-5 text-secondary" />
            <span className="">The Elite Network</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Ready to <span className="text-primary">Elevate</span> Your
            Business?
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join a community where credibility meets opportunity. Empower
            others, get verified referrals, and scale your growth.
          </p>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-6 w-full">
            {/* PRIMARY BUTTON */}
            <Button
              className="
      relative overflow-hidden group
      bg-primary/90 text-black hover:text-white
      text-xl tracking-wide rounded-none
      !px-8 !py-8
      flex items-center justify-center cursor-pointer
    "
            >
              <Link href="/membership">
                <span className="relative z-10 flex items-center gap-2">
                  Apply for Membership <ArrowRight size={20} />
                </span>

                {/* WAVY FILL */}
                <span
                  className="
        absolute inset-0 -z-0
        before:absolute before:inset-0 before:bg-secondary
        before:[clip-path:url(#wave-clip)]
        before:translate-y-full
        group-hover:before:translate-y-0
        before:transition-transform before:duration-700 before:ease-in-out
      "
                ></span>

                {/* Wave definition */}
                <svg className="hidden">
                  <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
                    <path d="M0,0.7 C0.25,0.6 0.75,0.8 1,0.7 L1,1 L0,1 Z"></path>
                  </clipPath>
                </svg>
              </Link>
            </Button>

            {/* SECONDARY BUTTON */}
            <a href="tel:+919911569713" className="group w-full md:w-auto">
              <div
                className="
        flex items-center gap-4
        !px-8 !py-[10px]
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
                  <p className="text-xl font-bold text-white">9911569713</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Page;

const usps = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Verified Referrals",
    desc: "Genuine, qualified, and conversion-focused leads only.",
  },
  {
    icon: <Ban className="w-8 h-8 " />,
    title: "Zero Pressure",
    desc: "No forced visitors, no compulsory recruitment.",
  },
  {
    icon: <Briefcase className="w-8 h-8 " />,
    title: "Transparent Fees",
    desc: "Quarterly fee structure that is simple and value-driven.",
  },
  {
    icon: <Award className="w-8 h-8 " />,
    title: "Reward Program",
    desc: "Give referrals, earn rewards and recognition.",
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 " />,
    title: "Money-Back Guarantee",
    desc: "Pro-rata refund if you don't get business. Exit anytime.",
  },
  {
    icon: <Users className="w-8 h-8 " />,
    title: "Elite Members",
    desc: "Only experienced & credible business owners qualify.",
  },
];

const processSteps = [
  "Fortnightly Meetings",
  "Verified Referrals Only",
  "One-to-One Meetings",
  "Business Presentations",
  "Participation Reporting",
  "Reward Program",
];
