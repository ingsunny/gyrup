"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  CheckSquare,
  ArrowRight,
  ChevronDown,
  Search,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- MOCK DATA ---
const downloads = [
  {
    title: "45-Second Intro Cheat Sheet",
    type: "PDF Guide",
    size: "1.2 MB",
    desc: "Master your elevator pitch. The exact template used by our top earners to close deals in under a minute.",
    icon: <FileText />,
  },
  {
    title: "One-to-One Meeting Checklist",
    type: "PDF Checklist",
    size: "850 KB",
    desc: "Stop having coffee chats. Start having strategy sessions. A step-by-step agenda for productive 1-2-1s.",
    icon: <CheckSquare />,
  },
  {
    title: "Referral Quality Template",
    type: "PDF Template",
    size: "2.4 MB",
    desc: "Ensure every lead you pass (and receive) is qualified. Use this form to standardize your referral process.",
    icon: <Download />,
  },
];

const faqs = [
  {
    q: "Are there really no hidden fees?",
    a: "Absolutely none. Your quarterly membership fee covers venue charges, breakfast/high-tea, admin costs, and technology access. We do not charge 'initiation fees' or 'application processing fees' on top.",
  },
  {
    q: "How does the 'One Category' rule work?",
    a: "Exclusivity is key. Once a category (e.g., Residential Architect) is filled in a chapter, no other Residential Architect can join that specific chapter. This eliminates competition and locks in your referrals.",
  },
  {
    q: "What if I can't attend a meeting?",
    a: "Consistency builds trust. However, we understand emergencies. You are allowed to send a substitute (staff or colleague) to represent your business up to 3 times a quarter.",
  },
  {
    q: "Can I visit a chapter before joining?",
    a: "Yes! We encourage it. You can visit any chapter twice as a guest to experience the culture and meet the members before committing to a membership.",
  },
];

const blogs = [
  {
    category: "Networking Strategy",
    title: "Why 'Givers Gain' is a profitable business model",
    date: "Oct 24, 2023",
    image: "/blog1.jpg", // Placeholder
  },
  {
    category: "Growth Hacks",
    title: "5 Signs your Referral Partner is a Keeper",
    date: "Nov 02, 2023",
    image: "/blog2.jpg",
  },
  {
    category: "Case Study",
    title: "How one Architect generated ₹3 Cr in a recession",
    date: "Nov 15, 2023",
    image: "/blog3.jpg",
  },
];

export default function ResourcesPage() {
  const mainRef = useRef(null);

  // Simple state for FAQ Accordion
  const [openIndex, setOpenIndex] = useState(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. HERO ANIMATION
      gsap.from(".hero-content", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // 2. DOWNLOAD CARDS STAGGER

      gsap.fromTo(
        ".resource-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".downloads-grid",
            start: "top 80%",
          },
        }
      );

      // 3. BLOG FADE UP
      gsap.from(".blog-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".blog-section",
          start: "top 75%",
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="font-jakarta  min-h-screen">
      {/* =========================================
          SECTION 1: HERO
      ========================================= */}
      <section className="bg-[#0e1d34]  text-white relative overflow-hidden">
        <Header />
        <div className="pt-24 pb-40">
          {/* Abstract Book/Doc Graphic */}
          <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 opacity-5 rotate-12">
            <BookOpen size={600} />
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="hero-content max-w-5xl">
              <div className="inline-flex items-center gap-2 text-primary border border-primary/30 bg-primary/10 px-4 py-1.5 rounded-full text-lg font-bold uppercase tracking-widest mb-6">
                <Search className="w-4 h-4" /> Knowledge Hub
              </div>
              <h1 className=" text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                Tools for <span className="text-primary">Growth.</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
                Don't reinvent the wheel. Access our curated library of
                templates, guides, and insights designed to accelerate your
                networking success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: THE VAULT (Downloads)
      ========================================= */}
      <section className="py-20 bg-gray-50 relative z-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="downloads-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {downloads.map((item, i) => (
              <div
                key={i}
                className="resource-card bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                    {React.cloneElement(item.icon, { size: 28 })}
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0e1d34] mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                  {item.desc}
                </p>

                <Button
                  variant="outline"
                  className="w-full border-gray-200 hover:border-[#0e1d34] hover:bg-[#0e1d34] hover:text-white group"
                >
                  Download{" "}
                  <span className="text-xs ml-2 opacity-50">({item.size})</span>
                  <Download className="ml-auto w-4 h-4 group-hover:animate-bounce" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: BLOGS & UPDATES
      ========================================= */}
      <section className="blog-section py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0e1d34]">
                Latest Insights
              </h2>
              <p className="text-gray-500 mt-2">
                Strategies to maximize your membership.
              </p>
            </div>
            <Button variant="link" className="text-primary">
              <Link href={"/blog"} className="hidden md:flex md:items-center">
                View all posts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((post, i) => (
              <Link href="#" key={i} className="blog-card group cursor-pointer">
                <div className="aspect-[16/9] bg-gray-200 rounded-xl mb-6 overflow-hidden relative">
                  {/* Placeholder for Blog Img */}
                  <div className="absolute inset-0 bg-[#0e1d34]/10 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-[#0e1d34] rounded">
                    {post.category}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-[#0e1d34] leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-8 md:hidden">
            View all posts
          </Button>
        </div>
      </section>

      {/* =========================================
          SECTION 4: FAQ (The Truth)
      ========================================= */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex justify-center items-center w-12 h-12 bg-[#0e1d34] text-white rounded-full mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0e1d34]">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 mt-4">
              Transparent answers to your most common questions.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "border-primary shadow-lg"
                    : "border-gray-200"
                }`}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span
                    className={`font-bold text-lg ${
                      openIndex === index ? "text-[#0e1d34]" : "text-gray-700"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`p-1 rounded-full transition-transform duration-300 ${
                      openIndex === index
                        ? "rotate-180 bg-primary/10 text-primary"
                        : "text-gray-400"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <div
                  className={`px-6 text-gray-600 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-48 pb-6 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">Still have questions?</p>
            <Link href="/contact">
              <Button className="bg-[#0e1d34] text-white hover:bg-primary hover:text-black">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
