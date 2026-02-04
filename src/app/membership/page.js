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
  User,
  Unlock,
  Info,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MembershipPage() {
  const mainRef = useRef(null);
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
        },
      );

      // 3. PRICING CARDS REVEAL
      gsap.from(".pricing-card", {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".pricing-section",
          start: "top 50%",
        },
      });

      // 4. SUCCESS TEXT ANIMATION
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
          "-=0.3",
        )
        .fromTo(
          ".gsap-success-subheading",
          { x: 120, opacity: 0, scaleX: 1.2, transformOrigin: "right center" },
          { x: 0, opacity: 1, scaleX: 1, duration: 1 },
          "-=0.6",
        );

      // 5. FORMULA STEPS
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
      desc: "Simple annual fee structure. No hidden costs.",
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
      title: "Reward System with Passive Income",
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
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main ref={mainRef} className="font-jakarta bg-white overflow-hidden">
      {/* =========================================
          SECTION 1: HERO
      ========================================= */}
      <section className="relative bg-[#063231] text-white">
        <div className="pt-24 md:pt-32 pb-14 md:pb-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
            <div className="inline-flex items-center border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
              <User className="w-5 h-5 text-primary inline-block mr-2" />
              <span className="text-primary text-sm md:text-lg font-bold tracking-[0.2rem] uppercase">
                Membership
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="hero-char inline-block">One</span>{" "}
              <span className="hero-char inline-block text-gray-400">
                Membership.
              </span>
              <br />
              <span className="hero-char inline-block text-primary">
                Real
              </span>{" "}
              <span className="hero-char inline-block">Outcomes.</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto hero-char opacity-0">
              Join an elite network designed for ROI. No fluff, just verified
              business growth.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: FEATURES
      ========================================= */}
      <section className="features-section pt-24 md:pb-24 pb-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-14 md:mb-16 text-center">
            <h4 className="text-secondary text-lg md:text-xl font-bold uppercase tracking-widest mb-3">
              Why Join GYR UP?
            </h4>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#0e1d34] mb-6">
              Features you are looking for
            </h2>
            <p className="text-gray-600 text-base md:text-lg xl:max-w-3xl mx-auto">
              Everything you need to grow, nothing you don't.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <div
                key={idx}
                className={`feature-card bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group ${
                  idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-secondary mb-6 group-hover:bg-[#0e1d34] group-hover:text-white transition-colors duration-300">
                  {React.cloneElement(item.icon, { size: 24 })}
                </div>
                <h3 className="text-xl font-bold text-[#0e1d34] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: PRICING (Updated)
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
              Choose Your Chapter
            </h2>
            <p className="text-gray-400 text-base md:text-lg mt-4">
              Select based on the operational status of your local chapter.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* PLAN 1: PRE-LAUNCH */}
            <div className="pricing-card bg-[#022726] border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-colors relative flex flex-col">
              <div className="absolute top-0 left-0 bg-primary/20 text-primary border-b border-r border-primary/30 text-xs font-bold px-4 py-2 rounded-br-xl rounded-tl-xl">
                EARLY BIRD OFFER
              </div>

              <div className="mt-6 mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Pre-Launch Chapter
                </h3>
                <p className="text-gray-400 text-sm">
                  Join before the official launch for maximum savings.
                </p>
              </div>

              {/* Price Block */}
              <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm line-through">
                    Annual Fee: ₹34,999
                  </span>
                  <span className="bg-primary text-black text-[10px] font-bold px-2 py-0.5 rounded">
                    SAVE ₹10,000
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-white">₹24,999</span>
                  <span className="text-gray-400 font-medium">/ year</span>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Registration Fee:</span>
                    <span className="font-bold">
                      ₹5,999{" "}
                      <span className="text-[10px] text-gray-500 font-normal">
                        (One-time)
                      </span>
                    </span>
                  </div>
                  <div className="text-right text-xs text-primary/80 italic">
                    + 18% GST applicable on all fees
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Founding Member Status",
                  "Category Exclusivity",
                  "Pre-launch Networking Events",
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="text-primary w-5 h-5 shrink-0" /> {feat}
                  </li>
                ))}
              </ul>

              <Button className="relative overflow-hidden group !bg-white text-black text-xl !px-7 !py-7 flex items-center justify-center cursor-pointer rounded-2xl">
                <Link href={"/join-gyrup?selected=pre-launch"}>
                  <span className="relative z-10 flex items-center gap-2 text-lg">
                    Select Pre-Launch <ArrowRight size={20} />
                  </span>
                  <span className="absolute inset-0 -z-0 before:absolute before:inset-0 before:bg-primary before:translate-y-full group-hover:before:translate-y-0 before:transition-transform before:duration-700 before:ease-in-out"></span>
                </Link>
              </Button>
            </div>

            {/* PLAN 2: LAUNCHED */}
            <div className="pricing-card bg-[#0b3f3f] border-2 border-primary rounded-2xl p-8 relative flex flex-col shadow-[0_0_50px_-12px_rgba(249,115,22,0.3)] transform lg:-translate-y-4">
              <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl">
                MOST POPULAR
              </div>

              <div className="mt-6 mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Launched Chapter
                </h3>
                <p className="text-primary text-sm">
                  Immediate access to an active business network.
                </p>
              </div>

              {/* Price Block */}
              <div className="bg-black/20 rounded-xl p-6 mb-8 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm line-through">
                    Annual Fee: ₹34,999
                  </span>
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    INTRO PRICE
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-white">₹29,999</span>
                  <span className="text-gray-400 font-medium">/ year</span>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>Registration Fee:</span>
                    <span className="font-bold">
                      ₹5,999{" "}
                      <span className="text-[10px] text-gray-400 font-normal">
                        (One-time)
                      </span>
                    </span>
                  </div>
                  <div className="text-right text-xs text-primary italic">
                    + 18% GST applicable on all fees
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Immediate Referrals",
                  "Active 1-to-1 Meetings",
                  "Guest & Visitor Access",
                  "Full Portal Access",
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <div className="bg-primary/20 rounded-full p-0.5">
                      <Check className="text-primary w-4 h-4 shrink-0" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <Button className="relative overflow-hidden group bg-primary text-black hover:text-white text-xl !px-7 !py-7 flex items-center justify-center cursor-pointer rounded-2xl">
                <Link href={"/join-gyrup?selected=launched"}>
                  <span className="relative z-10 flex items-center gap-2 text-lg">
                    Select Launched <ArrowRight size={20} />
                  </span>
                  <span className="absolute inset-0 -z-0 before:absolute before:inset-0 before:bg-secondary before:translate-y-full group-hover:before:translate-y-0 before:transition-transform before:duration-700 before:ease-in-out"></span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
              <ShieldCheck className="text-green-500 w-5 h-5" />
              <span className="text-gray-300 text-xs md:text-sm">
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
          SECTION 4: SUCCESS FORMULA
      ========================================= */}
      <section className="formula-section py-24 bg-white">
        <div ref={successTextRef} className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-6xl font-bold text-[#0e1d34] gsap-success-heading">
              The Success Formula
            </h2>
            <p className="text-gray-500 mt-4 text-base md:text-lg gsap-success-subheading">
              Master the perfect 45-second introduction.
            </p>
          </div>

          {/* Timeline / Process Flow */}
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-10"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-6">
              {formulaSteps.map((step, i) => (
                <div
                  key={i}
                  className="formula-step flex flex-col items-center text-center bg-white p-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#0e1d34] text-white flex items-center justify-center mb-4 shadow-lg border-4 border-white relative z-10">
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
        </div>
      </section>

      {/* CTA SECTION */}
      {/* <section className="relative py-28 bg-[#063231] overflow-hidden isolate">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center gsap-fade-up">
          <div className="inline-flex flex-col md:flex-row items-center mb-4 rounded-full bg-white/5 border border-white/10 text-secondary text-base md:text-lg font-bold tracking-widest uppercase backdrop-blur-md py-2 px-4 gap-2">
            <Unlock className="w-5 h-5 text-secondary" />
            <span>Exclusive Access For New Members</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Where Ambitious People <span className="text-primary">Grow</span>{" "}
            Together
          </h2>
          <Button
            onClick={scrollToForm}
            className="relative  overflow-hidden group bg-primary/90 text-black hover:text-white text-xl tracking-wide rounded-none !px-8 !py-8 md:scale-100 scale-85 flex items-center justify-center cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Apply for Membership <ArrowRight size={20} />
            </span>
            <span className="absolute inset-0 -z-0 before:absolute before:inset-0 before:bg-secondary before:translate-y-full group-hover:before:translate-y-0 before:transition-transform before:duration-700 before:ease-in-out"></span>
          </Button>
        </div>
      </section> */}
    </main>
  );
}
