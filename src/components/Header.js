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
  SheetClose,
} from "@/components/ui/sheet";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Regions", href: "/regions" },
    { name: "Membership", href: "/membership" },
    { name: "Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
  ];

  const mobileNavItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Regions", href: "/regions" },
    { name: "Membership", href: "/membership" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-[#063231] border-b border-[#365a59] px-5 md:px-10 z-50">
      {/* --- MAIN NAVBAR --- */}
      <div className="font-jakarta">
        <div className="py-2 md:py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo2.png"
              alt="logo"
              width={180}
              height={70}
              sizes="(max-width: 768px) 128px, 180px"
              priority
              className="w-32 md:w-[180px] h-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-white hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link href="/join-gyrup">
              <Button
                className="
                  relative overflow-hidden group
                  bg-primary/90 text-black hover:text-white
                  text-lg tracking-wide rounded-none
                  !px-7 !py-7 mt-2 cursor-pointer
                "
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join GYR UP <ArrowRight size={20} />
                </span>

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
                />

                <svg className="hidden">
                  <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
                    <path d="M0,0.7 C0.25,0.6 0.75,0.8 1,0.7 L1,1 L0,1 Z" />
                  </clipPath>
                </svg>
              </Button>
            </Link>
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

              <SheetContent
                side="right"
                className="w-full sm:w-[400px] bg-[#0b162a] border-l border-white/10 p-0 text-white"
              >
                <div className="flex justify-between items-center py-2 md:py-4 px-5 md:px-10 border-b border-white/5">
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/logo2.png"
                      alt="logo mobile"
                      width={180}
                      height={70}
                      sizes="(max-width: 768px) 128px, 180px"
                      priority
                      className="w-32 md:w-[180px] h-auto object-contain"
                    />
                  </Link>

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

                <div className="h-full flex flex-col justify-between p-8 pb-12 overflow-y-auto">
                  <AnimatePresence>
                    {isOpen && (
                      <motion.ul
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.08,
                              delayChildren: 0.1,
                            },
                          },
                        }}
                        className="flex flex-col gap-6 mb-6"
                      >
                        {mobileNavItems.map((item) => (
                          <motion.li
                            key={item.name}
                            variants={{
                              hidden: { y: 16, opacity: 0 },
                              show: {
                                y: 0,
                                opacity: 1,
                                transition: { duration: 0.25 },
                              },
                            }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="group flex items-center justify-between text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 hover:from-white hover:to-primary transition-all duration-300"
                            >
                              {item.name}
                              <ArrowRight className="w-6 h-6 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  <div className="space-y-6">
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
                          ),
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
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
