"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  Menu,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useState } from "react";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Chapters", href: "/chapters" },
    { name: "Membership", href: "/membership" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ];

  const mobileNavItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Chapters", href: "/chapters" },
    { name: "Membership", href: "/membership" },
    { name: "Resources", href: "/resources" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Meet Directors", href: "/team" },
    { name: "Contact", href: "/contact" },
  ];

  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [2, 300], [0, -300]);

  // const opacity = useTransform(scrollY, [0, 100], [1, 1]);

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // The "Buttery" delay between items
        delayChildren: 0.2,
      },
    },
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { ease: "easeOut", duration: 0.4 } },
  };

  return (
    <motion.header
      style={{ y }}
      className="header w-full bg-transparent border-b border-[#365a59] px-5 md:px-10 z-50"
    >
      {/* --- MAIN NAVBAR --- */}
      <div className="bg-transparent font-jakarta  sticky top-0 z-50 shadow-sm">
        <div className="py-2 md:py-4 flex items-center justify-between ">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-[#0e1d34] flex items-center gap-2"
          >
            <img
              src="/logo2.png"
              alt="Bizzen logo"
              className="w-32 md:w-42 h-18 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium  text-white hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Button
              className="
                relative overflow-hidden group
                bg-primary/90 text-black
                hover:text-white
                text-lg tracking-wide rounded-none
                !px-7 !py-7 mt-2 cursor-pointer
              "
            >
              <Link href="/join-gyrup">
                <span className="relative z-10 flex items-center gap-2">
                  Join Gyr Up <ArrowRight size={20} />
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
                  <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
                    {/* <!-- ACTUAL WAVY SHAPE --> */}
                    <path d="M0,0.7 C0.25,0.6 0.75,0.8 1,0.7 L1,1 L0,1 Z"></path>
                  </clipPath>
                </svg>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/10 text-white"
                >
                  <Menu className="w-8 h-8 scale-200" />
                </Button>
              </SheetTrigger>

              {/* 1. DARK THEME: bg-[#0b162a]
                  2. BORDER: border-white/10 for subtle edge
                  3. FULL WIDTH on small screens: w-full
              */}
              <SheetContent
                side="right"
                className="w-full sm:w-[400px] bg-[#0b162a] border-l border-white/10 p-0 text-white "
              >
                {/* Custom Header inside Sheet to hold the Close Button */}
                <div className="flex justify-between items-center py-2 md:py-4 px-5 md:px-10 border-b border-white/5">
                  {/* <span className="text-2xl font-bold tracking-tighter">
                    GYR<span className="text-primary">UP</span>
                  </span> */}
                  <Link
                    href="/"
                    className="text-2xl font-bold text-[#0e1d34] flex items-center gap-2"
                  >
                    <img
                      src="/logo2.png"
                      alt="Bizzen logo"
                      className="w-32 md:w-42 h-18 object-contain"
                    />
                  </Link>
                  {/* Using SheetClose for accessible closing */}
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                    >
                      <X className="w-8 h-8 scale-200" />
                    </Button>
                  </SheetClose>
                </div>

                {/* ANIMATED LIST CONTAINER */}
                <div className="h-full flex flex-col justify-between p-8 pb-12 overflow-y-auto">
                  {/* NAVIGATION LINKS */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.ul
                        variants={containerVars}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="flex flex-col gap-6 mb-6"
                      >
                        {mobileNavItems.map((item, i) => (
                          <motion.li key={item.name} variants={itemVars}>
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="group flex items-center justify-between text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 hover:from-white hover:to-primary transition-all duration-300"
                            >
                              {item.name}
                              {/* Hover Arrow */}
                              <ArrowRight className="w-6 h-6 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  {/* BOTTOM SECTION: Socials & Contact */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="space-y-6"
                  >
                    <Button className="w-full bg-primary text-black hover:bg-white font-bold h-12 text-lg rounded-none">
                      <Link href="/join-gyrup">
                        <span className="flex items-center gap-2">
                          Join Gyr Up <ArrowRight size={20} />
                        </span>
                      </Link>
                    </Button>

                    <div className="pt-8 border-t border-white/10">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
                        Connect with us
                      </p>
                      <div className="flex gap-4">
                        {[Facebook, Twitter, Linkedin, Instagram].map(
                          (Icon, idx) => (
                            <Link
                              key={idx}
                              href="#"
                              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-colors"
                            >
                              <Icon className="w-5 h-5" />
                            </Link>
                          )
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>info@gyrup.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>+91 99115 69713</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
