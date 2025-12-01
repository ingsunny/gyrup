"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Search,
  Filter,
  ArrowRight,
  Briefcase,
  Unlock,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- MOCK DATA ---
const chapters = [
  {
    id: 1,
    name: "Gurugram Central",
    status: "Active",
    city: "Gurugram",
    day: "Thursday",
    time: "7:30 AM - 9:30 AM",
    venue: "Hotel Le Meridien, Sector 26",
    director: "Rajiv Malhotra",
    directorImg: "/a1.jpg", // Placeholder
    openCategories: ["Architect", "Chartered Accountant", "Digital Marketer"],
  },
  {
    id: 2,
    name: "Noida Titans",
    status: "Active",
    city: "Noida",
    day: "Friday",
    time: "6:00 PM - 8:00 PM",
    venue: "Radisson Blu, Sector 18",
    director: "Simran Kaur",
    directorImg: "/a2.jpg",
    openCategories: [
      "Interior Designer",
      "Real Estate Broker",
      "Event Planner",
    ],
  },
  {
    id: 3,
    name: "Delhi South Elite",
    status: "Launching Soon",
    city: "New Delhi",
    day: "Wednesday",
    time: "7:00 AM - 9:00 AM",
    venue: "Sheraton, Saket",
    director: "Vikram Singh",
    directorImg: "/a3.jpg",
    openCategories: ["All Categories Open"],
  },
  {
    id: 4,
    name: "Cyber City Pioneers",
    status: "Active",
    city: "Gurugram",
    day: "Tuesday",
    time: "8:00 AM - 10:00 AM",
    venue: "The Oberoi, Gurgaon",
    director: "Anjali Gupta",
    directorImg: "/a4.jpg",
    openCategories: ["Corporate Lawyer", "HR Consultant", "IT Services"],
  },
];

export default function ChaptersPage() {
  const mainRef = useRef(null);
  const [filter, setFilter] = useState("");

  // Filter Logic
  const filteredChapters = chapters.filter(
    (c) =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      c.city.toLowerCase().includes(filter.toLowerCase())
  );

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. HERO REVEAL
      gsap.from(".hero-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // 2. SEARCH BAR FLOAT UP
      gsap.from(".search-bar-container", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "back.out(1.7)",
      });

      // 3. CHAPTER CARDS STAGGER (Grid Animation)
      // We use a timeout to let React render the filtered list first if state changes
      ScrollTrigger.refresh();
      gsap.fromTo(
        ".chapter-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1, // Stagger effect
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".chapters-grid",
            start: "top 85%",
          },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="font-jakarta bg-gray-50 min-h-screen">
      {/* =========================================
          SECTION 1: HERO & SEARCH
      ========================================= */}
      <section className="bg-[#0e1d34]  text-white relative">
        <Header />
        <div className="pt-14 md:pt-24 pb-32">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
            <div className="hero-content">
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4">
                Find Your <span className="text-primary">Tribe.</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                Join a high-performing chapter near you. Every seat is
                exclusive—once a category is filled, it's closed.
              </p>
            </div>

            {/* SEARCH BAR WIDGET */}
            <div className="search-bar-container max-w-5xl mx-auto bg-white rounded-full p-2 flex items-center shadow-2xl transform translate-y-16 border-4 border-white/10">
              <div className="pl-6 text-gray-400 hidden md:inline-block">
                <Search className="w-5 h-5" />
              </div>
              <Input
                className="border-none shadow-none text-black md:h-14 text-base md:text-lg focus-visible:ring-0 placeholder:text-gray-400"
                placeholder="Search by City or Chapter Name..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <Button className="rounded-full h-10 md:h-12 min-w-10 md:min-w-auto md:px-8 bg-primary text-black hover:bg-[#0e1d34] hover:text-white font-bold transition-colors">
                <span className="md:inline-block hidden">Search</span>
                <Search className="min-w-5 min-h-5 md:hidden" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: CHAPTERS GRID
      ========================================= */}
      <section className="pt-18 pb-20 md:pt-22 md:pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header & Results Count */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-[#0e1d34] flex items-center gap-2">
              <MapPin className="text-primary" /> Available Chapters
            </h2>
            <span className="text-gray-500 font-medium bg-white px-4 py-2 rounded-full border border-gray-200">
              {filteredChapters.length} Chapters found
            </span>
          </div>

          {/* THE GRID */}
          <div className="chapters-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChapters.length > 0 ? (
              filteredChapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="chapter-card bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                >
                  {/* 1. Header (Name & Status) */}
                  <div className="bg-[#0e1d34] p-6 flex justify-between items-start relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {chapter.name}
                      </h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {chapter.city}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        chapter.status === "Active"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-primary/20 text-primary border border-primary/30"
                      }`}
                    >
                      {chapter.status}
                    </span>
                  </div>

                  {/* 2. Body Details */}
                  <div className="p-6 space-y-4 flex-grow">
                    {/* Schedule */}
                    <div className="flex items-start gap-3 text-gray-600">
                      <div className="bg-blue-50 p-2 rounded text-blue-600 shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0e1d34]">
                          Fortnightly Meeting
                        </p>
                        <p className="text-sm">
                          {chapter.day}s • {chapter.time}
                        </p>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-start gap-3 text-gray-600">
                      <div className="bg-purple-50 p-2 rounded text-purple-600 shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0e1d34]">Venue</p>
                        <p className="text-sm">{chapter.venue}</p>
                      </div>
                    </div>

                    {/* OPEN CATEGORIES (The "Hook") */}
                    <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mt-2">
                      <div className="flex items-center gap-2 mb-2 text-orange-800 font-bold text-xs uppercase tracking-wide">
                        <Briefcase className="w-3 h-3" /> Open Categories
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {chapter.openCategories.map((cat, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white text-gray-700 px-2 py-1 rounded border border-orange-200"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 3. Footer (Director & CTA) */}
                  <div className="p-6 pt-0 mt-auto">
                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                      {/* Director Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                          {/* Placeholder Avatar */}
                          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                            <User className="w-5 h-5" />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">
                            Chapter Director
                          </p>
                          <p className="text-sm font-bold text-[#0e1d34]">
                            {chapter.director}
                          </p>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link href={`/join?chapter=${chapter.name}`}>
                        <Button
                          size="sm"
                          className="bg-[#0e1d34] hover:bg-primary hover:text-black transition-colors rounded-lg group"
                        >
                          Apply{" "}
                          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-lg">
                  No chapters found matching your search.
                </p>
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={() => setFilter("")}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Launch a Chapter CTA */}
          <div className="mt-20 bg-primary/10 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-[#0e1d34] mb-2">
              Don't see a chapter in your city?
            </h3>
            <p className="text-gray-600 mb-6">
              Take the lead. Apply to become a Chapter Director and build your
              own legacy.
            </p>
            <Button
              variant="outline"
              className="border-[#0e1d34] text-[#0e1d34] hover:bg-[#0e1d34] hover:text-white"
            >
              Launch a Chapter
            </Button>
          </div>
        </div>
      </section>

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
          <div className="inline-flex flex-col md:flex-row items-center mb-4 rounded-full bg-white/5 border border-white/10 text-secondary text-base md:text-lg font-bold tracking-widest uppercase backdrop-blur-md py-2 px-4 gap-2">
            <Unlock className="w-5 h-5 text-secondary" />
            <span className="">Exclusive Access For New Members</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Find the <span className="text-primary">Chapter</span> That Matches
            Your Vision.
          </h2>

          <p className="text-base md:text-xl text-gray-300 mb-4 max-w-5xl mx-auto leading-relaxed">
            Each GYR UP chapter brings together curated business owners,
            structured meetings, real accountability, and a zero-pressure
            networking culture.
          </p>
          <p className="text-base md:text-xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
            Find a chapter near you — and grow with people who mean business.
          </p>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-6 w-full">
            <Button
              // onClick={scrollToForm}
              className="
             relative overflow-hidden group
      bg-primary/90 text-black hover:text-white
      text-xl tracking-wide rounded-none
      !px-8 !py-8 md:scale-100 scale-85
      flex items-center justify-center cursor-pointer
          "
            >
              <Link href="/membership">
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
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
