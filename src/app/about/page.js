"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  HeartHandshake,
  Scale,
  Eye,
  Target,
  Zap,
  Briefcase,
  Phone,
  Repeat,
  CheckCircle,
  BadgeCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FAQSection from "@/components/FAQSection";

export default function AboutPage() {
  const mainRef = useRef(null);
  const imgContainerRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // PARALLAX IMAGE SCROLL
      gsap.to(imgContainerRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 1. HERO TEXT REVEAL
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      });

      // 2. STORY SECTION FADE UP
      gsap.fromTo(
        ".story-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".story-section",
            start: "top 80%",
          },
        },
      );

      // 3. MANIFESTO CARDS STAGGER
      gsap.fromTo(
        ".manifesto-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".manifesto-grid",
            start: "top 85%",
          },
        },
      );

      // 4. VISION & MISSION SLIDE IN
      gsap.from(".vision-box", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".vm-section", start: "top 75%" },
      });

      gsap.from(".mission-box", {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".vm-section", start: "top 75%" },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // const manifestoItems = [
  //   {
  //     icon: <ShieldCheck />,
  //     title: "Ethical Networking",
  //     desc: "Integrity is our currency. We build connections based on honest practices.",
  //   },
  //   {
  //     icon: <Briefcase />,
  //     title: "Verified Referrals",
  //     desc: "No fluff. Only qualified, vetted business opportunities passed between members.",
  //   },
  //   {
  //     icon: <HeartHandshake />,
  //     title: "Collaboration",
  //     desc: "We believe in the power of 'We' over 'Me'. Together, we go further.",
  //   },
  //   {
  //     icon: <Target />,
  //     title: "Quality Over Quantity",
  //     desc: "We prioritize the caliber of members over the number of seats filled.",
  //   },
  //   {
  //     icon: <Eye />,
  //     title: "Transparency",
  //     desc: "Open accountability in referrals, fees, and participation.",
  //   },
  //   {
  //     icon: <Zap />,
  //     title: "Givers Gain",
  //     desc: "Helping others achieve their goals is the surest way to achieve your own.",
  //   },
  // ];

  const manifestoItems = [
    {
      icon: <Repeat />,
      title: "Consistent",
      desc: "We show up regularly, participate actively, and follow the system with discipline. Consistency creates visibility, relationships, and long-term results.",
    },
    {
      icon: <CheckCircle />,
      title: "Committed",
      desc: "We don’t just promise — we complete. Commitment builds trust and strengthens every business connection.",
    },
    {
      icon: <BadgeCheck />,
      title: "Credible",
      desc: "We operate with integrity, professionalism, and ethics. Credibility is earned through consistent delivery and reliable conduct.",
    },
    {
      icon: <Users />,
      title: "Collaborative",
      desc: "We grow together by supporting each other, sharing opportunities, and building partnerships. We believe in collaboration over competition — because success multiplies when we win as a community.",
    },
  ];

  return (
    <main ref={mainRef} className="font-jakarta overflow-hidden bg-white ">
      {/* =========================================
          SECTION 1: HERO (Impactful Intro)
      ========================================= */}
      <section className="relative  bg-[#063231] text-white overflow-hidden">
        <div
          className="
      absolute inset-0 
      bg-[url('/about-page-bg.jpg')] 
      bg-cover bg-center 
      opacity-10 
      grayscale 
      pointer-events-none
    "
        />

        <div className="pt-14 md:pt-24 pb-28 md:pb-32">
          {/* Abstract Background Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2"></div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
            <p className="hero-text text-secondary font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-lg">
              About GYR UP
            </p>
            <h1 className="hero-text text-4xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
              Built for <span className="text-primary">Credibility.</span>
              <br />
              Designed for <span className="text-white">Growth.</span>
            </h1>
            <div className="hero-text w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: OUR STORY (The "Why")
      ========================================= */}
      <section className="story-section pt-24 md:pb-24 pb-20 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-0 md:gap-16">
            {/* Left: Image/Visual */}
            <div className="w-full lg:w-1/2 relative z-30">
              {/* // decorative dot */}
              <div
                className="absolute -top-10 -left-10 w-32 h-32 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(#0e1d34 2px, transparent 2px)",
                  backgroundSize: "12px 12px",
                }}
              ></div>
              <div
                ref={imgContainerRef}
                className="z-20 relative overflow-hidden rounded-none"
              >
                {/* Placeholder for About Image */}
                <div className="bg-gray-200 aspect-[4/3] flex items-center justify-center relative">
                  {/* Add your <img> tag here */}
                  <img
                    ref={imgRef}
                    src="/p3.jpg"
                    className="object-cover w-full h-full"
                  />

                  {/* Floating Badge */}
                  <div className="absolute -bottom-3 -right-3 bg-white p-6 shadow-xl rounded-lg max-w-[200px] hidden md:block border-l-4 border-primary">
                    <p className="text-4xl font-bold text-[#0e1d34]">5+</p>
                    <p className="text-sm text-gray-500 font-medium">
                      Years of Trust
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Copy */}
            <div className="w-full lg:w-1/2 story-content">
              <h2 className="text-3xl md:text-5xl font-bold text-[#0e1d34] mb-6 leading-tight">
                Networking that actually{" "}
                <span className="text-primary italic">works.</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                GYR UP began to solve a simple yet persistent problem in the
                business world — networking that leads to empty conversations
                rather than tangible business.
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                We realized that for networking to be effective, it needs a
                backbone. It combines{" "}
                <strong>verification, accountability, and structure</strong> so
                members can generate real revenue pipelines, not just exchange
                business cards.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px bg-gray-300 w-12"></div>
                <span className="text-[#0e1d34] font-bold uppercase tracking-widest text-xs md:text-sm">
                  Our Philosophy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: MANIFESTO (Grid)
      ========================================= */}
      <section className="pt-20 md:pt-24 md:pb-24 pb-20  bg-[#063231] text-white relative">
        {/* Background Texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
            <h2 className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-3">
              Our Core Values
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold">
              The GYR UP Core Values
            </h3>
          </div>

          <div className="manifesto-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {manifestoItems.map((item, idx) => (
              <div
                key={idx}
                className="manifesto-card group p-8 rounded-2xl border border-white/10 hover:border-primary/50 bg-white/5 hover:bg-white/10 transition-colors duration-500"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-[#0e1d34] transition-all duration-300">
                  {React.cloneElement(item.icon, { size: 28 })}
                </div>
                <h4 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: VISION & MISSION
      ========================================= */}
      <section className="vm-section py-20 md:py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="vision-box bg-white p-6 md:p-10 lg:p-14 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
                <Eye size={180} />
              </div>
              <span className="text-5xl md:text-6xl font-bold text-gray-200 mb-6 block">
                01
              </span>
              <h3 className="text-3xl font-bold text-[#0e1d34] mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                To build India&apos;s{" "}
                <span className="text-primary font-bold">
                  most trusted and impactful business networking ecosystem
                </span>
                , where credible, growth-oriented entrepreneurs uplift each
                other through verified referrals, powerful relationships, and
                structured business networking.
              </p>
              <div className="mt-6 space-y-3 text-gray-600 text-sm md:text-base leading-relaxed">
                <h4 className="font-semibold text-[#0e1d34] text-base md:text-lg">
                  We envision a system where:
                </h4>
                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    <span className="font-semibold">Trust</span> is the
                    foundation
                  </li>
                  <li>
                    <span className="font-semibold">Credibility</span> is the
                    qualification
                  </li>
                  <li>
                    <span className="font-semibold">Leadership</span> is the
                    culture
                  </li>
                  <li>
                    <span className="font-semibold">Collaboration</span> is the
                    engine
                  </li>
                  <li>
                    <span className="font-semibold">Growth</span> is the outcome
                  </li>
                </ul>
              </div>
              <div className="mt-6 space-y-3 text-gray-600 text-sm md:text-base leading-relaxed">
                <h4 className="font-semibold text-[#0e1d34] text-base md:text-lg">
                  We are building:
                </h4>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Chapters that inspire leadership</li>
                  <li>Regions that nurture entrepreneurship</li>
                  <li>Zones that connect business communities</li>
                  <li>A Community where every member rises together</li>
                </ul>
              </div>
              <p className="mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
                GYR UP International strives to become the most reliable
                referral platform in India, powered by entrepreneurs who believe
                in giving before receiving, growing through relationships,
                maintaining ethical business practices, contributing to
                community success, and building a long-term legacy.
              </p>
            </div>

            {/* Mission */}
            <div className="mission-box bg-[#063231] p-6 md:p-10 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden group text-white">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700 text-white">
                <Target size={180} />
              </div>
              <span className="text-5xl md:text-6xl font-bold text-white/20 mb-6 block">
                02
              </span>
              <h3 className="text-3xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                To empower entrepreneurs through{" "}
                <span className="text-primary font-bold">
                  verified referrals, credible connections, and purpose-driven
                  leadership
                </span>
                , within a trusted, structured, and transformative networking
                ecosystem where every member can grow confidently and
                sustainably.
              </p>
              <div className="mt-6 space-y-4 text-gray-200 text-sm md:text-base leading-relaxed">
                <h4 className="font-semibold text-white text-base md:text-lg">
                  We are committed to:
                </h4>
                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    Building a credible business community of entrepreneurs with
                    proven experience, stable operations, strong financial
                    discipline, and ethical reputations.
                  </li>
                  <li>
                    Delivering verified, high-quality referrals that are genuine
                    opportunities with serious prospects and meaningful business
                    potential.
                  </li>
                  <li>
                    Creating a culture of leadership and growth through chapter
                    and regional leadership paths, training, mentorship, and
                    communication mastery.
                  </li>
                  <li>
                    Enabling sustainable, long-term business success through
                    structured meetings, ongoing learning, clear accountability,
                    and collaborative support.
                  </li>
                  <li>
                    Expanding a nationwide network of connected chapters that
                    create local impact, regional growth, and national-level
                    opportunities.
                  </li>
                  <li>
                    Promoting an ethical, supportive, and collaborative
                    environment built on give-first philosophy, discipline, and
                    trust-based relationships.
                  </li>
                </ul>
              </div>
              <p className="mt-6 text-gray-300 text-sm md:text-base leading-relaxed">
                <strong>In one line:</strong> our mission is to help
                entrepreneurs grow faster, smarter, and stronger through a
                verified, credible, and leadership-driven business networking
                system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: TEAM TEASER (CTA)
      ========================================= */}

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
          <div className="inline-flex items-center mb-4 rounded-full bg-white/5 border border-white/10 text-secondary text-base md:text-lg font-bold tracking-widest uppercase backdrop-blur-md py-2 px-4 gap-2">
            <Users className="w-5 h-5 text-secondary" />
            <span className="">The Elite Network</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Meet the <span className="text-primary">Minds</span> Behind GYR UP
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Guided by experienced industry leaders committed to ethical business
            practices and community growth.
          </p>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-6 w-full">
            {/* PRIMARY BUTTON */}
            <Button
              className="
      relative overflow-hidden group
      bg-primary/90 text-black hover:text-white
      text-xl tracking-wide rounded-none
      !px-8 !py-8 md:scale-100 scale-85
      flex items-center justify-center cursor-pointer
    "
            >
              <Link href={"/team"}>
                <span className="relative z-10 flex items-center gap-2">
                  Meet the Directors <ArrowRight size={20} />
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
      </section>

      <FAQSection title="GYR UP International – FAQs" highlight="About · FAQ" />
    </main>
  );
}
