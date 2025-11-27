"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Mail,
  MessageSquare,
  TrendingUp,
  Users,
  Shield,
  Award,
  ArrowRight,
  User,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";

// --- MOCK DATA ---
const directors = [
  {
    id: 1,
    name: "Rajiv Malhotra",
    role: "Chapter Director – Gurugram Central",
    image: "/a1.jpg", // Placeholder
    bio: "Ex-VP at Citibank with 15+ years in corporate finance. Successfully scaled 3 startups to 8-figure valuations.",
    focusAreas: ["Member Growth", "Financial Strategy", "Conflict Resolution"],
    social: { linkedin: "#", email: "rajiv@gyrup.com" },
  },
  {
    id: 2,
    name: "Simran Kaur",
    role: "Chapter Director – Noida Titans",
    image: "/a2.jpg",
    bio: "Award-winning Real Estate Consultant. Known for building high-trust networks and facilitating large-ticket deals.",
    focusAreas: ["Networking Ethics", "Event Management", "Lead Quality"],
    social: { linkedin: "#", email: "simran@gyrup.com" },
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Chapter Director – Delhi South",
    image: "/a3.jpg",
    bio: "Manufacturing tycoon turned community builder. Passionate about mentoring young entrepreneurs in the manufacturing sector.",
    focusAreas: ["Mentorship", "Supply Chain", "Operational Excellence"],
    social: { linkedin: "#", email: "vikram@gyrup.com" },
  },
  {
    id: 4,
    name: "Anjali Gupta",
    role: "Regional Director – NCR",
    image: "/a4.jpg",
    bio: "A strategic powerhouse. Anjali oversees multiple chapters ensuring protocol compliance and cross-chapter collaboration.",
    focusAreas: ["Compliance", "Leadership Training", "Expansion Strategy"],
    social: { linkedin: "#", email: "anjali@gyrup.com" },
  },
];

export default function TeamPage() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. HERO TEXT
      gsap.from(".hero-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // 2. CARDS STAGGER
      gsap.fromTo(
        ".director-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2, // The "Wave" effect
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 80%",
          },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="font-jakarta bg-gray-50 min-h-screen">
      {/* =========================================
          SECTION 1: HERO
      ========================================= */}
      <section className="bg-[#0e1d34] text-white relative overflow-hidden">
        <Header />
        <div className="pt-24 pb-32">
          {/* Background Texture */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
            <div className="inline-flex items-center border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
              <User className="w-5 h-5 text-primary inline-block mr-2" />
              <span className="text-primary text-sm md:text-lg font-bold tracking-[0.2rem] uppercase">
                Our Leadership
              </span>
            </div>
            <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              Meet the Leaders Who
              <br />
              <span className="text-gray-400">Run Your Chapters.</span>
            </h1>
            <p className="hero-text text-gray-300 text-lg max-w-2xl mx-auto">
              These are not just administrators. They are seasoned industry
              veterans dedicated to your growth and the integrity of the
              network.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: TEAM GRID
      ========================================= */}
      <section className="py-24 -mt-20 relative z-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directors.map((director) => (
              <div
                key={director.id}
                className="director-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
              >
                {/* 1. Card Header / Cover */}
                <div className="h-32 bg-[#0e1d34] relative">
                  {/* Abstract Pattern in Header */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] text-white font-medium uppercase tracking-wide">
                      Active
                    </span>
                  </div>
                </div>

                {/* 2. Profile Image & Basic Info */}
                <div className="px-8 relative -mt-16 text-center">
                  <div className="w-32 h-32 mx-auto rounded-full p-1.5 bg-white shadow-lg relative z-10">
                    {/* Placeholder Image */}
                    <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                      {/* <img src={director.image} /> goes here */}
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                        <Users />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-[#0e1d34]">
                      {director.name}
                    </h3>
                    <p className="text-primary font-medium text-sm mt-1">
                      {director.role}
                    </p>
                  </div>
                </div>

                {/* 3. Bio & Focus */}
                <div className="p-8 pt-6 flex-grow flex flex-col">
                  <p className="text-gray-600 text-sm leading-relaxed text-center mb-6">
                    "{director.bio}"
                  </p>

                  <div className="mt-auto">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 text-center">
                      Focus Areas
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {director.focusAreas.map((area, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Action Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
                  <Button className="flex-1 bg-[#0e1d34] hover:bg-primary hover:text-black transition-colors font-bold text-xs h-10">
                    <MessageSquare className="w-3 h-3 mr-2" /> Message Director
                  </Button>

                  <Link href={director.social.linkedin}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-gray-200 hover:text-[#0077b5] hover:border-[#0077b5]"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA: Join Leadership */}
          <div className="mt-24 text-center">
            <div className="inline-flex items-center gap-2 text-gray-400 mb-4">
              <Award className="w-5 h-5 text-primary" />
              <span className="uppercase tracking-widest text-sm font-bold">
                Join the Ranks
              </span>
            </div>
            <h2 className="text-3xl font-bold text-[#0e1d34] mb-6">
              Do you have what it takes to lead?
            </h2>
            <Link href="/contact?subject=DirectorApplication">
              <Button
                variant="outline"
                className="px-8 py-6 text-lg border-[#0e1d34] text-[#0e1d34] hover:bg-[#0e1d34] hover:text-white transition-all"
              >
                Apply for Directorship <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
