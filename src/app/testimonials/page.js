"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Quote,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Users,
  Briefcase,
  Link2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

// --- MOCK DATA ---
const testimonials = [
  {
    name: "Rohan Das",
    role: "CEO, Das Interiors",
    text: "I closed a ₹40L turnkey project within my first 3 months. The quality of referrals here is unmatched.",
    roi: "₹40 Lakhs",
  },
  // {
  //   name: "Meera Iyer",
  //   role: "Founder, TechSprout",
  //   text: "Unlike other groups, GYR UP is strictly business. No forced coffee meets, just actionable leads.",
  //   roi: "12 New Clients",
  // },
  // {
  //   name: "Amit Verma",
  //   role: "Director, Verma Logistics",
  //   text: "The verification process filters out the noise. I only meet people who are serious about growth.",
  //   roi: "3 Strategic Partners",
  // },
  // {
  //   name: "Sanya Khurana",
  //   role: "Chartered Accountant",
  //   text: "My practice grew by 30% year-on-year solely through the Founder Membership tier leads.",
  //   roi: "30% Growth",
  // },
  // {
  //   name: "Vikram Sethi",
  //   role: "Architect",
  //   text: "Found my primary construction partner here. We've done 5 projects together since.",
  //   roi: "5 Joint Ventures",
  // },
];

const caseStudies = [
  {
    id: 1,
    title: "The Manufacturing Pivot",
    client: "Apex Steel Works",
    problem:
      "Needed entry into Tier-1 Real Estate projects but lacked the high-level contacts.",
    path: [
      "Joined GYR UP",
      "Connected with Chapter Director (Architect)",
      "Intro to DLF Project Head",
    ],
    outcome: "Secured a ₹2.5 Crore annual supply contract.",
    image: "/cs1.jpg", // Placeholder
    stat: "₹2.5 Cr Deal",
  },
  {
    id: 2,
    title: "The Service Scale-Up",
    client: "BrightPixel Digital",
    problem:
      "Stuck in low-ticket retainer cycles. Needed high-value corporate clients.",
    path: [
      "Presented 45-sec pitch",
      "Member (HR Consultant) identified a need",
      "Referral to MNC HR Head",
    ],
    outcome: "Closed a yearly branding mandate worth ₹45 Lakhs.",
    image: "/cs2.jpg", // Placeholder
    stat: "₹45L Retainer",
  },
];

export default function TestimonialsPage() {
  const mainRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Manual Scroll Logic for Carousel
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. HERO ANIMATION
      gsap.from(".hero-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // 2. CASE STUDY REVEALS
      gsap.utils.toArray(".case-study-card").forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="font-jakarta bg-white min-h-screen">
      {/* =========================================
          SECTION 1: HERO
      ========================================= */}
      <section className="bg-[#0e1d34] text-white relative overflow-hidden">
        <Header />
        <div className="pt-14 md:pt-24 pb-18 md:pb-32">
          {/* Abstract Chart Graphic */}
          <div className="absolute right-0 bottom-0 opacity-10 w-[600px] h-[400px]">
            <svg
              viewBox="0 0 200 100"
              className="w-full h-full stroke-primary fill-none stroke-2"
            >
              <path d="M0 100 Q 50 50 100 80 T 200 10" />
            </svg>
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
            <div className="hero-text inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-1.5 rounded-full text-primary text-base md:text-lg font-bold uppercase tracking-widest mb-6">
              <TrendingUp className="w-4 h-4" /> Proven Results
            </div>
            <h1 className="hero-text  text-4xl md:text-7xl lg:text-8xl font-bold mb-6">
              Real Stories.
              <br />
              <span className="text-primary">Measurable ROI.</span>
            </h1>
            <p className="hero-text text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              We don't deal in vague promises. See how our members are
              generating verified revenue through ethical networking.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: TESTIMONIAL CAROUSEL
      ========================================= */}
      <section className="py-18 md:py-24 bg-gray-50 border-b border-gray-100 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0e1d34]">Member Wins</h2>
              <p className="text-gray-500 mt-2">
                Short stories of success from across our chapters.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                className="rounded-full border-gray-300 hover:border-[#0e1d34] hover:bg-[#0e1d34] hover:text-white transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                className="rounded-full border-gray-300 hover:border-[#0e1d34] hover:bg-[#0e1d34] hover:text-white transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="min-w-[350px] md:min-w-[400px] bg-white p-8 rounded-2xl shadow-sm border border-gray-100 snap-center flex flex-col relative group hover:border-primary/50 transition-colors"
              >
                <Quote className="w-10 h-10 text-primary/20 mb-4 group-hover:text-primary transition-colors" />
                <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow">
                  "{t.text}"
                </p>

                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                  <div>
                    <h4 className="font-bold text-[#0e1d34]">{t.name}</h4>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold border border-green-100">
                    {t.roi}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: DEEP DIVE CASE STUDIES
      ========================================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-[#0e1d34] mb-16 text-center">
            Featured Case Studies
          </h2>

          <div className="space-y-24">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`case-study-card flex flex-col ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-12 lg:gap-20 items-center`}
              >
                {/* VISUAL SIDE (Image or abstract graphic) */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="aspect-[4/3] bg-[#0e1d34] rounded-2xl relative overflow-hidden flex items-center justify-center group">
                    {/* Placeholder for Case Image */}
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                    <div className="text-white text-center p-8">
                      <h3 className="text-5xl font-bold text-white mb-2">
                        {study.stat}
                      </h3>
                      <p className="uppercase tracking-widest text-sm text-primary">
                        Outcome Achieved
                      </p>
                    </div>
                  </div>
                  {/* Decorative offset border */}
                  <div
                    className={`absolute top-6 ${
                      index % 2 === 1 ? "left-6" : "right-6"
                    } w-full h-full border-2 border-[#0e1d34] rounded-2xl -z-10`}
                  ></div>
                </div>

                {/* CONTENT SIDE */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#0e1d34] text-white text-xs font-bold px-3 py-1 rounded uppercase">
                      {study.client}
                    </span>
                    <span className="text-gray-400 text-sm">|</span>
                    <span className="text-gray-500 text-sm font-medium">
                      {study.title}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-[#0e1d34] mb-8">
                    From <span className="text-red-500">Struggle</span> to{" "}
                    <span className="text-green-600">Scale</span>.
                  </h3>

                  <div className="space-y-8">
                    {/* 1. Problem */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>{" "}
                        The Problem
                      </h4>
                      <p className="text-gray-700 text-lg">{study.problem}</p>
                    </div>

                    {/* 2. Referral Path (Visualized) */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                        The Referral Path
                      </h4>
                      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between text-sm">
                          {study.path.map((step, i) => (
                            <React.Fragment key={i}>
                              <div className="text-center md:text-left font-medium text-[#0e1d34]">
                                {step}
                              </div>
                              {i < study.path.length - 1 && (
                                <div className="hidden md:block text-gray-300">
                                  <Link2 className="w-4 h-4" />
                                </div>
                              )}
                              {/* Mobile Arrow */}
                              {i < study.path.length - 1 && (
                                <div className="md:hidden text-gray-300">↓</div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 3. Outcome */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                        The Outcome
                      </h4>
                      <p className="text-[#0e1d34] text-xl font-bold flex items-center gap-2">
                        <CheckCircle2 className="text-green-500 w-6 h-6" />{" "}
                        {study.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: CTA
      ========================================= */}
      <section className="bg-primary py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0e1d34] mb-6">
            Ready to write your success story?
          </h2>
          <Button className="bg-[#0e1d34] text-white hover:bg-white hover:text-black text-lg px-10 py-6 rounded-none font-bold transition-all">
            <Link href="/join-gyrup">Join the Network</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
