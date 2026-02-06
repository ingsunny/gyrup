"use client";

import React, { useLayoutEffect, useRef } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Linkedin,
  Mail,
  User,
  BrainCircuit,
  Rocket,
  Scale,
  CheckCircle2,
  Quote,
  Briefcase,
  Compass,
} from "lucide-react";
import gsap from "gsap";

// --- DATA ---
const teamMembers = [
  {
    id: "pradeep",
    name: "Pradeep Goyal",
    title:
      "Visionary Founder – GYR UP International | Chief Strategist & Head of Operations",
    icon: <Compass className="w-5 h-5 text-slate-700" />,
    image: "/founders/Pradeep1.png",
    intro:
      "Ecosystem architect and operations strategist with deep expertise in dealership networks, performance systems, and governance-led execution.",
    bio: `Pradeep Goyal is the Visionary Founder, Chief Strategist, and Head of Operations at GYR UP International, widely regarded as the architect behind the GYR UP ecosystem—its structure, systems, and execution model.

  With over 16 years of extensive experience in the automobile dealership network ecosystem, Pradeep has worked closely with the dealership networks of Maruti Suzuki, Toyota, and Mahindra & Mahindra. His expertise spans sales leadership, dealer operations, team performance, network structuring, and process discipline. In his last corporate role as Group Sales Head within the Mahindra & Mahindra dealership network, he led large teams while implementing performance-driven operating systems.

  As the Founder of SPG Group of Companies, Pradeep has built multiple ventures using a strategist’s mindset rooted in systems, governance, and sustainable execution rather than short-term wins.

  At GYR UP International, he leads vision and ecosystem design, strategic system architecture, operations and SOP frameworks, leadership structures across chapters and regions, and ensures ethics, discipline, and process compliance across the network.

  Pradeep believes strong ecosystems are built not by motivation alone, but by clarity, systems, and consistent execution. By blending dealership-network discipline with entrepreneurial insight, he is shaping GYR UP International into a credible, structured, and high-impact business networking platform for serious entrepreneurs.`,
    highlights: [
      "Ecosystem & System Architecture",
      "Dealer Network Operations",
      "Sales Leadership & Team Performance",
      "SOPs, Governance & Compliance",
      "Strategic Execution Frameworks",
    ],
    quote:
      "Strong ecosystems are built on clarity, systems, and consistent execution.",
    social: {
      linkedin: "#",
      email: "#",
    },
  },

  {
    id: "aditya",
    name: "Aditya Aggarwal",
    title: "Founder – GYR UP International | Global Digital Growth Leader",
    icon: <Rocket className="w-5 h-5 text-slate-700" />,
    image: "/founders/Aditya1.png",
    intro:
      "Technology-first entrepreneur specializing in data-led growth, scalable performance systems, and ROI-driven digital expansion across global markets.",
    bio: `Aditya Aggarwal is a global digital growth leader and technology-first entrepreneur with over 12 years of experience scaling performance-driven businesses across international markets.

  He is the Founder of Appmontize Media, a high-growth digital marketing company operating across the United States, India, Singapore, Indonesia, and the UAE, with ₹100 crore+ in cumulative revenue. His expertise centers on data-led growth, scalable performance systems, and ROI-focused digital execution.

  An Electrical Engineering graduate, Aditya previously worked with Affle India, where he developed strong capabilities in large-scale performance marketing, user acquisition, and analytics-driven growth strategies.

  As a Founder of GYR UP International, Aditya brings a technology, automation, and growth-systems mindset, contributing to the creation of digital platforms, referral tracking systems, performance dashboards, and scalable growth frameworks designed to help members grow faster and more efficiently.`,
    highlights: [
      "Data-Led Growth Systems",
      "Digital Platforms & Automation",
      "Referral Tracking Systems",
      "Performance Dashboards",
      "ROI-Focused Digital Execution",
    ],
    quote: "Build systems. Drive growth. Multiply value.",
    social: {
      linkedin: "https://www.linkedin.com/in/aditya-agarwal-b66a5750/",
      email: "aditya@appmontize.co.in",
    },
  },

  {
    id: "dimple",
    name: "Dimple Singhi W/O CA Bikash Singhi",
    title:
      "Founder – GYR UP International | Finance & Business Strategy Leader",
    icon: <Briefcase className="w-5 h-5 text-slate-700" />,
    image: "/founders/Dimple.png",
    intro:
      "Entrepreneurial leader with deep expertise in banking, finance, business structuring, and diversified trade. Driving sustainable growth through governance-led strategy.",
    bio: `Dimple Singhi is a seasoned entrepreneur with extensive experience across banking, finance, business structuring, and diversified trade industries. With professional exposure since 2009, she brings strong strategic insight, financial discipline, and a growth-focused advisory approach to every venture she leads.

  She serves as Director of Singhi Professional Services Pvt. Ltd. and DJH Tradex Pvt. Ltd., where she is recognized for driving profitability, long-term value creation, and structured risk management. Her work emphasizes building stable financial foundations while enabling scalable business expansion.

  As the Founder of GYR UP International, Dimple leads with a “growth with governance” philosophy—establishing a trusted ecosystem built on credible systems, transparency, and sustainable business practices. Her leadership empowers entrepreneurs to scale responsibly while strengthening revenue, reputation, and long-term trust.`,
    highlights: [
      "Financial Strategy & Governance",
      "Business Structuring",
      "Risk Management Frameworks",
      "Sustainable Growth Advisory",
      "Profitability Optimization",
    ],
    quote:
      "Growth is strongest when built on governance, trust, and discipline.",
    social: {
      linkedin: "#",
      email: "#",
    },
  },

  // {
  //   id: "bikash",
  //   name: "Bikash Singhi",
  //   title: "Advisor to Board",
  //   icon: <Scale className="w-5 h-5 text-green-500" />,
  //   image: "/founders/bikash.png",
  //   intro:
  //     "Highly respected CA with 25+ years in finance & law. Enabling scalable, compliant, and sustainable business growth through governance.",
  //   bio: `Bikash Singhi is a highly respected Chartered Accountant with over 25 years of professional experience spanning banking, finance, corporate law, taxation, compliance, and business structuring. A member of the ICAI since 2000, he is known for enabling scalable, compliant, and sustainable business growth.

  //   He is the Founder Partner of Singhi Bikash & Associates and serves on the Advisory Board of Singhi Professional Services Pvt. Ltd. A qualified LL.B and Insolvency Professional, Bikash also holds advanced ICAI certifications in Forensic Audit, Concurrent Audit, BRSR, and PMLA. As an Advisor to Board of GYR UP International, Bikash brings a growth-with-governance philosophy, ensuring the ecosystem enables members to expand through credible structures.`,
  //   highlights: [
  //     "Corporate Law & Taxation",
  //     "Business Structuring for Expansion",
  //     "Risk Management & Compliance",
  //     "Forensic Audit & Financial Discipline",
  //     "Growth-with-Governance Strategy",
  //   ],
  //   quote: "Credible structures. Compliant growth. Long-term value.",
  //   social: { linkedin: "#", email: "bikash@gyrup.com" },
  // },
];

export default function TeamPage() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade up for hero text
      gsap.from(".hero-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="font-jakarta bg-gray-50 min-h-screen">
      {/* =========================================
          SECTION 1: HERO (Preserved Style)
      ========================================= */}
      <section
        ref={heroRef}
        className="bg-[#0e1d34] text-white relative overflow-hidden pb-18"
      >
        <div className="pt-20 pb-24 relative z-10 container mx-auto px-6 lg:px-12 text-center">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="hero-anim inline-flex items-center border border-white/10 bg-white/5 rounded-full px-5 py-2 mb-6 backdrop-blur-md">
            <User className="w-5 h-5 text-primary inline-block mr-2" />
            <span className="text-primary text-sm font-bold tracking-[0.2rem] uppercase">
              Core Leadership
            </span>
          </div>

          <h1 className="hero-anim text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Meet The Visionaries
          </h1>

          <p className="hero-anim text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Driving the GYR UP ecosystem with strategy, technology, and
            governance.
          </p>
        </div>

        {/* Gradient Fade at bottom */}
      </section>

      {/* =========================================
          SECTION 2: INTERACTIVE ACCORDION LIST
      ========================================= */}
      <section className="-mt-20 relative z-30 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 ">
          <Accordion.Root
            type="single"
            collapsible
            className="space-y-4 lg:scale-105"
          >
            {teamMembers.map((m) => (
              <Accordion.Item
                key={m.id}
                value={m.id}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-lg transition-all duration-300 data-[state=open]:ring-2 data-[state=open]:ring-primary/20 "
              >
                {/* HEADER TRIGGER */}
                <Accordion.Header>
                  <Accordion.Trigger className="group w-full text-left p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-2 sm:gap-6 hover:bg-gray-50 transition-colors cursor-pointer outline-none">
                    {/* 1. Circular Avatar */}
                    <div className="relative w-28 h-28 lg:w-32 lg:h-32 shrink-0 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-200 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                      {m.image ? (
                        <Image
                          src={m.image}
                          alt={m.name}
                          fill
                          priority
                          className="object-cover object-top"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="text-xl md:text-3xl font-bold text-[#0e1d34] select-none"
                        >
                          {m.name ? m.name.charAt(0).toUpperCase() : "?"}
                        </span>
                      )}
                    </div>

                    {/* 2. Middle Content (Name, Title, Intro) */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-[#0e1d34] flex items-center gap-2">
                            {m.name}
                          </h3>
                          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                            {m.title}
                          </p>
                        </div>
                      </div>

                      {/* Short Intro (Visible in Collapsed) */}
                      <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-2 leading-relaxed">
                        {m.intro}
                      </p>
                    </div>

                    {/* 3. Right Side: Socials & Chevron */}
                    <div className="flex items-center gap-3 shrink-0 mt-2 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                      <div
                        className="flex gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link href={m.social.linkedin} target="_blank">
                          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#0077b5] hover:text-white transition-colors cursor-pointer">
                            <Linkedin className="w-4 h-4" />
                          </div>
                        </Link>
                        <Link href={`mailto:${m.social.email}`}>
                          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                            <Mail className="w-4 h-4" />
                          </div>
                        </Link>
                      </div>

                      {/* Chevron Indicator */}
                      <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-data-[state=open]:bg-[#0e1d34] group-data-[state=open]:text-white transition-all">
                        <ChevronDown className="w-5 h-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </div>
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>

                {/* EXPANDED CONTENT */}
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up bg-gray-50/50">
                  <div className="px-6 md:px-8 pb-8 pt-4">
                    <div className="h-px w-full bg-gray-200 mb-6"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Bio Column */}
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                            About The Leader
                          </h4>
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                            {m.bio}
                          </p>
                        </div>

                        {/* Quote Box */}
                        <div className="bg-white border-l-4 border-primary p-5 rounded-r-lg shadow-sm">
                          <Quote className="w-6 h-6 text-gray-300 mb-2" />
                          <p className="text-[#0e1d34] font-medium italic">
                            "{m.quote}"
                          </p>
                        </div>
                      </div>

                      {/* Details Column */}
                      <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                            Key Areas of Focus
                          </h4>
                          <ul className="space-y-3">
                            {m.highlights.map((h, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm text-gray-700 font-medium"
                              >
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>
    </div>
  );
}
