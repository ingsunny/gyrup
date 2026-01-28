"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  CheckCircle2,
  Clock,
  PhoneCall,
  Rocket,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Users,
} from "lucide-react";
import gsap from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { useSearchParams } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";

export default function JoinPage() {
  const searchParams = useSearchParams();
  const membershipClicked = searchParams.get("selected");
  const mainRef = useRef(null);
  const [fileSelected, setFileSelected] = useState([]);

  // turnstile
  const [captchaToken, setCaptchaToken] = useState(null);

  // Form State
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    businessname: "",
    category: "",
    turnover: "",
    years: "",
    cibil: "",
    email: "",
    phone: "",
    location: "",
    reason: "",
    membershipClicked: membershipClicked ? membershipClicked : null,
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { id, value } = e.target;

    // ---------- YEARS: max 2 digits ----------
    if (id === "years") {
      // allow empty
      if (value === "") {
        setFormData({ ...formData, years: "" });
        return;
      }

      // numbers only
      if (!/^\d+$/.test(value)) return;

      // max 2 digits
      if (value.length > 2) return;

      setFormData({ ...formData, years: value });
      return;
    } else if (id === "cibil") {
      // allow empty
      if (value === "") {
        setFormData({ ...formData, cibil: "" });
        return;
      }

      // numbers only
      if (!/^\d+$/.test(value)) return;

      // max 2 digits
      if (value.length > 3) return;

      setFormData({ ...formData, cibil: value });
      return;
    } else if (id === "phone") {
      // allow empty
      if (value === "") {
        setFormData({ ...formData, phone: "" });
        return;
      }

      // allow + only at start, digits after
      if (!/^\+?\d*$/.test(value)) return;

      // optional: limit length (example: 15 digits max international)
      if (value.replace("+", "").length > 15) return;

      setFormData({ ...formData, phone: value });
      return;
    } else if (id === "email") {
      if (value.length > 120) return;

      setFormData({ ...formData, email: value });
      return;
    } else if (id === "businessname") {
      // optional character restriction
      if (!/^[a-zA-Z0-9\s&.\-]*$/.test(value)) return;

      if (value.length > 80) return;

      setFormData({ ...formData, businessname: value });
      return;
    } else if (id === "fullname") {
      // optional character restriction
      if (!/^[a-zA-Z0-9\s&.\-]*$/.test(value)) return;

      if (value.length > 70) return;

      setFormData({ ...formData, fullname: value });
      return;
    }

    // ---------- DEFAULT ----------
    setFormData({ ...formData, [id]: value });
  };

  // Handle Select Change
  const handleSelectChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // captcha
      if (!captchaToken) {
        alert("Please verify that you are human.");
        return;
      }

      // ---------- FILE SIZE VALIDATION ----------
      for (const file of fileSelected) {
        if (file.size > MAX_FILE_SIZE) {
          alert(
            `File "${file.name}" exceeds 2MB limit. Please upload smaller files.`,
          );
          setLoading(false);
          return;
        }
      }

      const data = new FormData();
      // fromdata
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      // file data
      fileSelected.forEach((file) => {
        data.append("companyFiles", file);
      });

      data.append("cf_turnstile_token", captchaToken);

      const response = await fetch("/api/join", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Application Submitted Successfully! We will contact you soon.");
        setFormData({
          fullname: "",
          businessname: "",
          category: "",
          turnover: "",
          years: "",
          cibil: "",
          email: "",
          phone: "",
          location: "",
          reason: "",
        });
        setFileSelected([]);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error", error);
      alert("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // 2. Form Slide Up
      gsap.from(".application-form", {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // 3. Sidebar Timeline Stagger
      gsap.from(".timeline-item", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById("form-section");
    if (!el) return;

    if (window.lenis) {
      window.lenis.scrollTo(el, {
        offset: -50,
        duration: 1.8,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main ref={mainRef} className="font-jakarta min-h-screen">
      {/* =========================================
          SECTION 1: HERO HEADER
      ========================================= */}
      <section className="bg-[#0e1d34] text-white relative overflow-hidden">
        <Header />

        <div className="pt-14 md:pt-24 pb-16 md:pb-32s">
          {/* Abstract Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="">
              <div className="hero-text inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-1 rounded-full text-primary text-sm md:text-lg  font-bold tracking-[0.2rem] uppercase mb-6">
                <ShieldCheck className="w-4 h-4" /> Application Portal
              </div>
              <h1 className="hero-text text-4xl md:text-7xl lg:text-8xl font-bold mb-6">
                Start Your Journey to <br />
                <span className="text-primary">Exponential Growth.</span>
              </h1>
              <p className="hero-text text-gray-300 text-lg md:text-xl max-w-3xl">
                Complete the form below to apply for membership. Our team
                reviews every application to ensure the integrity of the
                network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: FORM & PROCESS
      ========================================= */}
      <section
        id="form-section"
        className="pt-16 pb-22 bg-cover relative z-20"
        style={{
          backgroundImage: "url('/service-bg.png')",
        }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* LEFT: THE FORM */}
            <div className="w-full lg:w-2/3 application-form bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
              <h2 className="text-2xl font-bold text-[#0e1d34] mb-8 border-b pb-4">
                Membership Application
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                      id="fullname"
                      required
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="bg-gray-50 border-gray-200 focus:ring-primary h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessname">Business Name</Label>
                    <Input
                      id="businessname"
                      required
                      value={formData.businessname}
                      onChange={handleChange}
                      placeholder="Acme Solutions Pvt Ltd"
                      className="bg-gray-50 border-gray-200 focus:ring-primary h-12"
                    />
                  </div>
                </div>

                {/* Row 2: Category & Turnover */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Business Category</Label>
                    <Select
                      onValueChange={(val) =>
                        handleSelectChange("category", val)
                      }
                    >
                      <SelectTrigger className="bg-gray-50 border-gray-200 h-12">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent
                        onWheelCapture={(e) => e.stopPropagation()}
                        className="
                              max-h-72 
                              overflow-y-auto 
                              scroll-smooth
                              rounded-xl
                              border border-gray-200
                              bg-white
                              shadow-xl

                              [&::-webkit-scrollbar]:w-2
                              [&::-webkit-scrollbar-track]:bg-transparent
                              [&::-webkit-scrollbar-thumb]:bg-gray-300
                              hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
                          "
                      >
                        <SelectItem value="manufacturing">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="services">
                          Services / Consulting
                        </SelectItem>
                        <SelectItem value="retail">Retail / Trading</SelectItem>
                        <SelectItem value="tech">
                          Technology / IT / SaaS
                        </SelectItem>
                        <SelectItem value="realestate">
                          Real Estate & Construction
                        </SelectItem>

                        <SelectItem value="finance">
                          Finance / Accounting / Insurance
                        </SelectItem>
                        <SelectItem value="marketing">
                          Marketing / Advertising / Media
                        </SelectItem>
                        <SelectItem value="ecommerce">
                          E-commerce / D2C Brands
                        </SelectItem>
                        <SelectItem value="education">
                          Education / Coaching / Training
                        </SelectItem>
                        <SelectItem value="healthcare">
                          Healthcare / Pharma / Wellness
                        </SelectItem>

                        <SelectItem value="hospitality">
                          Hospitality / Travel / Tourism
                        </SelectItem>
                        <SelectItem value="food">
                          Food / Restaurant / Cloud Kitchen
                        </SelectItem>
                        <SelectItem value="logistics">
                          Logistics / Transport / Supply Chain
                        </SelectItem>
                        <SelectItem value="agriculture">
                          Agriculture / AgriTech
                        </SelectItem>
                        <SelectItem value="energy">
                          Energy / Renewable / Utilities
                        </SelectItem>

                        <SelectItem value="legal">
                          Legal / Compliance / Company Services
                        </SelectItem>
                        <SelectItem value="importexport">
                          Import / Export
                        </SelectItem>
                        <SelectItem value="textile">
                          Textile / Apparel / Fashion
                        </SelectItem>
                        <SelectItem value="creative">
                          Creative / Design / Content
                        </SelectItem>
                        <SelectItem value="freelancer">
                          Freelancer / Independent Professional
                        </SelectItem>

                        <SelectItem value="startup">
                          Startup / Founder
                        </SelectItem>
                        <SelectItem value="investor">
                          Investor / Angel / VC
                        </SelectItem>
                        <SelectItem value="trader">
                          Stock / Crypto / Commodity Trader
                        </SelectItem>

                        <SelectItem value="other">
                          Other / Multiple Businesses
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="turnover">Annual Turnover (Last FY)</Label>
                    <Input
                      id="turnover"
                      required
                      value={formData.turnover}
                      onChange={handleChange}
                      placeholder="e.g. ₹2 Cr"
                      className="bg-gray-50 border-gray-200 focus:ring-primary h-12"
                    />
                  </div>
                </div>

                {/* Row 3: Years & CIBIL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="years">Years in Business</Label>
                    <Input
                      id="years"
                      type="number"
                      maxLength={2}
                      value={formData.years}
                      onChange={handleChange}
                      placeholder="5"
                      className="bg-gray-50 border-gray-200 focus:ring-primary h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cibil">CIBIL Score (Approx)</Label>
                    <Input
                      id="cibil"
                      type="number"
                      value={formData.cibil}
                      onChange={handleChange}
                      placeholder="e.g. 750"
                      className="bg-gray-50 border-gray-200 focus:ring-primary h-12"
                    />
                  </div>
                </div>

                {/* Row 4: Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="bg-gray-50 border-gray-200 focus:ring-primary h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="bg-gray-50 border-gray-200 focus:ring-primary h-12"
                    />
                  </div>
                </div>

                {/* Row 5: Location */}
                <div className="space-y-2">
                  <Label>Preferred Chapter / City</Label>
                  <Select
                    onValueChange={(val) => handleSelectChange("location", val)}
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 h-12">
                      <SelectValue placeholder="Select a Location" />
                    </SelectTrigger>
                    <SelectContent
                      onWheelCapture={(e) => e.stopPropagation()}
                      className="max-h-72 overflow-y-auto overscroll-contain"
                    >
                      {/* NCR */}
                      <SelectItem value="delhi">New Delhi</SelectItem>
                      <SelectItem value="noida">
                        Noida / Greater Noida
                      </SelectItem>
                      <SelectItem value="gurgaon">Gurgaon</SelectItem>
                      <SelectItem value="faridabad">Faridabad</SelectItem>
                      <SelectItem value="ghaziabad">Ghaziabad</SelectItem>

                      {/* Maharashtra */}
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="nagpur">Nagpur</SelectItem>
                      <SelectItem value="nashik">Nashik</SelectItem>

                      {/* Karnataka */}
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="mysore">Mysuru</SelectItem>
                      <SelectItem value="hubli">Hubli–Dharwad</SelectItem>

                      {/* Telangana */}
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>

                      {/* Tamil Nadu */}
                      <SelectItem value="chennai">Chennai</SelectItem>
                      <SelectItem value="coimbatore">Coimbatore</SelectItem>
                      <SelectItem value="madurai">Madurai</SelectItem>

                      {/* Gujarat */}
                      <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                      <SelectItem value="surat">Surat</SelectItem>
                      <SelectItem value="vadodara">Vadodara</SelectItem>
                      <SelectItem value="rajkot">Rajkot</SelectItem>

                      {/* Rajasthan */}
                      <SelectItem value="jaipur">Jaipur</SelectItem>
                      <SelectItem value="udaipur">Udaipur</SelectItem>
                      <SelectItem value="jodhpur">Jodhpur</SelectItem>

                      {/* MP */}
                      <SelectItem value="indore">Indore</SelectItem>
                      <SelectItem value="bhopal">Bhopal</SelectItem>

                      {/* UP */}
                      <SelectItem value="lucknow">Lucknow</SelectItem>
                      <SelectItem value="kanpur">Kanpur</SelectItem>
                      <SelectItem value="agra">Agra</SelectItem>
                      <SelectItem value="varanasi">Varanasi</SelectItem>

                      {/* East */}
                      <SelectItem value="kolkata">Kolkata</SelectItem>
                      <SelectItem value="bhubaneswar">Bhubaneswar</SelectItem>
                      <SelectItem value="patna">Patna</SelectItem>

                      {/* South */}
                      <SelectItem value="kochi">Kochi</SelectItem>
                      <SelectItem value="trivandrum">Trivandrum</SelectItem>
                      <SelectItem value="trichy">Trichy</SelectItem>

                      {/* North */}
                      <SelectItem value="chandigarh">Chandigarh</SelectItem>
                      <SelectItem value="amritsar">Amritsar</SelectItem>
                      <SelectItem value="ludhiana">Ludhiana</SelectItem>

                      {/* Others */}
                      <SelectItem value="remote">
                        Remote / Online Chapter
                      </SelectItem>
                      <SelectItem value="other">Other City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Row 6: The "Why" */}
                <div className="space-y-2">
                  <Label htmlFor="reason">
                    Why do you want to join GYR UP?
                  </Label>
                  <Textarea
                    id="reason"
                    required
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Tell us about your growth goals..."
                    className="bg-gray-50 border-gray-200 focus:ring-primary min-h-[100px]"
                  />
                </div>

                {/* Row 7: File Upload */}
                <div className="space-y-2">
                  <Label>Identity & Business Proof Documents (Optional)</Label>
                  <input
                    type="file"
                    id="companyFiles"
                    multiple
                    name="companyFiles"
                    accept=".pdf, .jpg, .jpeg, .png" // <--- ADD THIS
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      // Optional: Add a check here immediately to warn user if they picked > 5 files
                      if (files.length > 5) {
                        alert("Maximum 5 files allowed");
                        return;
                      }
                      setFileSelected(files);
                    }}
                  />

                  <div
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                      fileSelected?.length
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() =>
                      document.getElementById("companyFiles")?.click()
                    }
                  >
                    {fileSelected?.length ? (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
                        <p className="text-sm text-gray-700 font-medium">
                          {fileSelected.length} file(s) selected
                        </p>
                        <ul className="mt-2 text-xs text-gray-500">
                          {fileSelected.map((f, i) => (
                            <li key={i}>{f.name}</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          Click to upload Company Profile or GST Certificate
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <p className=" text-xs text-red-500 text-center leading-relaxed">
                  Accepted formats:{" "}
                  <span className="font-medium">PDF, JPG, JPEG, PNG</span>{" "}
                  &nbsp;&nbsp;|&nbsp;&nbsp; Maximum{" "}
                  <span className="font-medium">5 files</span>, each file up to{" "}
                  <span className="font-medium">2MB</span>
                </p>

                <div className="">
                  <Turnstile
                    siteKey="0x4AAAAAACU3xa_c2R9lsOZK"
                    onSuccess={(token) => {
                      setCaptchaToken(token);
                    }}
                    onExpire={() => {
                      setCaptchaToken(null);
                    }}
                    options={{
                      theme: "light",
                    }}
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="
                relative w-full overflow-hidden group
                bg-primary text-black
                hover:text-white
                text-lg tracking-wide
                !px-7 !py-7  cursor-pointer
              "
                  >
                    <span className="relative z-10 flex items-center gap-2 font-semibold">
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin w-5 h-5" />{" "}
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Application <ArrowRight size={20} />
                        </>
                      )}
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
                        <path d="M0,0.7 C0.25,0.6 0.75,0.8 1,0.7 L1,1 L0,1 Z"></path>
                      </clipPath>
                    </svg>
                  </Button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    By submitting, you agree to our Terms of Service and Privacy
                    Policy.
                  </p>
                </div>
              </form>
            </div>

            {/* RIGHT: PROCESS SIDEBAR (Sticky) */}
            <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
              <div className="bg-[#0e1d34] text-white rounded-2xl p-8 shadow-2xl border border-white/10">
                <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">
                  What Happens Next?
                </h3>

                <div className="space-y-8 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-white/10"></div>

                  {/* Step 1 */}
                  <div className="timeline-item flex gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0 border-4 border-[#0e1d34]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Application Review</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Our compliance team reviews your data within 24-48
                        hours.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="timeline-item flex gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center shrink-0 border-4 border-[#0e1d34]">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Director Call</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        A brief intro call with the Chapter Director to align
                        goals.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="timeline-item flex gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 border-4 border-[#0e1d34] text-black">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Onboarding</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Welcome kit, profile setup, and your first meeting
                        invitation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-green-500 w-5 h-5" />
                    <span className="text-sm text-gray-300">
                      Your data is encrypted & secure.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        title="GYR UP International – FAQs"
        highlight="Join GYR UP · FAQ"
      />

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
          <div className="inline-flex flex-col md:flex-row items-center mb-4 rounded-full bg-white/5 border border-white/10 text-secondary text-base md:text-lg font-bold tracking-widest uppercase backdrop-blur-md py-2 px-4 gap-2">
            <Users className="w-5 h-5 text-secondary" />
            <span className="">The Growth Acceleration Network</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Join India{"'"}s Most Ambitious{" "}
            <span className="text-primary">Circle</span> of Growth-Driven
            Entrepreneurs
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-5xl mx-auto leading-relaxed">
            Step into a high-trust business ecosystem built for founders,
            decision-makers, and leaders who don’t settle for average. GYR UP
            connects you with verified entrepreneurs, powerful opportunities,
            strategic collaborations, and a culture of ethical growth.
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            This is where the next level begins — if you’re ready to rise with
            us.
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
                Continue Your Application <ArrowRight size={20} />
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
