"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Check,
  CreditCard,
  CalendarClock,
  Crown,
  Award,
  ShieldCheck,
  ArrowRight,
  Mic,
  Users,
  Target,
  Megaphone,
  Repeat,
  CheckCircle2,
  Briefcase,
  Ban,
  User2,
  Unlock,
  UnlockIcon,
  UnlockKeyhole,
  User,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MembershipPage() {
  const mainRef = useRef(null);
  const fadeRef = useRef(null);

  const successTextRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. HERO ANIMATION
      gsap.from(".hero-char", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      // 2. FEATURES GRID STAGGER
      gsap.fromTo(
        ".feature-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".features-section",
            start: "top 80%",
          },
        }
      );

      // 3. PRICING CARDS REVEAL (Scale Up)
      gsap.from(".pricing-card", {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)", // Bouncy effect
        scrollTrigger: {
          trigger: ".pricing-section",
          start: "top 50%",
        },
      });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: successTextRef.current,
            start: "top 70%",
            once: true,
          },
        })
        .fromTo(
          ".gsap-success-heading",
          { x: 150, opacity: 0, scaleX: 1.4, transformOrigin: "right center" },
          { x: 0, opacity: 1, scaleX: 1, duration: 1.1 },
          "-=0.3"
        )
        .fromTo(
          ".gsap-success-subheading",
          { x: 120, opacity: 0, scaleX: 1.2, transformOrigin: "right center" },
          { x: 0, opacity: 1, scaleX: 1, duration: 1 },
          "-=0.6"
        );

      // 4. SUCCESS FORMULA PIPELINE
      gsap.from(".formula-step", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".formula-section",
          start: "top 70%",
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <CreditCard />,
      title: "Transparent Fees",
      desc: "Simple quarterly fee structure. No hidden costs, ever.",
    },
    {
      icon: <CalendarClock />,
      title: "Fortnightly Meetings",
      desc: "Structured evening meetings twice a month. Respects your time.",
    },
    {
      icon: <Crown />,
      title: "Category Exclusivity",
      desc: "Lock out your competition. Only one business per category.",
    },
    {
      icon: <Award />,
      title: "Reward System",
      desc: "Earn points for referrals and participation. Get recognized.",
    },
    {
      icon: <ShieldCheck />,
      title: "Refund Assurance",
      desc: "Pro-rata money-back guarantee. If it doesn't work, you don't lose.",
    },
  ];

  const formulaSteps = [
    { icon: <Users />, title: "Who You Are", desc: "Name & Business Name" },
    {
      icon: <Target />,
      title: "Problem Solved",
      desc: "What pain do you fix?",
    },
    { icon: <Users />, title: "Ideal Customer", desc: "Who do you serve?" },
    { icon: <Award />, title: "Highlight", desc: "Product/Service spotlight" },
    {
      icon: <Megaphone />,
      title: "The Ask",
      desc: "Specific referral request",
    },
    { icon: <Repeat />, title: "Recall", desc: "Memorable tagline" },
  ];

  const scrollToForm = () => {
    const el = document.getElementById("membership");
    if (!el) return;

    // If using Lenis
    if (window.lenis) {
      window.lenis.scrollTo(el, {
        offset: -50,
        duration: 1.8,
        easing: (t) => 1 - Math.pow(1 - t, 3), // smooth cubic ease
      });
    } else {
      // Native smooth scroll fallback
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main ref={mainRef} className="font-jakarta bg-white overflow-hidden">
      {/* =========================================
          SECTION 1: HERO
      ========================================= */}
      <section className="relative bg-[#063231] text-white">
        {/* Background Gradients */}
        <Header />
        <div className="pt-24 pb-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
            <div className="inline-flex items-center border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
              <User className="w-5 h-5 text-primary inline-block mr-2" />
              <span className="text-primary text-sm md:text-lg font-bold tracking-[0.2rem] uppercase">
                Membership
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="hero-char inline-block">One</span>{" "}
              <span className="hero-char inline-block text-gray-400">
                Membership.
              </span>
              <br />
              <span className="hero-char inline-block text-primary">
                Real
              </span>{" "}
              <span className="hero-char inline-block">Outcomes.</span>
              <br />
              <span className="hero-char inline-block">Clear</span>{" "}
              <span className="hero-char inline-block text-gray-400">
                Rules.
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto hero-char opacity-0">
              Join an elite network designed for ROI. No fluff, just verified
              business growth.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: MEMBERSHIP OVERVIEW
      ========================================= */}
      <section
        style={{
          backgroundImage: "url('/service-bg.png')",
        }}
        className="features-section py-24"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h4 className="text-secondary text-xl font-bold  tracking-widest mb-3 gsap-why">
              Why Join GYR UP?
            </h4>
            <h2 className="text-4xl lg:text-6xl font-bold text-[#0e1d34] mb-6 gsap-heading">
              Features you are looking for
            </h2>
            <p className="text-gray-600 text-lg md:max-w-5xl xl:max-w-3xl mx-auto">
              Everything you need to grow, nothing you don't.
            </p>
          </div>

          <div className="container mx-auto xl:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <div
                key={idx}
                className={`
        feature-card
         p-8 rounded-xl shadow-sm border border-gray-100
        hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group
        ${idx === 4 ? "md:col-span-2 lg:col-span-1" : ""}
      `}
              >
                {/* ICON BOX */}
                <div
                  className="
          w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center 
          text-secondary mb-6 
          group-hover:bg-[#0e1d34] group-hover:text-white 
          transition-colors duration-300
        "
                >
                  {React.cloneElement(item.icon, { size: 24 })}
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-[#0e1d34] mb-3">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: PRICING (Dark Mode)
      ========================================= */}
      <section
        id="membership"
        className="pricing-section py-24 bg-[#063231] relative isolate overflow-hidden"
      >
        {/* Decorative Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Choose Your Path
            </h2>
            <p className="text-gray-400 text-lg mt-4">
              Transparent quarterly investments for serious players.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* PLAN 1: CORE */}
            <div className="pricing-card bg-[#022726] border border-white/10 rounded-2xl p-10 hover:border-white/30 transition-colors relative flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Core Membership
                </h3>
                <p className="text-gray-400 text-lg">
                  Best for established SMEs & Professionals.
                </p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">₹4999</span>
                <span className="text-gray-500"> / quarter</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Access to Fortnightly Meetings",
                  "Category Exclusivity",
                  "Verified Referrals",
                  "Basic Profile Listing",
                ].map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-300 text-lg"
                  >
                    <Check className="text-primary w-5 h-5 shrink-0" /> {feat}
                  </li>
                ))}
              </ul>
              {/* <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-6 rounded-lg">
                Select Core
              </Button> */}
              <Button
                className="
                    relative overflow-hidden group
                    !bg-white text-black 
                    text-xl tracking-wide 
                    !px-7 !py-7
                    flex items-center justify-center cursor-pointer rounded-2xl
                  "
              >
                {" "}
                <Link href={"/join-gyrup?selected=core"}>
                  <span className="relative z-10 flex items-center gap-2">
                    Select Core <ArrowRight size={20} />
                  </span>

                  {/* WAVY FILL */}
                  <span
                    className="
                      absolute inset-0 -z-0
                      before:absolute before:inset-0 before:bg-primary
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
            </div>

            {/* PLAN 2: FOUNDER */}
            <div className="pricing-card bg-[#0b3f3f] border-2 border-primary rounded-2xl p-10 relative flex flex-col shadow-[0_0_50px_-12px_rgba(249,115,22,0.3)] transform lg:-translate-y-4">
              <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                MOST POPULAR
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Founder Membership
                </h3>
                <p className="text-primary text-lg">
                  Maximum visibility & priority leads.
                </p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">₹9999</span>
                <span className="text-gray-500"> / quarter</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Everything in Core",
                  "Featured Presentations",
                  "Priority Lead Distribution",
                  "Premium Directory Listing",
                  "Badge of Honor",
                ].map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-white text-lg"
                  >
                    <div className="bg-primary/20 rounded-full p-0.5">
                      <Check className="text-primary w-4 h-4 shrink-0" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
              {/* WAVY BUTTON (Inline for simplicity) */}

              <Button
                className="
                    relative overflow-hidden group
                    bg-primary text-black hover:text-white
                    text-xl tracking-wide 
                    !px-7 !py-7
                    flex items-center justify-center cursor-pointer rounded-2xl
                  "
              >
                <Link href={"/join-gyrup?selected=founder"}>
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
            </div>
          </div>

          {/* Money Back Guarantee Badge */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
              <ShieldCheck className="text-green-500 w-5 h-5" />
              <span className="text-gray-300 text-sm">
                Backed by our{" "}
                <span className="text-white font-bold">
                  Pro-Rata Money-Back Guarantee
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: SUCCESS FORMULA (Educational)
      ========================================= */}
      <section className="formula-section py-24 bg-white">
        <div ref={successTextRef} className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-[#0e1d34 ] gsap-success-heading">
              The Success Formula
            </h2>
            <p className="text-gray-500 mt-4 text-lg gsap-success-subheading">
              Master the perfect 45-second introduction.
            </p>
          </div>

          {/* Timeline / Process Flow */}
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-10"></div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {formulaSteps.map((step, i) => (
                <div
                  key={i}
                  className="formula-step flex flex-col items-center text-center bg-white p-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#0e1d34] text-white flex items-center justify-center mb-4 shadow-lg border-4 border-white relative z-10">
                    {/* Step Number Badge */}
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-black text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {i + 1}
                    </span>
                    {React.cloneElement(step.icon, { size: 24 })}
                  </div>
                  <h4 className="font-bold text-[#0e1d34] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-blue-50 p-8 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm text-blue-600">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#0e1d34]">Ready to pitch?</h4>
                <p className="text-gray-600 text-sm">
                  Join our next meeting as a visitor and see the formula in
                  action.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-100 cursor-pointer"
            >
              Book a Visit
            </Button>
          </div>
        </div>
      </section>

      {/* // cta  */}
      <section className="relative py-28 bg-[#063231] overflow-hidden isolate">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 select-none">
          <h1
            className="text-[15vw] font-bold text-transparent leading-none opacity-10"
            style={{ WebkitTextStroke: "2px rgba(255,255,255, 0.1)" }}
          >
            GYR UP
          </h1>
        </div>

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center gsap-fade-up">
          <div className="inline-flex items-center mb-4 rounded-full bg-white/5 border border-white/10 text-secondary text-lg font-bold tracking-widest uppercase backdrop-blur-md py-2 px-4 gap-2">
            <Unlock className="w-5 h-5 text-secondary" />
            <span className="">Exclusive Access For New Members</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Where Ambitious People <span className="text-primary">Grow</span>{" "}
            Together
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Gain unmatched support, structured mentorship, and a platform
            designed to elevate your business and your personal development.
          </p>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-6 w-full">
            <Button
              onClick={scrollToForm}
              className="
            relative overflow-hidden group
            bg-primary/90 text-black hover:text-white
            text-xl tracking-wide rounded-none
            !px-8 !py-8
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
              ></span>

              <svg className="hidden">
                <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
                  <path d="M0,0.7 C0.25,0.6 0.75,0.8 1,0.7 L1,1 L0,1 Z"></path>
                </clipPath>
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* // footer  */}
      <Footer />
    </main>
  );
}
