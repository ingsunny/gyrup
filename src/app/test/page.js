"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  ShieldCheck,
  Clock,
  Award,
  Ban,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Page = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. HERO PARALLAX (Your existing code)
      gsap.to(imageRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 2. REVEAL ANIMATIONS FOR  NEW SECTIONS
      // This finds all elements with class 'gsap-fade-up' and animates them
      const items = gsap.utils.toArray(".gsap-fade-up");
      items.forEach((item) => {
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
              start: "top 85%", // Triggers when top of element hits 85% of viewport
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // --- DATA ARRAYS (For cleaner JSX) ---
  const usps = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Verified Referrals",
      desc: "Genuine, qualified, and conversion-focused leads only.",
    },
    {
      icon: <Ban className="w-8 h-8 text-primary" />,
      title: "Zero Pressure",
      desc: "No forced visitors, no compulsory recruitment.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: "Transparent Fees",
      desc: "Quarterly fee structure that is simple and value-driven.",
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Reward Program",
      desc: "Give referrals, earn rewards and recognition.",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
      title: "Money-Back Guarantee",
      desc: "Pro-rata refund if you don't get business. Exit anytime.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
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

  return (
    <main ref={mainRef} className="min-h-dvh font-jakarta overflow-hidden">
      {/* ---------------- SECTION 1: HERO (Existing) ---------------- */}
      <div
        className="bg-top relative"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "1800px", // Adjust based on your actual image aspect ratio
        }}
      >
        <Header />

        <div className="px-10 pt-32 pb-10">
          <section className="mx-auto pb-12">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left Side */}
              <div className="w-full lg:w-2/3">
                <h3 className="text-xl uppercase tracking-widest font-semibold text-[#c2e28fdd] mb-4">
                  Business Consulting Agency
                </h3>
                <h1 className="text-5xl lg:text-7xl leading-tight text-white font-bold mb-6">
                  Inspire, Support, Empower &
                  <span className="inline-flex items-end flex-wrap gap-2">
                    &nbsp;Elevate yourself
                    {/* Placeholder for small image inside text */}
                    <div className="w-32 h-12 bg-gray-300 rounded-full inline-block relative overflow-hidden top-2">
                      <img
                        src="/h1-img.jpg"
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                  </span>
                </h1>

                <Button className="bg-primary hover:bg-white hover:text-black transition-all duration-300 text-black text-lg font-semibold rounded-none px-8 py-7 mt-6 group">
                  Apply for Membership
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </Button>
              </div>

              {/* Right Side */}
              <div className="w-full lg:w-1/3 lg:pl-10">
                <div className="mb-6">
                  <div className="flex -space-x-4 mb-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-full border-2 border-white bg-gray-400 overflow-hidden"
                      >
                        <img
                          src={`/a${i}.jpg`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-lg text-white font-semibold">
                    <span className="text-2xl font-bold text-primary">
                      180M+
                    </span>{" "}
                    Active Customers
                  </p>
                </div>
                <p className="text-gray-300 text-base leading-relaxed">
                  Our mission is to empower businesses of all sizes to thrive in
                  an ever-changing marketplace. In today's dynamic business
                  environment, we provide the stability you need.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Parallax Image Section */}
        <section ref={containerRef} className="relative mt-12 mb-32 z-20">
          <img
            ref={imageRef}
            src="/p1.jpg"
            alt="Hero Bottom"
            className="w-[90%] md:w-[85%] max-h-[600px] object-cover absolute -top-10 left-1/2 -translate-x-1/2 z-20 shadow-2xl"
          />
          {/* The yellow block behind */}
          <div className="w-full lg:w-[85%] h-[500px] bg-primary ml-auto relative z-10 top-20 rounded-l-lg"></div>
        </section>
      </div>

      {/* ---------------- SECTION 2: USP / TRUSTED NETWORK ---------------- */}
      <section className="py-24 bg-white relative z-30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 gsap-fade-up">
            <h4 className="text-primary font-bold uppercase tracking-widest mb-2">
              Why GYR UP?
            </h4>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0e1d34] mb-6">
              Trusted Network
            </h2>
            <p className="text-gray-600 text-lg">
              We are not just a networking group — we are a growth-driven
              business community where credibility, ethics, and collaboration
              come first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {usps.map((item, index) => (
              <div
                key={index}
                className="gsap-fade-up bg-gray-50 p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 rounded-lg group"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:bg-[#0e1d34] transition-colors">
                  <div className="group-hover:text-white transition-colors">
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
        </div>
      </section>

      {/* ---------------- SECTION 3: THE PROCESS ---------------- */}
      <section className="py-24 bg-[#0e1d34] text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="lg:w-1/3 gsap-fade-up">
              <h4 className="text-primary font-bold uppercase tracking-widest mb-2">
                How It Works
              </h4>
              <h2 className="text-4xl font-bold mb-6">The Process</h2>
              <p className="text-gray-400 mb-8">
                A structured approach designed to maximize efficiency and
                generate real business results for every member.
              </p>
              <Button
                variant="outline"
                className="text-black border-white hover:bg-primary hover:border-primary hover:text-black"
              >
                Learn More
              </Button>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {processSteps.map((step, i) => (
                <div
                  key={i}
                  className="gsap-fade-up flex items-center gap-4 p-4 border-b border-gray-700 hover:border-primary transition-colors"
                >
                  <span className="text-4xl font-bold text-gray-700">
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
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-white p-10 lg:p-16 rounded-2xl shadow-xl flex flex-col lg:flex-row gap-12 items-center border-l-8 border-primary gsap-fade-up">
            <div className="lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0e1d34] mb-6">
                Who Can Join?
              </h2>
              <p className="text-gray-600 mb-6">
                We maintain high standards to ensure quality referrals.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <TrendingUp className="text-primary w-5 h-5" />
                  <span className="font-semibold text-[#0e1d34]">
                    Turnover:
                  </span>
                  <span className="text-gray-600">
                    ₹1 Cr+ (Trade) OR ₹20L+ (Service)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="text-primary w-5 h-5" />
                  <span className="font-semibold text-[#0e1d34]">
                    Experience:
                  </span>
                  <span className="text-gray-600">Minimum 5 Years</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="text-primary w-5 h-5" />
                  <span className="font-semibold text-[#0e1d34]">
                    CIBIL Score:
                  </span>
                  <span className="text-gray-600">700+ Required</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
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
      <section className="bg-primary py-16">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          {[
            { label: "Businesses Evaluated", val: "500+" },
            { label: "Verified Referrals", val: "1200+" },
            { label: "Member Satisfaction", val: "98%" },
          ].map((stat, i) => (
            <div key={i} className="flex-1 gsap-fade-up">
              <h2 className="text-5xl font-bold text-[#0e1d34] mb-2">
                {stat.val}
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
            <div className="mb-8 flex justify-center text-primary">
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

      {/* ---------------- SECTION 7: BOTTOM CTA ---------------- */}
      <section className="py-24 bg-[#0e1d34] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary opacity-10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10 gsap-fade-up">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Join GYR UP Today
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Empower others. Elevate yourself.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button className="bg-primary hover:bg-white hover:text-black text-black text-xl px-10 py-8 rounded-none transition-all">
              Apply Now <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <div className="text-white text-left">
              <p className="text-sm text-gray-400 uppercase tracking-widest">
                Contact Us
              </p>
              <p className="text-xl font-bold">9911569713</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Helper Icon Component
function StarIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default Page;
