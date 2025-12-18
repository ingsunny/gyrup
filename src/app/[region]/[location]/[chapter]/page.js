"use client";

import React, { use, useLayoutEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Award,
  Users,
  MapPin,
  ArrowRight,
  CalendarCheck,
  Handshake,
  Clock,
  Target,
  Zap,
  UserPlus,
  TrendingUp,
  Star,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

// --- CONFIGURATION ---
const recognitionCategories = [
  {
    key: "attendance",
    label: "Attendance Awards (100%)",
    awardName: "Excellence in Consistency",
    icon: <CalendarCheck />,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    key: "referrals",
    label: "Referral Giver Awards",
    awardName: "Community Giver of the Month",
    icon: <Handshake />,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    key: "followups",
    label: "Follow-Up Awards",
    awardName: "Excellence in Timely Response",
    icon: <Clock />,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    key: "conversions",
    label: "Referral Conversion",
    awardName: "Conversion Champion",
    icon: <Target />,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    key: "development",
    label: "Skill Enhancement",
    awardName: "Growth Catalyst",
    icon: <Zap />,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    key: "member-addition",
    label: "Member Addition",
    awardName: "Community Builder",
    icon: <UserPlus />,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    key: "business-achiever",
    label: "Business Achiever (₹1Cr+)",
    awardName: "Business Titan Award",
    icon: <TrendingUp />,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const baseContributors = [
  {
    id: 1,
    name: "Rohan Malik",
    role: "Referral Champion",
    business: "Malik & Co. Consulting",
    awardKey: "referrals",
    image: "/a1.jpg",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Consistency Leader",
    business: "Priya Wellness Studio",
    awardKey: "attendance",
    image: "/a2.jpg",
  },
  {
    id: 3,
    name: "Aditya Verma",
    role: "Follow-Up Pro",
    business: "Verma Digital Solutions",
    awardKey: "followups",
    image: "/a3.jpg",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "Conversion Specialist",
    business: "Kapoor Legal Associates",
    awardKey: "conversions",
    image: "/a4.jpg",
  },
  {
    id: 5,
    name: "Harsh Gupta",
    role: "Growth Seeker",
    business: "Harsh FinServe",
    awardKey: "development",
    image: "/a1.jpg",
  },
  {
    id: 6,
    name: "Megha Jain",
    role: "Community Builder",
    business: "Megha Creatives",
    awardKey: "member-addition",
    image: "/a2.jpg",
  },
  {
    id: 7,
    name: "Kartik Bansal",
    role: "Business Achiever",
    business: "Bansal Manufacturing",
    awardKey: "business-achiever",
    image: "/a3.jpg",
  },
];

const chapterProfiles = {
  "N1/Rohtak/Heroes": {
    displayName: "Rohtak Heroes",
    tagline: "Where consistent action compounding into trust and business.",
  },
};

export default function ChapterDetailPage({ params }) {
  const mainRef = useRef(null);

  const { region, location, chapter } = use(params);

  // Decoding Params
  const regionCode = decodeURIComponent(region);
  const locationName = decodeURIComponent(location);
  const chapterSlug = decodeURIComponent(chapter);
  const chapterName = chapterSlug.replace(/-/g, " ");
  const key = `${regionCode}/${locationName}/${chapterSlug}`;

  const profile = chapterProfiles[key] || {
    displayName: chapterName,
    tagline:
      "Local leaders. Real business. Human connections that go beyond transactions.",
  };

  // Merge Data
  const contributors = baseContributors.map((c) => {
    const category = recognitionCategories.find(
      (cat) => cat.key === c.awardKey
    );
    return {
      ...c,
      categoryLabel: category?.label ?? "Recognition",
      awardName: category?.awardName ?? "Contributor Award",
      icon: category?.icon ?? <Award />,
      color: category?.color ?? "text-gray-600",
      bg: category?.bg ?? "bg-gray-50",
    };
  });

  // GSAP Animations
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero Text
      gsap.from(".hero-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Cards Stagger
      gsap.fromTo(
        ".contributor-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ".contributors-grid", start: "top 85%" },
        }
      );

      // Legend Fade Up
      gsap.from(".legend-section", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: ".legend-section", start: "top 80%" },
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="font-jakarta bg-gray-50 min-h-screen">
      {/* =========================================
          SECTION 1: HERO (Dark & Premium)
      ========================================= */}
      <section className="bg-[#0b162a] text-white relative overflow-hidden pb-24">
        <Header />

        <div className="pt-22 pb-10 relative z-10 container mx-auto px-6 lg:px-12 text-center">
          {/* Breadcrumb / Location Badge */}
          <div className="hero-text inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">
              {regionCode} <span className="text-gray-600 mx-1">/</span>{" "}
              {locationName}
            </span>
          </div>

          <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Meet the Heroes of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
              {profile.displayName}
            </span>
          </h1>

          <p className="hero-text max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
            "{profile.tagline}"
          </p>
        </div>

        {/* Decorative BG */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </section>

      {/* =========================================
          SECTION 2: CONTRIBUTORS GRID
      ========================================= */}
      <section className="-mt-20 relative z-20 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-white font-bold text-xl flex items-center gap-2">
              <Star className="text-primary fill-primary w-5 h-5" /> Hall of
              Fame
            </h2>
            <span className="text-gray-400 text-xs font-mono uppercase">
              Last 24 Months Performance
            </span>
          </div>

          <div className="contributors-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contributors.map((person) => (
              <div
                key={person.id}
                className="contributor-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col"
              >
                {/* Header: Award Badge */}
                <div
                  className={`self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6 ${person.bg} ${person.color}`}
                >
                  {React.cloneElement(person.icon, { size: 14 })}
                  {person.categoryLabel.split("(")[0]}
                </div>

                {/* Avatar & Name */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full p-1 bg-gray-100 border border-gray-200">
                    <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden relative">
                      {/* Placeholder Avatar - replace with person.image */}
                      <div className="flex items-center justify-center h-full text-gray-500 font-bold text-lg">
                        {person.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0e1d34] group-hover:text-primary transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      {person.business}
                    </p>
                  </div>
                </div>

                {/* Footer: Award Name */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                      Awarded
                    </p>
                    <p className={`text-sm font-bold ${person.color}`}>
                      {person.awardName}
                    </p>
                  </div>
                  <div
                    className={`p-2 rounded-full ${person.bg} opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300`}
                  >
                    <ArrowRight className={`w-4 h-4 ${person.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: THE LEGEND (Reference)
      ========================================= */}
      <section className="legend-section py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[#0e1d34] mb-2">
                Recognition Framework
              </h3>
              <p className="text-gray-500 max-w-xl">
                We measure success beyond just revenue. These are the pillars
                that make the {profile.displayName} community thrive.
              </p>
            </div>
            <Link href="/join">
              <Button
                variant="outline"
                className="border-[#0e1d34] text-[#0e1d34] hover:bg-[#0e1d34] hover:text-white"
              >
                Become a Contributor
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recognitionCategories.map((cat) => (
              <div
                key={cat.key}
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${cat.bg} ${cat.color}`}
                >
                  {React.cloneElement(cat.icon, { size: 20 })}
                </div>
                <div>
                  <h4 className="font-bold text-[#0e1d34] text-sm">
                    {cat.awardName}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{cat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
