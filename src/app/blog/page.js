"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Clock,
  Calendar,
  Search,
  Tag,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- MOCK DATA ---
const categories = [
  "All",
  "Networking Strategy",
  "Success Stories",
  "Events",
  "Leadership",
];

const posts = [
  {
    id: 1,
    title: "The Art of the 45-Second Pitch: How to Hook Investors",
    excerpt:
      "Most entrepreneurs fail because they ramble. Here is the exact framework our members use to close deals in under a minute.",
    category: "Networking Strategy",
    date: "Oct 24, 2023",
    readTime: "5 min",
    image: "/blog1.jpg", // Placeholder
    featured: true,
  },
  {
    id: 2,
    title: "From Solo Founder to 50 Employees: A GYR UP Case Study",
    excerpt:
      "How Rahul Sharma leveraged the Noida Titans chapter to find his co-founder and key investors.",
    category: "Success Stories",
    date: "Nov 02, 2023",
    readTime: "8 min",
    image: "/blog2.jpg",
  },
  {
    id: 3,
    title: "Why 'Givers Gain' is a Profitable Business Model",
    excerpt:
      "Altruism isn't just nice; it's profitable. The economics behind referral marketing explained.",
    category: "Strategy",
    date: "Nov 10, 2023",
    readTime: "4 min",
    image: "/blog3.jpg",
  },
  {
    id: 4,
    title: "5 Signs Your Referral Partner is a Keeper",
    excerpt:
      "Not all connections are equal. Here is how to spot the high-value partners in your network.",
    category: "Networking Strategy",
    date: "Nov 15, 2023",
    readTime: "6 min",
    image: "/blog4.jpg",
  },
  {
    id: 5,
    title: "Recap: The National Directors Meet 2024",
    excerpt:
      "Highlights from our annual gathering in Goa. New policies, awards, and the vision for 2025.",
    category: "Events",
    date: "Dec 01, 2023",
    readTime: "3 min",
    image: "/blog5.jpg",
  },
];

export default function BlogListingPage() {
  const mainRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.from(".hero-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // 2. Featured Post Slide Up
      gsap.from(".featured-post", {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // 3. Grid Stagger
      ScrollTrigger.refresh();
      gsap.fromTo(
        ".blog-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".blog-grid", start: "top 85%" },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, [activeCategory]); // Re-run animation when category changes

  return (
    <main ref={mainRef} className="font-jakarta bg-gray-50 min-h-screen">
      {/* =========================================
          SECTION 1: HERO
      ========================================= */}
      <section className="bg-[#0e1d34]  text-white relative overflow-hidden">
        <Header />

        <div className="pt-14 md:pt-24 pb-16 md:pb-32">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
            <div className="hero-content">
              <h1 className=" text-4xl md:text-7xl lg:text-8xl font-bold mb-6">
                Insights & <span className="text-primary">Intel.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Strategies, stories, and updates from the world of
                high-performance business networking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: FEATURED POST
      ========================================= */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="container mx-auto px-6 lg:px-12">
          {posts
            .filter((p) => p.featured)
            .map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <div className="featured-post bg-white rounded-3xl overflow-hidden shadow-xl md:shadow-2xl border border-gray-100 group cursor-pointer flex flex-col md:flex-row h-full md:h-[500px]">
                  {/* Image Side */}
                  <div className="md:w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#0e1d34]/20 group-hover:bg-transparent transition-colors z-10"></div>
                    {/* Replace bg-gray-300 with actual image */}
                    <div
                      className="w-full h-full bg-gray-300 group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage: `url(${post.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="absolute top-6 left-6 z-20 bg-primary text-black text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                      Featured Story
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {post.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {post.readTime} read
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-[#0e1d34] mb-4 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg mb-5 md:mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto text-sm md:text-base flex items-center text-[#0e1d34] font-bold group-hover:translate-x-2 transition-transform">
                      Read Full Article{" "}
                      <ArrowRight className="ml-2 w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* =========================================
          SECTION 3: GRID & FILTERS
      ========================================= */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#0e1d34] text-white shadow-lg scale-105"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts
              .filter((p) => !p.featured)
              .map((post) => (
                <Link
                  href={`/blog/${post.id}`}
                  key={post.id}
                  className="blog-card group cursor-pointer flex flex-col h-full"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    {/* Card Image */}
                    <div className="aspect-[16/10] bg-gray-200 overflow-hidden relative">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${post.image})` }}
                      ></div>
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold text-[#0e1d34] rounded uppercase tracking-wide">
                        {post.category}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime} read</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#0e1d34] mb-3 leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase">
                          Read More
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#0e1d34] group-hover:bg-[#0e1d34] group-hover:text-white transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-primary rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-[#0e1d34] mb-4">
                Don't miss the next big insight.
              </h2>
              <p className="text-[#0e1d34]/80 mb-8">
                Join 5,000+ entrepreneurs receiving our weekly growth
                strategies.
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-2 px-6 py-3 rounded-full w-full border-1 focus:ring-2 focus:ring-[#0e1d34]"
                />
                <Button className="rounded-full flex-1 w-full px-8 py-4 md:py-6 bg-[#0e1d34] text-white hover:bg-black">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
