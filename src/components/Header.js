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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

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

  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [2, 300], [0, -300]);

  // const opacity = useTransform(scrollY, [0, 100], [1, 1]);

  return (
    <motion.header
      // style={{ y }}
      className="header w-full bg-transparent border-b border-[#365a59] px-10 z-50"
    >
      {/* --- MAIN NAVBAR --- */}
      <div className="bg-transparent font-jakarta  sticky top-0 z-50 shadow-sm">
        <div className="  py-4 flex items-center justify-between ">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-[#0e1d34] flex items-center gap-2"
          >
            <img
              src="/logo2.png"
              alt="Bizzen logo"
              className="w-42 h-18 object-contain"
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
              <span className="relative z-10 flex items-center gap-2">
                Join Gy Rup <ArrowRight size={20} />
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
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6 text-[#0e1d34]" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="text-2xl font-bold text-[#0e1d34]">
                    Bizzen
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-gray-600 hover:text-primary border-b pb-2"
                    >
                      {item.name}
                    </Link>
                  ))}

                  <Button className="mt-4 bg-primary text-white w-full">
                    Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
