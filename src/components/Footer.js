import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#063231] text-white relative overflow-hidden font-jakarta pt-16 md:pt-20 pb-10 border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* COLUMN 1: BRAND */}
          <div className="space-y-5 md:space-y-6">
            <Link href="/" className="inline-block">
              <img
                src="/logo2.png"
                alt="Bizzen logo"
                className="w-32 md:w-42 h-18 object-contain"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed text-base md:text-lg">
              Empowering businesses through verified referrals and ethical
              networking. Join the elite community of growth-driven
              entrepreneurs.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span> Quick
              Links
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {[
                "Home",
                "About",
                "Chapters",
                "Membership",
                "Resources",
                "Contact",
                "Testimonials",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item == "Home" ? "" : item.toLowerCase()}`}
                    className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-2 group text-base md:text-lg"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-5 transition-all duration-300 text-secondary">
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CONTACT INFO */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span> Contact
              Us
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-base md:text-lg text-gray-400">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>
                  First & Second Floor T-1 Kailash Park,
                  <br />
                  Main Najafgarh Road Opp Metro Pillar No-328 Moti Nagar New
                  Delhi-110015
                </span>
              </li>
              <li className="flex items-center gap-4 text-base md:text-lg text-gray-400">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a
                  href="mailto:info@gyrupuniverse.com"
                  className="hover:text-white transition-colors"
                >
                  info@gyrupuniverse.com
                </a>
              </li>
              <li className="flex items-start gap-4 text-base md:text-lg text-gray-400">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919873123396"
                    className="hover:text-white transition-colors"
                  >
                    +91 98731 23396
                  </a>
                  {/* <a
                    href="tel:+919973213369"
                    className="hover:text-white transition-colors"
                  >
                    +91 99732 13369
                  </a> */}
                </div>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER (Optional but Sexy) */}
          <div className="bg-[#083f3f] p-6 rounded-none border border-white/5">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
              Weekly Insights
            </h3>
            <p className="text-xs md:text-sm text-gray-400 mb-4">
              Get the latest business growth strategies.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-[#063231] border border-white/10 rounded px-3 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />

              <Button
                className="
      relative overflow-hidden group
      w-full bg-primary text-black hover:text-white
      text-base md:text-lg tracking-wide rounded-none
      !px-8 !py-3 md:!py-5
      flex items-center justify-center mt-2 cursor-pointer
    "
              >
                <span className="relative z-10 flex items-center gap-2">
                  Subscribe <Send className="w-3 h-3 ml-2" />
                </span>

                {/* WAVY FILL */}
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

                {/* Wave definition */}
                <svg className="hidden">
                  <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
                    <path d="M0,0.7 C0.25,0.6 0.75,0.8 1,0.7 L1,1 L0,1 Z"></path>
                  </clipPath>
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear}{" "}
            <span className="text-white font-semibold">GYR UP</span>. All Rights
            Reserved.
          </p>
          <div className="flex gap-6 text-xs md:text-sm text-gray-500">
            <Link
              href="/refund-policy"
              className="hover:text-primary transition-colors"
            >
              Refund Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
