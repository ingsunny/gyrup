"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  FileText,
  Calculator,
  AlertOctagon,
  Clock,
  Download,
  LogOut,
  CheckCircle2,
  Network,
  ArrowRight,
  Phone,
  Shield,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function RefundPolicyPage() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. HERO SHIELD ANIMATION
      gsap.from(".hero-shield", {
        scale: 0,
        rotation: -45,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      });

      // 2. TEXT REVEAL
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      });

      // 3. POLICY CARDS STAGGER
      gsap.fromTo(
        ".policy-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".policy-grid",
            start: "top 80%",
          },
        }
      );

      // 4. MATH VISUALIZATION
      gsap.from(".math-box", {
        scaleX: 0,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".math-section",
          start: "top 75%",
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const policies = [
    {
      icon: <CheckCircle2 className="text-green-500" />,
      title: "1. Eligibility Criteria",
      desc: "To qualify, you must have complied with participation requirements (attendance, 1-to-1s) for a minimum evaluation period of 3 months.",
    },
    {
      icon: <FileText className="text-blue-500" />,
      title: "2. Request Process",
      desc: "Submit an official 'Exit & Refund Request'. This will be reviewed by the Chapter Director to verify participation metrics.",
    },
    {
      icon: <Calculator className="text-purple-500" />,
      title: "3. The Calculation",
      desc: "Refunds are calculated on the remaining tenure fees on a pro-rata basis, minus a standard administrative processing charge.",
    },
    {
      icon: <AlertOctagon className="text-red-500" />,
      title: "4. Exclusions",
      desc: "Refunds are denied in cases of breach of conduct, provision of false data during application, or failed ethical verification.",
    },
    {
      icon: <Clock className="text-orange-500" />,
      title: "5. Timeline",
      desc: "Once approved, the refund amount will be processed and credited to your original payment method within 30 days.",
    },
  ];

  return (
    <main ref={mainRef} className="font-jakarta bg-gray-50 min-h-screen">
      {/* =========================================
          SECTION 1: HERO (Trust Signal)
      ========================================= */}
      <section className="relative  bg-[#0e1d34] text-white overflow-hidden">
        <Header />

        <div className="pt-32 pb-40">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          ></div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
            {/* Animated Shield Icon */}
            <div className="hero-shield mx-auto w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20 backdrop-blur-sm text-primary">
              <ShieldCheck size={48} />
            </div>

            <h1 className="hero-text text-4xl md:text-6xl font-bold mb-6">
              The GYR UP <span className="text-primary">Guarantee</span>
            </h1>

            <p className="hero-text text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We are so confident in our system that we back it up.{" "}
              <br className="hidden md:block" />
              If you actively participate and still don’t get business,{" "}
              <span className="text-white font-semibold border-b border-primary">
                we refund you.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: POLICY DETAILS (Cards)
      ========================================= */}
      <section className="py-20 relative -mt-10 z-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="policy-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((item, idx) => (
              <div
                key={idx}
                className={`policy-card bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 ${
                  idx === 3 || idx === 4 ? "md:col-span-1" : ""
                }`}
              >
                <div className="mb-5 bg-gray-50 w-14 h-14 rounded-lg flex items-center justify-center">
                  {React.cloneElement(item.icon, { size: 28 })}
                </div>
                <h3 className="text-xl font-bold text-[#0e1d34] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: CALCULATION VISUAL (The Math)
      ========================================= */}
      <section className="math-section pb-24">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="bg-[#0e1d34] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden math-box">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Calculator size={200} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="md:w-1/3">
                <h3 className="text-3xl font-bold mb-2">How it's Calculated</h3>
                <p className="text-gray-400 text-base">
                  We believe in complete transparency. Here is the formula we
                  use for all exit requests.
                </p>
              </div>

              <div className="md:w-2/3 w-full bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                    Total Fee
                  </span>
                  <span className="text-2xl font-bold text-gray-300 line-through decoration-red-500">
                    Paid
                  </span>
                </div>

                <div className="hidden md:block text-primary text-2xl font-bold">
                  →
                </div>
                <div className="md:hidden text-primary text-2xl font-bold">
                  ↓
                </div>

                <div className="flex flex-col bg-primary/20 p-4 rounded-lg border border-primary/50">
                  <span className="text-xs text-primary font-bold uppercase tracking-widest mb-1">
                    Your Refund
                  </span>
                  <div className="text-xl font-mono">
                    (<span className="text-white">Remaining Months</span> ×{" "}
                    <span className="text-white">Monthly Rate</span>)
                    <span className="text-gray-400"> - Admin Fee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: ACTION FOOTER
      ========================================= */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-[#0e1d34] mb-8">
            Documents & Actions
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            {/* Primary Action: Download */}
            <Button className="bg-primary text-black hover:bg-[#0e1d34] hover:text-white !px-8 py-8 text-lg font-bold rounded-lg transition-all duration-300 group cursor-pointer">
              <Download className="mr-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              Download Full Policy (PDF)
            </Button>

            {/* Secondary Action: Exit (Subtle) */}
            <Link href="/contact?subject=ExitRequest">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 !px-8 py-8 text-lg font-medium rounded-lg transition-all duration-300 cursor-pointer"
              >
                <LogOut className="mr-2 w-5 h-5" />
                Submit Exit Request
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-400">
            *Exit requests are subject to approval based on the eligibility
            criteria listed above.
          </p>
        </div>
      </section>

      {/* // Transparency Promise  */}

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
            <ShieldCheck className="w-5 h-5 text-secondary" />
            <span className="">Transparency Promise</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            We Stand Behind <span className="text-primary">Every</span> Member
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            If you need help understanding your eligibility or want clarity on
            the refund process, our team is here to support you with honesty and
            transparency.
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
              <span className="relative z-10 flex items-center gap-2">
                Talk to Support
                <ArrowRight size={20} />
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
            </Button>
          </div>
        </div>
      </section>

      {/* // Footer  */}
      <Footer />
    </main>
  );
}
