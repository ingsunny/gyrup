"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ArrowUpRight,
  ArrowRight,
  Users,
  Contact,
} from "lucide-react";
import gsap from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. HERO ANIMATION
      gsap.from(".hero-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // 2. CONTACT CARDS STAGGER
      gsap.from(".contact-card", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        stagger: 0.15,
        ease: "power2.out",
      });

      // 3. FORM SLIDE UP
      gsap.from(".contact-form", {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById("contact-section");
    if (!el) return;

    // If using Lenis
    if (window.lenis) {
      window.lenis.scrollTo(el, {
        offset: -50,
        duration: 1.8,
        easing: (t) => 1 - Math.pow(1 - t, 3), // smooth cubic ease
      });
    } else {
      // Native smooth scroll fallback
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main ref={mainRef} className="font-jakarta bg-gray-50 min-h-screen">
      {/* =========================================
          SECTION 1: HEADER
      ========================================= */}
      <section className="bg-[#0e1d34]  relative overflow-hidden">
        <Header />
        <div className="pt-14 md:pt-24 pb-28 md:pb-32">
          {/* Decorative Circles */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
            <h1 className="hero-text text-4xl md:text-7xl font-bold text-white mb-6">
              Let’s Talk <span className="text-primary">Business.</span>
            </h1>
            <p className="hero-text text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              We’re here to help you scale. Reach out for membership inquiries,
              partnership opportunities, or general support.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: CONTENT GRID
      ========================================= */}
      <section id="contact-section" className="-mt-20 pb-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* LEFT COLUMN: INFO CARDS (Span 2) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Card 1: Phones */}
              <div className="contact-card bg-white p-8 rounded-2xl shadow-sm border border-gray-100 group hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0e1d34] mb-4">
                  Call Us Directly
                </h3>
                <div className="space-y-2">
                  <a
                    href="tel:+919873123396"
                    className="block text-gray-600 hover:text-primary font-medium transition-colors text-base md:text-lg"
                  >
                    9873123396
                  </a>
                  {/* <a
                    href="tel:+919973213369"
                    className="block text-gray-600 hover:text-primary font-medium transition-colors text-base md:text-lg"
                  >
                    +91 99732 13369
                  </a> */}
                </div>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/919873123396"
                  target="_blank"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              </div>

              {/* Card 2: Email & Address */}
              <div className="contact-card bg-[#0e1d34] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                {/* Email */}
                <div className="mb-8 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="font-bold">Email Support</span>
                  </div>
                  <a
                    href="mailto:membership@gyrup.com"
                    className="text-gray-300 hover:text-white transition-colors border-b border-gray-700 hover:border-white pb-0.5"
                  >
                    info@gyrupuniverse.com
                  </a>
                </div>

                {/* Address */}
                <div className="mb-8 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-bold">Headquarters</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    First & Second Floor T-1 Kailash Park,
                    <br />
                    Main Najafgarh Road Opp Metro Pillar No-328 Moti Nagar New
                    Delhi-110015
                  </p>
                </div>

                {/* Hours */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-bold">Office Hours</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Mon – Fri: 10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: FORM (Span 3) */}
            <div className="lg:col-span-3">
              <div className="contact-form bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 h-full">
                <h3 className="text-2xl font-bold text-[#0e1d34] mb-2">
                  Send us a Message
                </h3>
                <p className="text-gray-500 mb-8">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="h-12 bg-gray-50 border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+91 ..."
                        className="h-12 bg-gray-50 border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="h-12 bg-gray-50 border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Membership Inquiry / Partnership / Other"
                      className="h-12 bg-gray-50 border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      className="min-h-[150px] bg-gray-50 border-gray-200 resize-none"
                    />
                  </div>

                  <Button
                    className="
                relative w-full overflow-hidden group
                bg-primary text-black
                hover:text-white
                text-lg tracking-wide
                !px-7 !py-7 mt-2 cursor-pointer
              "
                  >
                    <span className="relative z-10 flex items-center gap-2 font-semibold">
                      Submit Application <Send size={20} />
                    </span>

                    {/* WAVY FILL */}
                    <span
                      className="
                  absolute inset-0 -z-0
                  before:absolute before:inset-0
                  before:bg-secondary
                  before:[clip-path:url(#wave-clip)]
                  before:translate-y-full
                  group-hover:before:translate-y-0
                  before:transition-transform before:duration-700 before:ease-in-out
                "
                    ></span>

                    {/* Hidden SVG wave definition */}
                    <svg className="hidden">
                      <clipPath
                        id="wave-clip"
                        clipPathUnits="objectBoundingBox"
                      >
                        {/* <!-- ACTUAL WAVY SHAPE --> */}
                        <path d="M0,0.7 C0.25,0.6 0.75,0.8 1,0.7 L1,1 L0,1 Z"></path>
                      </clipPath>
                    </svg>
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Optional: Map Strip (Visual Only) */}
          <div className="mt-12 w-full h-64 bg-gray-200 rounded-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
            {/* Replace src with your actual Google Maps Embed URL */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14003.983279486887!2d77.13817171082678!3d28.659843829256033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1764582953619!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded shadow-md font-bold text-[#0e1d34] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Locate Us
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#063231] overflow-hidden isolate">
        {/* 1. BACKGROUND TEXTURE (Grid Pattern) */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        {/* 2. GIANT OUTLINE TEXT (Depth) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 select-none">
          <h1
            className="text-[15vw] font-bold text-transparent leading-none opacity-10"
            style={{ WebkitTextStroke: "2px rgba(255,255,255, 0.1)" }}
          >
            GYR UP
          </h1>
        </div>

        {/* 3. GLOW BLOBS (Subtle Lighting) */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        {/* 4. MAIN CONTENT */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center gsap-fade-up">
          {/* Animated Badge */}
          <div className="inline-flex items-center mb-4 rounded-full bg-white/5 border border-white/10 text-secondary text-base md:text-lg font-bold tracking-widest uppercase backdrop-blur-md py-2 px-4 gap-2">
            <Contact className="w-5 h-5 text-secondary" />
            <span className="">Connect With Us</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Let{"'"}s Build Something{" "}
            <span className="text-primary">Extraordinary</span> Together
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-5xl mx-auto leading-relaxed">
            Tell us what you need, and we’ll make sure the right person from our
            team gets back to you.
          </p>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-6 w-full">
            <Button
              onClick={scrollToForm}
              className="
                      relative overflow-hidden group
                      bg-primary/90 text-black hover:text-white
                      text-xl tracking-wide rounded-none
                      !px-8 !py-8 md:scale-100 scale-85
                      flex items-center justify-center cursor-pointer
                    "
            >
              <span className="relative z-10 flex items-center gap-2">
                Get in Touch <ArrowRight size={20} />
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
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
