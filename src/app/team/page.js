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
  Star,
  Target,
  Clock,
  Zap,
  UserPlus,
  Briefcase,
  LayoutTemplate,
  BrainCircuit,
  CheckCircle2,
  Quote,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- DATA ---
const founders = [
  // PRADEEP GOYAL (Featured First)
  // {
  //   id: 1,
  //   name: "Pradeep Goyal",
  //   title: "Visionary Founder | Chief Strategist | Head of Operations",
  //   role_highlight: "The Brain Behind the Ecosystem",
  //   image: "/founder-pradeep.jpg", // Ensure you have this image
  //   bio: "With over 16 years in automobile dealership networks (Maruti, Toyota, Mahindra), Pradeep blends corporate discipline with entrepreneurial vision. He architects the systems, governance, and SOPs that make GYR UP a high-impact platform.",
  //   specialties: ["System Architecture", "Governance", "Strategic Execution"],
  //   social: { linkedin: "#", email: "pradeep@gyrup.com" },
  //   featured: true, // Flag to style him differently
  // },
  {
    id: 1,
    name: "Pradeep Goyal",
    title: "Visionary Founder | Chief Strategist | Head of Operations",
    image: "founders/pradeep.PNG", // Make sure this image exists in /public
    // Tagline for the badge
    role_highlight: "The Brain Behind the Ecosystem",
    // Main narrative
    bio: `Pradeep is widely regarded as the architect of the GYR UP ecosystem—its structure, systems, and execution model. With over 16 years of extensive experience in the automobile dealership network (Maruti Suzuki, Toyota, Mahindra & Mahindra), his expertise lies in sales leadership, dealer operations, and process discipline. As the Founder of SPG Group of Companies, he builds ventures with a strategist’s mindset—focused on governance and sustainable execution rather than short-term wins. By blending dealership-network discipline with entrepreneurial insight, he is shaping GYR UP International into a credible, structured, and high-impact business networking platform for serious entrepreneurs.`,
    // The Bullet Points
    responsibilities: [
      "Vision & Ecosystem Design",
      "Strategic Thinking & System Architecture",
      "Operations, SOPs & Governance",
      "Chapter, Region & Leadership Frameworks",
      "Ethics, Discipline & Process Compliance",
    ],
    // The Philosophy/Quote
    philosophy:
      "A strong ecosystem is not built by motivation alone, but by clarity, systems, and consistent execution.",
    social: { linkedin: "#", email: "pradeep@gyrup.com" },
    featured: true,
  },
  {
    id: 2,
    name: "Amit Goyal",
    title: "Co-Founder & Vision Lead",
    image: "/founder-amit.jpg",
    bio: "Serial entrepreneur building trusted ecosystems where business owners grow together.",
    social: { linkedin: "#", email: "amit@gyrup.com" },
  },
  {
    id: 3,
    name: "Neha Verma",
    title: "Co-Founder & Growth Architect",
    image: "/founder-neha.jpg",
    bio: "Marketing strategist with a decade of experience in scaling communities and B2B brands.",
    social: { linkedin: "#", email: "neha@gyrup.com" },
  },
];

const regionalDirectors = [
  {
    id: 1,
    name: "Anjali Gupta",
    role: "Regional Director",
    region: "NCR Region",
    image: "/a4.jpg",
    bio: "Oversees multiple chapters, mentors directors, and ensures every region lives the GYRUP culture.",
    social: { linkedin: "#", email: "#" },
  },
  {
    id: 2,
    name: "Sanjay Rao",
    role: "Regional Director",
    region: "North 1 (N1)",
    image: "/regional-1.jpg",
    bio: "Champion for collaboration across cities, driving cross-chapter referrals and regional brand presence.",
    social: { linkedin: "#", email: "sanjay@gyrup.com" },
  },
];

const chapterDirectors = [
  {
    id: 1,
    name: "Rajiv Malhotra",
    role: "Chapter Director",
    chapter: "Gurugram Central",
    regionCode: "N1",
    location: "Gurugram",
    image: "/a1.jpg",
    bio: "Ex-VP at Citibank. Successfully scaled 3 startups to 8-figure valuations.",
    social: { linkedin: "#", email: "rajiv@gyrup.com" },
  },
  {
    id: 2,
    name: "Simran Kaur",
    role: "Chapter Director",
    chapter: "Noida Titans",
    regionCode: "N1",
    location: "Noida",
    image: "/a2.jpg",
    bio: "Award-winning Real Estate Consultant known for building high-trust networks.",
    social: { linkedin: "#", email: "simran@gyrup.com" },
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Chapter Director",
    chapter: "Delhi South",
    regionCode: "NCR",
    location: "New Delhi",
    image: "/a3.jpg",
    bio: "Manufacturing tycoon passionate about mentoring young entrepreneurs.",
    social: { linkedin: "#", email: "vikram@gyrup.com" },
  },
];

const recognitionCategories = [
  {
    id: 1,
    icon: <Star />,
    title: "Excellence in Consistency",
    criteria: "100% Attendance",
    desc: "For members who show up every single time. Presence is power.",
    color: "text-yellow-400",
  },
  {
    id: 2,
    icon: <Users />,
    title: "Community Giver",
    criteria: "Highest Referrals",
    desc: "Recognizing the member who gives the most qualified business opportunities.",
    color: "text-blue-400",
  },
  {
    id: 3,
    icon: <Clock />,
    title: "Excellence in Timely Response",
    criteria: "On-Time Follow-Up",
    desc: "For members who respect time and close the loop instantly.",
    color: "text-green-400",
  },
  {
    id: 4,
    icon: <Target />,
    title: "Conversion Champion",
    criteria: "Highest Conversion Rate",
    desc: "Celebrates the highest referral-to-business closure rate.",
    color: "text-red-400",
  },
  {
    id: 5,
    icon: <Zap />,
    title: "Growth Catalyst",
    criteria: "Skill Enhancement",
    desc: "For members actively investing in learning and personal development.",
    color: "text-purple-400",
  },
  {
    id: 6,
    icon: <UserPlus />,
    title: "Community Builder",
    criteria: "New Member Addition",
    desc: "For those who grow the tribe by inviting quality entrepreneurs.",
    color: "text-orange-400",
  },
  {
    id: 7,
    icon: <Briefcase />,
    title: "Business Achiever",
    criteria: "₹1Cr / 5Cr / 10Cr+ Club",
    desc: "Honoring members who close massive business deals through GYRUP.",
    color: "text-amber-300",
  },
];

export default function TeamPage() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from(".hero-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Founder Cards Stagger
      gsap.from(".founder-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5,
      });

      // Leader Sections
      gsap.utils.toArray(".leader-section").forEach((section) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: { trigger: section, start: "top 80%" },
        });
      });

      // Reward Cards (Batched)
      gsap.from(".reward-card", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".rewards-grid", start: "top 85%" },
      });
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

        <div className="pt-14 md:pt-24 pb-18 md:pb-46">
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
                Our Core Team
              </span>
            </div>

            <h1 className="hero-text text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              Meet The Visionary Founders
              <br />
              {/* <span className="text-gray-400">
                And the leaders who grow your chapters.
              </span> */}
            </h1>

            <p className="hero-text text-gray-300 text-xl max-w-3xl mx-auto">
              GYRUP is built by founders, regional directors and chapter leaders
              who care about results, relationships, and recognition for every
              member.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: FOUNDERS (Floating)
      ========================================= */}
      <section className="-mt-10 md:-mt-28 relative z-20 pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* {founders
              .filter((f) => f.featured)
              .map((founder) => (
                <div
                  key={founder.id}
                  className="founder-card md:col-span-3 lg:col-span-3 bg-white rounded-3xl shadow-2xl border border-primary/20 overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="md:w-1/3 bg-[#0b162a] relative min-h-[300px] md:min-h-full flex md:items-center pt-5 md:pt-0 justify-center">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-primary/50 overflow-hidden relative z-10 shadow-2xl">
                      <img src="founders/pradeep.PNG" alt="founder pradeep" />
                    </div>
                    <div className="absolute bottom-6 text-white text-center w-full px-4">
                      <h3 className="text-2xl font-bold">{founder.name}</h3>
                      <p className="text-primary text-sm font-semibold tracking-widest uppercase mt-1">
                        {founder.title}
                      </p>
                    </div>
                  </div>

                  <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-4">
                      <BrainCircuit className="w-4 h-4" />{" "}
                      {founder.role_highlight}
                    </div>
                    <h4 className="text-3xl font-bold text-[#0e1d34] mb-4 leading-tight">
                      Structuring the Ecosystem for <br />{" "}
                      <span className="text-primary">Sustainable Growth.</span>
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {founder.bio}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                      {founder.specialties?.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm font-semibold text-[#0e1d34] bg-gray-50 p-3 rounded-lg border border-gray-100"
                        >
                          <LayoutTemplate className="w-4 h-4 text-primary" />{" "}
                          {spec}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Link href={founder.social.linkedin}>
                        <Button variant="outline" className="gap-2">
                          <Linkedin className="w-4 h-4" /> LinkedIn
                        </Button>
                      </Link>
                      <Link
                        href={`mailto:${founder.social.email}`}
                      >
                        <Button variant="outline" className="gap-2">
                          <Mail className="w-4 h-4" /> Email
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))} */}

            {founders.map((founder) =>
              founder.featured ? (
                /* ====================================
                 FEATURED CARD (PRADEEP GOYAL) 
                 - Spans full width
                 - Detailed Layout
              ==================================== */
                <div
                  key={founder.id}
                  className="founder-card md:col-span-3 bg-white rounded-3xl shadow-2xl border border-primary/20 overflow-hidden flex flex-col lg:flex-row"
                >
                  {/* IMAGE SIDE */}
                  <div className="lg:w-1/3 bg-[#0b162a] relative min-h-[400px] lg:min-h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                    {/* Image Container */}
                    <div className="w-56 h-56 rounded-full border-4 border-primary/50 overflow-hidden relative z-10 shadow-2xl mb-6">
                      <img src={founder.image} />
                      {/* <div className="w-full h-full bg-gray-300 flex items-center justify-center text-5xl font-bold text-gray-500">
                        {founder.name.charAt(0)}
                      </div> */}
                    </div>

                    <div className="relative z-10 text-white">
                      <h3 className="text-3xl font-bold mb-2">
                        {founder.name}
                      </h3>
                      <div className="h-1 w-12 bg-primary mx-auto mb-3"></div>
                      <p className="text-gray-300 text-sm font-medium tracking-wide uppercase leading-relaxed px-4">
                        {founder.title}
                      </p>
                    </div>
                  </div>

                  {/* CONTENT SIDE */}
                  <div className="lg:w-2/3 p-8 md:p-12 flex flex-col">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-6 bg-primary/10 w-fit px-3 py-1 rounded-full">
                      <BrainCircuit className="w-4 h-4" />{" "}
                      {founder.role_highlight}
                    </div>

                    {/* Bio Paragraph */}
                    <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                      {founder.bio}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      {/* Responsibilities List */}
                      <div>
                        <h4 className="text-[#0e1d34] font-bold mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>{" "}
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-3">
                          {founder.responsibilities?.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-gray-700"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Philosophy Quote Box */}
                      <div className="bg-gray-50 border-l-4 border-primary p-6 rounded-r-xl flex flex-col justify-center">
                        <Quote className="w-8 h-8 text-gray-300 mb-2" />
                        <p className="text-[#0e1d34] font-medium italic leading-relaxed">
                          "{founder.philosophy}"
                        </p>
                      </div>
                    </div>

                    {/* Social Actions */}
                    <div className="flex gap-4 mt-auto">
                      {/* <Link href={founder.social.linkedin}>
                        <Button
                          variant="outline"
                          className="gap-2 border-gray-300 hover:border-[#0077b5] hover:text-[#0077b5]"
                        >
                          <Linkedin className="w-4 h-4" /> LinkedIn Profile
                        </Button>
                      </Link> */}
                      <Link href={`mailto:pradeep@spggroup.in`}>
                        <Button
                          variant="outline"
                          className="gap-2 border-gray-300 hover:border-primary hover:text-primary"
                        >
                          <Mail className="w-4 h-4" /> Email
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                ""
                /* ====================================
                 STANDARD CARD (Amit & Neha) 
              ==================================== */
                // <div
                //   key={founder.id}
                //   className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300 h-full"
                // >
                //   <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-gray-200 to-gray-400 mb-6">
                //     <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                //       <div className="w-full h-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-500">
                //         {founder.name.charAt(0)}
                //       </div>
                //     </div>
                //   </div>
                //   <h3 className="text-xl font-bold text-[#0e1d34]">
                //     {founder.name}
                //   </h3>
                //   <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
                //     {founder.title}
                //   </p>
                //   <p className="text-gray-600 text-sm mb-6 flex-grow">
                //     {founder.bio}
                //   </p>
                //   <div className="flex gap-3">
                //     <Link href={founder.social.linkedin}>
                //       <Button
                //         variant="outline"
                //         size="icon"
                //         className="rounded-full w-8 h-8"
                //       >
                //         <Linkedin className="w-4 h-4" />
                //       </Button>
                //     </Link>
                //     <Link href={`mailto:${founder.social.email}`}>
                //       <Button
                //         variant="outline"
                //         size="icon"
                //         className="rounded-full w-8 h-8"
                //       >
                //         <Mail className="w-4 h-4" />
                //       </Button>
                //     </Link>
                //   </div>
                // </div>
              ),
            )}

            {/* {founders
              .filter((f) => !f.featured)
              .map((founder) => (
                <div
                  key={founder.id}
                  className="founder-card bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300 h-full"
                >
                  <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-gray-200 to-gray-400 mb-6">
                    <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-500">
                        {founder.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0e1d34]">
                    {founder.name}
                  </h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
                    {founder.title}
                  </p>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    {founder.bio}
                  </p>
                  <div className="flex gap-3">
                    <Link href={founder.social.linkedin}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-8 h-8"
                      >
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`mailto:${founder.social.email}`}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-8 h-8"
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))} */}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: MEET THE LEADERS
      ========================================= */}
      <section className="pb-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          {/* A. Regional Directors */}
          <div className="leader-section mb-20">
            <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-3xl font-bold text-[#0e1d34]">
                  Regional Directors
                </h2>
                <p className="text-gray-500 mt-1">
                  Guardians of the GYRUP Culture.
                </p>
              </div>
              <Shield className="w-8 h-8 text-primary/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regionalDirectors.map((director) => (
                <div
                  key={director.id}
                  className="bg-white rounded-xl p-6 border border-gray-100 flex gap-6 items-start hover:shadow-lg transition-shadow"
                >
                  <div className="w-20 h-20 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gray-300"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0e1d34]">
                      {director.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        {director.region}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{director.bio}</p>
                    <Link
                      href={`mailto:${director.social.email}`}
                      // href={`mailto:${director.social.email}`}
                      className="text-xs font-bold text-[#0e1d34] flex items-center gap-1 hover:text-primary"
                    >
                      CONTACT <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* B. Chapter Directors */}
          <div className="leader-section">
            <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-3xl font-bold text-[#0e1d34]">
                  Chapter Directors
                </h2>
                <p className="text-gray-500 mt-1">
                  Driving growth on the ground.
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapterDirectors.map((director) => (
                <div
                  key={director.id}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary/50 transition-all"
                >
                  <div className="h-24 bg-[#0e1d34] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                  </div>
                  <div className="px-6 relative">
                    <div className="w-16 h-16 rounded-full border-4 border-white bg-gray-200 -mt-8 relative z-10 overflow-hidden">
                      <div className="w-full h-full bg-gray-300"></div>
                    </div>
                  </div>
                  <div className="p-6 pt-3">
                    <h3 className="text-lg font-bold text-[#0e1d34]">
                      {director.name}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                      {director.chapter} • {director.location}
                    </p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {director.bio}
                    </p>
                    <Link
                      href={`/${director.regionCode}/${
                        director.location
                      }/${director.chapter.replace(/\s+/g, "-")}`}
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-between group-hover:bg-[#0e1d34] group-hover:text-white transition-colors"
                      >
                        View Chapter <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: REWARDS (PREMIUM DARK MODE)
      ========================================= */}
      <section className="py-24 bg-[#0b162a] relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary border border-primary/30 bg-primary/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Award className="w-4 h-4" /> Hall of Fame
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Community Contributors
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We celebrate consistency, generosity, and results. These awards
              recognize the heroes who build the GYRUP ecosystem.
            </p>
          </div>

          <div className="rewards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recognitionCategories.map((item, i) => (
              <div
                key={item.id}
                className={`reward-card bg-[#0e1d34] border border-white/5 p-6 rounded-2xl hover:bg-white/5 transition-colors group relative overflow-hidden ${
                  i === 6
                    ? "md:col-span-2 lg:col-span-2 bg-gradient-to-r from-[#0e1d34] to-[#1a2c4a]"
                    : ""
                }`}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className={`p-3 rounded-lg bg-white/5 ${item.color}`}>
                    {React.cloneElement(item.icon, { size: 24 })}
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">
                    0{item.id}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 relative z-10">
                  {item.title}
                </h3>
                <p
                  className={`text-xs font-bold uppercase tracking-wider mb-3 opacity-80 ${item.color} relative z-10`}
                >
                  {item.criteria}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-4">
              *Contributors are updated monthly on respective Chapter Pages.
            </p>
            <Link href="/chapters">
              <Button className="bg-primary text-black hover:bg-white hover:text-black font-bold px-8">
                Find Your Chapter's Heroes
              </Button>
            </Link>
          </div> */}
        </div>
      </section>

      <Footer />
    </main>
  );
}
