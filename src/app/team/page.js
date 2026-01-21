"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import {
  Linkedin,
  Mail,
  BrainCircuit,
  CheckCircle2,
  Quote,
  User,
  Globe,
  Building2,
  Scale,
  Cpu,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- DATA ---
const teamMembers = [
  {
    id: 1,
    name: "Pradeep Goyal",
    title: "Visionary Founder | Chief Strategist | Head of Operations",
    image: "founders/pradeep.PNG",
    role_highlight: "The Ecosystem Architect",
    icon: <BrainCircuit className="w-4 h-4" />,
    bio: `Pradeep is widely regarded as the architect of the GYR UP ecosystem—its structure, systems, and execution model. With over 16 years of extensive experience in the automobile dealership network (Maruti Suzuki, Toyota, Mahindra & Mahindra), his expertise lies in sales leadership, dealer operations, and process discipline. As the Founder of SPG Group of Companies, he builds ventures with a strategist’s mindset—focused on governance and sustainable execution rather than short-term wins. By blending dealership-network discipline with entrepreneurial insight, he is shaping GYR UP International into a credible, structured, and high-impact business networking platform.`,
    highlights: [
      "Vision & Ecosystem Design",
      "Strategic Thinking & System Architecture",
      "Operations, SOPs & Governance",
      "Ethics, Discipline & Process Compliance",
      "Chapter, Region & Leadership Frameworks",
    ],
    philosophy:
      "A strong ecosystem is not built by motivation alone, but by clarity, systems, and consistent execution.",
    social: { linkedin: "#", email: "pradeep@gyrup.com" },
  },
  // {
  //   id: 2,
  //   name: "Aditya Aggarwal",
  //   title: "Founder – GYR UP International | Global Digital Growth Leader",
  //   image: "founders/aditya.png", // Ensure you have this image
  //   role_highlight: "Technology & Growth Engines",
  //   icon: <Cpu className="w-4 h-4" />,
  //   bio: `Aditya Aggarwal is a global digital growth leader and technology-first entrepreneur with 12+ years of experience scaling performance-driven businesses across international markets. He is the Founder of Appmontize Media, a high-growth digital marketing company operating across the United States, India, Singapore, Indonesia, and the UAE, with ₹100 crore+ in cumulative revenue. An Electrical Engineering graduate, Aditya previously worked with Affle India, building deep capabilities in large-scale performance marketing, user acquisition, and analytics-driven growth strategies. As a Founder of GYR UP International, he brings a technology, automation, and growth-systems mindset, creating digital platforms, referral tracking systems, and performance dashboards and scalable growth frameworks for members.`,
  //   highlights: [
  //     "Data-Led Growth & Scalable Systems",
  //     "ROI-Focused Digital Execution",
  //     "Performance Dashboards & Automation",
  //     "Global Market Expansion Strategy",
  //   ],
  //   philosophy: "Build systems. Drive growth. Multiply value.",
  //   social: {
  //     linkedin: "https://www.linkedin.com/in/aditya-agarwal-b66a5750/",
  //     email: "aditya@appmontize.co.in",
  //   },
  // },
  {
    id: 3,
    name: "Bikash Singhi",
    title: "Advisor to Board | Chartered Accountant & Strategist",
    image: "founders/Bikash.jpg", // Ensure you have this image
    role_highlight: "Governance & Financial Discipline",
    icon: <Scale className="w-4 h-4" />,
    bio: `Bikash Singhi is a highly respected Chartered Accountant with over 25 years of experience across banking, finance, corporate law, taxation, compliance, and business structuring. A member of the Institute of Chartered Accountants of India since 2000, he combines strong regulatory expertise with a growth-driven advisory approach to enable scalable and sustainable businesses. He is the Founder Partner of Singhi Bikash & Associates and an Advisory Board member at Singhi Professional Services Pvt. Ltd., where he supports entrepreneurs and enterprises in building profitable, compliant, and resilient business structures. A qualified LL.B and Insolvency Professional with advanced ICAI certifications in Forensic Audit, Concurrent Audit, BRSR, and PMLA, he integrates governance with growth. As Advisor to the Board of GYR UP International, he promotes a growth-with-governance philosophy, helping members strengthen revenue, credibility, and long-term trust.`,
    highlights: [
      "Corporate Law & Business Structuring",
      "Forensic Audit & Risk Management",
      "Regulatory Compliance & Taxation",
      "Sustainable Business Expansion",
    ],
    philosophy: "Credible structures. Compliant growth. Long-term value.",
    social: { linkedin: "#", email: "bikash@gyrup.com" },
  },
];

export default function TeamPage() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero
      gsap.from(".hero-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Rows
      teamMembers.forEach((_, i) => {
        const row = `.founder-row-${i}`;
        const img = `.founder-img-${i}`;
        const txt = `.founder-txt-${i}`;

        // Image Slide
        gsap.from(img, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: { trigger: row, start: "top 75%" },
        });

        // Text Fade Up
        gsap.from(txt, {
          y: 40,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          scrollTrigger: { trigger: row, start: "top 75%" },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="font-jakarta bg-white text-[#0e1d34]">
      {/* =========================================
          SECTION 1: HERO (UNCHANGED)
      ========================================= */}
      <section className="bg-[#0e1d34] text-white relative overflow-hidden">
        <Header />
        <div className="pt-18 pb-20 relative z-10">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="container mx-auto px-6 lg:px-12 text-center">
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
        </div>
      </section>

      {/* =========================================
          SECTION 2: FOUNDERS (ZIG ZAG LAYOUT)
      ========================================= */}
      <div className="flex flex-col pb-20 lg:pb-28">
        {teamMembers.map((member, index) => (
          <section
            key={member.id}
            className={`founder-row-${index} pt-18 md:pt-20 relative `}
          >
            <div className=" max-w-[2000px] mx-auto px-6 lg:px-12">
              <div
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* --- IMAGE COLUMN --- */}
                <div className={`founder-img-${index} w-full lg:w-5/12`}>
                  <div className="relative group mx-auto max-w-md lg:max-w-none">
                    {/* Abstract Background Decoration */}
                    <div
                      className={`absolute top-6 ${index % 2 === 0 ? "-left-6" : "-right-6"} w-3/4 h-3/4 bg-gray-50 -z-10 rounded-3xl`}
                    ></div>
                    <div
                      className={`absolute -bottom-4 ${index % 2 === 0 ? "-right-4" : "-left-4"} w-24 h-24 bg-primary/5 rounded-full -z-10 blur-xl`}
                    ></div>

                    {/* Image Frame */}
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
                      {/* Use <img> tag here */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                      />

                      {/* Floating Name Overlay (Mobile Only) */}
                      <div className="lg:hidden absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                        <h3 className="text-white text-2xl font-bold">
                          {member.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- TEXT COLUMN --- */}
                <div className={`founder-txt-${index} w-full lg:w-7/12`}>
                  {/* Role Tag */}
                  <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-4">
                    {member.icon}
                    <span>{member.role_highlight}</span>
                  </div>

                  {/* Name & Title */}
                  <h2 className="text-4xl md:text-5xl font-bold text-[#0e1d34] mb-3 leading-tight hidden lg:block">
                    {member.name}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-500 font-medium mb-8">
                    {member.title}
                  </p>

                  {/* Bio */}
                  <div className="text-gray-600 mb-10 leading-relaxed text-lg space-y-4">
                    {/* We can split the bio if it has newlines, or just render it */}
                    <p>{member.bio}</p>
                  </div>

                  {/* Quote / Philosophy */}
                  <div className="mb-10 pl-6 border-l-4 border-primary/30 py-1">
                    <p className="text-xl md:text-2xl font-serif italic text-[#0e1d34] leading-relaxed">
                      "{member.philosophy}"
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                    <h4 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-wider">
                      Key Areas of Impact
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                      {member.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm font-semibold text-[#0e1d34]">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Actions */}
                  <div className="flex gap-6 mt-8">
                    <Link
                      href={member.social.linkedin}
                      className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#0077b5] transition-colors"
                    >
                      <Linkedin className="w-5 h-5" /> LinkedIn Profile
                    </Link>
                    <Link
                      href={`mailto:${member.social.email}`}
                      className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors"
                    >
                      <Mail className="w-5 h-5" /> Email Contact
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </main>
  );
}
