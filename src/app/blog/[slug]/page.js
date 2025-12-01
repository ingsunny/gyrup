"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SingleBlogPage({ params }) {
  // Mock Data (In real app, fetch based on params.slug)
  const post = {
    title: "The Art of the 45-Second Pitch: How to Hook Investors",
    category: "Networking Strategy",
    date: "October 24, 2023",
    readTime: "5 min read",
    author: "Rajiv Malhotra",
    authorRole: "Director, Gurugram Central",
    image: "/blog1.jpg",
  };

  // 1. SCROLL PROGRESS LOGIC
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="font-jakarta bg-white min-h-screen">
      {/* 1. PROGRESS BAR (Sticky Top) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* 2. HEADER */}
      <div className="bg-[#0e1d34]  text-white relative">
        <Header />
        <div className="container pt-14 md:pt-24 pb-16 md:pb-32 px-6 lg:px-12 relative z-10 max-w-4xl mx-auto text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-400 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Resources
          </Link>

          <div className="mb-6 flex justify-center gap-4 text-sm font-bold uppercase tracking-wider text-primary">
            <span>{post.category}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-500 overflow-hidden">
                {/* Author Img */}
                <div className="w-full h-full bg-gray-300"></div>
              </div>
              <div className="text-left">
                <p className="text-white font-bold">{post.author}</p>
                <p className="text-xs">{post.authorRole}</p>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div className="flex flex-col text-left">
              <span className="flex items-center gap-2">
                <Calendar className="w-3 h-3" /> {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CONTENT AREA */}
      <article className="container mx-auto px-6 lg:px-12 py-16">
        {/* Main Image */}
        <div className="max-w-5xl mx-auto -mt-32 mb-16 relative z-20">
          <div className="aspect-[21/9] bg-gray-200 rounded-2xl shadow-2xl overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* LEFT: SOCIAL STICKY (Desktop) */}
          <div className="hidden lg:flex flex-col gap-4 w-16 sticky top-32 h-fit">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2 text-center">
              Share
            </p>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-200 hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-blue-50"
            >
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-200 hover:border-black hover:text-black hover:bg-gray-50"
            >
              <Twitter className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-200 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <Facebook className="w-4 h-4" />
            </Button>
            <div className="w-px h-12 bg-gray-200 mx-auto mt-4"></div>
          </div>

          {/* MIDDLE: THE CONTENT */}
          <div className="flex-1 max-w-3xl mx-auto prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-[#0e1d34] prose-a:text-primary hover:prose-a:text-[#0e1d34] prose-img:rounded-xl">
            {/* SIMULATED BLOG CONTENT */}
            <p className="lead text-xl text-gray-600 mb-8 font-medium">
              In the world of high-stakes networking, you don't have 10 minutes
              to explain your business. You often don't even have five. You have
              about 45 seconds before eyes glaze over. Here is how to make them
              count.
            </p>

            <h2>The Psychology of the Hook</h2>
            <p>
              Most people start their pitch with "Hi, I'm John and I started my
              company in 2010..." <br />
              <strong>Stop doing this.</strong> Nobody cares about your history
              yet; they care about their problems.
            </p>
            <p>
              Start with the <em>pain point</em>. For example: "You know how
              most small businesses overpay their taxes by 20% because they miss
              deductions?"
            </p>

            <div className="bg-blue-50 border-l-4 border-primary p-6 my-8 not-prose rounded-r-lg">
              <h4 className="font-bold text-[#0e1d34] mb-2 flex items-center gap-2">
                💡 Pro Tip
              </h4>
              <p className="text-gray-700 text-sm">
                Record yourself on your phone. If you haven't stated the problem
                you solve within the first 8 seconds, rewrite your script.
              </p>
            </div>

            <h2>The 4-Step Formula</h2>
            <ul className="space-y-2 list-disc pl-5 marker:text-primary">
              <li>
                <strong>The Hook:</strong> State the pain.
              </li>
              <li>
                <strong>The Solution:</strong> How you fix it (briefly).
              </li>
              <li>
                <strong>The Credibility:</strong> "We've helped 50+ firms..."
              </li>
              <li>
                <strong>The Ask:</strong> Be specific. "I'm looking for HR
                Directors at Tech firms."
              </li>
            </ul>

            <img
              src="/blog-content.jpg"
              alt="Meeting diagram"
              className="w-full h-auto my-8 bg-gray-100"
            />

            <h2>Why Specificity Wins</h2>
            <p>
              Vague asks get vague results. If you ask for "anyone who needs
              insurance," you get zero referrals. If you ask for "New parents in
              South Delhi looking for term life insurance," your network
              instantly scans their brain for that exact person.
            </p>

            <p>
              Networking is not about selling to the room; it is about training
              the room to be your sales force.
            </p>

            <hr className="my-12 border-gray-200" />

            <div className="bg-[#0e1d34] text-white p-8 rounded-2xl text-center not-prose">
              <h3 className="text-2xl font-bold mb-4">
                Mastered the pitch? Now use it.
              </h3>
              <p className="text-gray-300 mb-6">
                Join a GYR UP chapter near you and put your 45-second intro to
                the test with credible entrepreneurs.
              </p>
              <Link href="/join-gyrup">
                <Button className="bg-primary text-black hover:bg-white font-bold px-8 py-4 h-auto">
                  Apply for Membership
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT: TABLE OF CONTENTS (Optional/Desktop) */}
          <div className="hidden xl:block w-64 sticky top-32 h-fit">
            <h4 className="font-bold text-[#0e1d34] mb-4 uppercase text-xs tracking-wider">
              In this article
            </h4>
            <ul className="space-y-3 text-sm text-gray-500 border-l border-gray-200 pl-4">
              <li className="hover:text-primary cursor-pointer border-l-2 border-transparent hover:border-primary -ml-[17px] pl-4 transition-all">
                The Psychology of the Hook
              </li>
              <li className="hover:text-primary cursor-pointer border-l-2 border-transparent hover:border-primary -ml-[17px] pl-4 transition-all">
                The 4-Step Formula
              </li>
              <li className="hover:text-primary cursor-pointer border-l-2 border-transparent hover:border-primary -ml-[17px] pl-4 transition-all">
                Why Specificity Wins
              </li>
              <li className="hover:text-primary cursor-pointer border-l-2 border-transparent hover:border-primary -ml-[17px] pl-4 transition-all">
                Conclusion
              </li>
            </ul>
          </div>
        </div>

        {/* 4. READ NEXT */}
        <div className="max-w-6xl mx-auto mt-12 md:mt-24 mb-10 border-t border-gray-100 pt-16">
          <h3 className="text-2xl font-bold text-[#0e1d34] mb-8">Read Next</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video bg-gray-200 rounded-xl mb-4 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(/blog${i + 1}.jpg)` }}
                  ></div>
                </div>
                <h4 className="font-bold text-[#0e1d34] group-hover:text-primary transition-colors">
                  5 Signs Your Referral Partner is a Keeper
                </h4>
              </div>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
