"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Calendar,
  User,
  Search,
  ArrowRight,
  Briefcase,
  Unlock,
  Mail,
  Phone,
  Building2,
  Rocket,
  X,
  Loader2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Label } from "@radix-ui/react-label";
import { AnimatePresence, motion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";

const regions = [
  {
    name: "Delhi South",
    city: "Delhi",
    chapters: [],
  },
  {
    name: "Delhi West",
    city: "Delhi",
    chapters: [
      { name: "Janak", pincode: "110058" },
      { name: "Kirti", pincode: "110015" },
    ],
  },
  {
    name: "Delhi North-1",
    city: "Delhi",
    chapters: [],
  },
  {
    name: "Delhi North-2",
    city: "Delhi",
    chapters: [
      { name: "Shalimar", pincode: null },
      { name: "Shakti", pincode: null },
    ],
  },
  {
    name: "Delhi East",
    city: "Delhi",
    chapters: [{ name: "Preet", pincode: null }],
  },
  {
    name: "Delhi South West",
    city: "Delhi",
    chapters: [],
  },
  {
    name: "Chennai East",
    city: "Chennai",
    chapters: [],
  },
  {
    name: "Coimbatore",
    city: "Coimbatore",
    chapters: [], // ✅ FIXED
  },
  {
    name: "Hyderabad-1",
    city: "Hyderabad",
    chapters: [], // ✅ FIXED
  },
];

export default function ChaptersPage() {
  const mainRef = useRef(null);
  const [filter, setFilter] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredRegions = regions
    .map((region) => {
      const filteredChapters = region.chapters.filter(
        (chapter) =>
          chapter.name.toLowerCase().includes(filter.toLowerCase()) ||
          region.name.toLowerCase().includes(filter.toLowerCase()) ||
          region.city.toLowerCase().includes(filter.toLowerCase()) ||
          (chapter.pincode && chapter.pincode.includes(filter)),
      );

      return {
        ...region,
        chapters: filteredChapters,
      };
    })
    .filter(
      (region) =>
        region.name.toLowerCase().includes(filter.toLowerCase()) ||
        region.city.toLowerCase().includes(filter.toLowerCase()) ||
        region.chapters.length > 0,
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

      // 3. CHAPTER CARDS STAGGER
      ScrollTrigger.refresh();
      gsap.fromTo(
        ".chapter-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".chapters-grid",
            start: "top 85%",
          },
        },
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const [token, setToken] = useState(""); // Turnstile Token State
  const [launchFormData, setLaunchFormData] = useState({
    name: "",
    phone: "",
    email: "",
    region: "",
    city: "",
    pincode: "",
  });

  // 2. Helper to handle input changes
  const handleLaunchChange = (e) => {
    setLaunchFormData({ ...launchFormData, [e.target.id]: e.target.value });
  };

  const handleLaunchSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!token) {
      alert("Please complete the security check.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/launch-chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send data + token
        body: JSON.stringify({ ...launchFormData, token }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Application Received! We will connect with you shortly.");
        setIsModalOpen(false);
        setLaunchFormData({
          name: "",
          phone: "",
          email: "",
          region: "",
          city: "",
          pincode: "",
        });
        setToken(""); // Reset token
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main ref={mainRef} className="font-jakarta bg-gray-50 min-h-screen">
      {/* =========================================
          SECTION 1: HERO & SEARCH
      ========================================= */}
      <section className="bg-[#0e1d34] text-white relative">
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
                // Updated Placeholder
                placeholder="Search by City, Pincode or Chapter Name..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              {/* <Button className="rounded-full !py-6 !px-4 md:py-9 md:!px-7 bg-primary text-black hover:bg-[#0e1d34] hover:text-white font-bold transition-colors">
                <span className="md:inline-block hidden">Search</span>
                <Search className="min-w-5 min-h-5 md:hidden" />
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: CHAPTERS GRID
      ========================================= */}
      <section className="pt-18 pb-20 md:pt-22 md:pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-2xl font-bold text-[#0e1d34] flex items-center gap-2">
              <MapPin className="text-primary" /> Available Regions
            </h2>
            <span className="text-gray-500 font-medium bg-white px-4 py-2 rounded-full border">
              {filteredRegions.length} Regions
            </span>
          </div>

          {/* Regions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRegions.length > 0 ? (
              filteredRegions.map((region, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
                >
                  {/* Region Header */}
                  <div className="bg-[#0e1d34] p-6">
                    <h3 className="text-xl font-bold text-white">
                      {region.name}
                    </h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {region.city}
                    </p>
                  </div>

                  {/* Chapters */}
                  <div className="p-6 space-y-3 flex-grow">
                    {region.chapters.length > 0 ? (
                      region.chapters.map((chapter, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 hover:border-primary transition"
                        >
                          <div>
                            <p className="font-semibold text-[#0e1d34]">
                              {chapter.name}
                            </p>
                            {chapter.pincode && (
                              <p className="text-xs text-gray-500">
                                Pincode: {chapter.pincode}
                              </p>
                            )}
                          </div>

                          <Link href={`/join-gyrup`}>
                            <Button
                              size="sm"
                              className="bg-[#0e1d34] hover:bg-primary hover:text-black rounded-lg"
                            >
                              Apply
                              <ArrowRight className="ml-1 w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic">
                        No active chapters yet
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-lg">
                  No regions or chapters found.
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

          {/* CTA */}
          <div className="mt-20 bg-primary/10 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-[#0e1d34] mb-2">
              Don’t see a chapter in your city?
            </h3>
            <p className="text-gray-600 mb-6">
              Take the lead. Apply to become a Chapter Director.
            </p>
            {/* <Button
              variant="outline"
              className="border-[#0e1d34] text-[#0e1d34] hover:bg-[#0e1d34] hover:text-white"
            >
              Launch a Chapter
            </Button> */}

            <Button
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="border-[#0e1d34] text-[#0e1d34] hover:bg-[#0e1d34] hover:text-white relative z-10 font-bold px-8 py-6"
            >
              <Building2 className="mr-2 w-5 h-5" /> Launch a Chapter
            </Button>
          </div>
        </div>
      </section>

      {/* <section className="relative py-28 bg-[#063231] overflow-hidden isolate">
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
      </section> */}
      <Footer />

      {/* =========================================
          MODAL: LAUNCH A CHAPTER
      ========================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-[#0e1d34] p-6 text-white flex justify-between items-start shrink-0">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-primary" /> Launch a Chapter
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Lead the growth in your city.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <form onSubmit={handleLaunchSubmit} className="space-y-6">
                  {/* Row 1 */}
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          id="name"
                          value={launchFormData.name}
                          onChange={handleLaunchChange}
                          required
                          placeholder="John Doe"
                          className="pl-10 h-12 bg-gray-50 border-gray-200"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={launchFormData.phone}
                          onChange={handleLaunchChange}
                          required
                          placeholder="+91 98765 43210"
                          className="pl-10 h-12 bg-gray-50 border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={launchFormData.email}
                        onChange={handleLaunchChange}
                        required
                        placeholder="john@example.com"
                        className="pl-10 h-12 bg-gray-50 border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="region">Region / State</Label>
                      <Input
                        id="region"
                        value={launchFormData.region}
                        onChange={handleLaunchChange}
                        required
                        placeholder="e.g. Maharashtra"
                        className="h-12 bg-gray-50 border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={launchFormData.city}
                        onChange={handleLaunchChange}
                        required
                        placeholder="e.g. Pune"
                        className="h-12 bg-gray-50 border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={launchFormData.pincode}
                        onChange={handleLaunchChange}
                        required
                        placeholder="411001"
                        className="h-12 bg-gray-50 border-gray-200"
                      />
                    </div>
                  </div>

                  {/* TURNSTILE WIDGET */}
                  <Turnstile
                    siteKey="0x4AAAAAACU3xa_c2R9lsOZK"
                    onSuccess={(token) => setToken(token)}
                    onError={() => alert("Security check failed")}
                    options={{ theme: "light" }}
                  />

                  {/* Submit Area */}
                  <div className="">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg font-bold bg-primary text-black hover:bg-[#0e1d34] hover:text-white transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application{" "}
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                      Our expansion team will connect with you within 48 hours.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
