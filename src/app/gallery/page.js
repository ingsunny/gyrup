"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Filter, ArrowRight, ImageIcon, Video } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lightbox & Masonry Imports
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import VideoPlugin from "yet-another-react-lightbox/plugins/video";
import Header from "@/components/Header";

// --- MOCK DATA (Mix of Images & Videos) ---
// Note: In a real app, 'src' would be your image/video URL.
// For videos, we use a 'poster' image for the grid and 'sources' for the player.
const galleryItems = [
  {
    id: "1",
    type: "image",
    category: "Events",
    src: "gallery/event1.jpeg",
    width: 800,
    height: 600,
    title: "Annual Gala Night",
  },
  {
    id: "2",
    type: "video",
    category: "Networking",
    src: "gallery/gallery2.jpeg", // Poster image
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", // Example Video
    width: 1600,
    height: 900,
    title: "Chapter Launch Highlights",
  },
  {
    id: "3",
    type: "image",
    category: "Awards",
    src: "/gallery3.jpg",
    width: 800,
    height: 1200, // Portrait
    title: "Best Director Award",
  },
  {
    id: "4",
    type: "image",
    category: "Events",
    src: "gallery/event2.jpeg",
    width: 800,
    height: 600,
    title: "Panel Discussion",
  },
  {
    id: "5",
    type: "video",
    category: "Networking",
    src: "/gallery5-poster.jpg",
    videoSrc: "https://www.w3schools.com/html/movie.mp4",
    width: 800,
    height: 1200,
    title: "Member Testimonials",
  },
  {
    id: "6",
    type: "image",
    category: "Awards",
    src: "/gallery6.jpg",
    width: 1600,
    height: 900,
    title: "Excellence Certificate",
  },
  {
    id: "7",
    type: "image",
    category: "Events",
    src: "gallery/event3.jpeg",
    width: 800,
    height: 600,
    title: "Networking Dinner",
  },
];

const categories = ["All", "Events", "Networking", "Awards"];

export default function GalleryPage() {
  const mainRef = useRef(null);
  const [filter, setFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Filter Logic
  const filteredPhotos =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  // Map for Lightbox (Standardizing format)
  const lightboxSlides = filteredPhotos.map((item) =>
    item.type === "video"
      ? {
          type: "video",
          width: 1280,
          height: 720,
          poster: item.src,
          sources: [{ src: item.videoSrc, type: "video/mp4" }],
        }
      : { src: item.src }
  );

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      gsap.from(".hero-char", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      // 2. Filter Bar Pop
      gsap.from(".filter-bar", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
      });

      // 3. Gallery Grid Fade Up (Triggers when grid enters view)
      gsap.from(".gallery-container", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-container",
          start: "top 85%",
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={mainRef}
      className="font-jakarta bg-[#0b162a] min-h-screen text-white"
    >
      {/* =========================================
          SECTION 1: CINEMATIC HERO
      ========================================= */}
      <Header />

      {/* =========================================
          SECTION 2: SMART FILTERS
      ========================================= */}
      <section className="sticky top-28 md:top-32 z-40 py-4 mb-12">
        <div className="container mx-auto px-6 text-center">
          <div className="filter-bar inline-flex bg-white/5 border border-white/10 p-1.5 rounded-full backdrop-blur-xl shadow-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 sm:px-4 md:px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  filter === cat
                    ? "bg-primary text-black shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: MASONRY GALLERY
      ========================================= */}
      <section className="gallery-container pb-32 min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          {/* We use 'react-photo-album' for the complex masonry math.
            We pass a custom 'renderPhoto' function to handle our specialized video cards.
          */}
          <PhotoAlbum
            layout="masonry"
            photos={filteredPhotos}
            columns={(containerWidth) => {
              if (containerWidth < 640) return 1;
              if (containerWidth < 1024) return 2;
              return 3;
            }}
            spacing={24}
            onClick={({ index }) => setLightboxIndex(index)}
            renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
              <div
                style={{ ...wrapperStyle, position: "relative" }}
                className="group cursor-zoom-in overflow-hidden rounded-xl bg-gray-800 border border-white/5 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
              >
                {/* 1. The Image/Poster */}
                {renderDefaultPhoto({ wrapped: true })}

                {/* 2. Dark Gradient Overlay (Only visible on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* 3. Content Details (Slide up on hover) */}
                <div className="absolute bottom-0 left-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
                    {/* @ts-ignore */}
                    {photo.category}
                  </p>
                  <h3 className="text-white font-bold text-lg">
                    {/* @ts-ignore */}
                    {photo.title}
                  </h3>
                </div>

                {/* 4. Video Play Button (If Video) */}
                {/* @ts-ignore */}
                {photo.type === "video" && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                )}

                {/* 5. Image Icon (If Image) */}
                {/* @ts-ignore */}
                {photo.type === "image" && (
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon className="w-3 h-3" /> Photo
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </section>

      {/* =========================================
          SECTION 4: LIGHTBOX (The Theater)
      ========================================= */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
        plugins={[VideoPlugin]} // Enables video playback
        styles={{
          container: { backgroundColor: "rgba(11, 22, 42, 0.95)" },
        }}
        render={{
          slide: ({ slide, rect }) =>
            slide.type === "video" ? (
              <video
                width={rect.width}
                height={rect.height}
                controls
                autoPlay
                className="max-h-screen max-w-full outline-none shadow-2xl rounded-lg"
              >
                {/* @ts-ignore */}
                {slide.sources.map((source, i) => (
                  <source key={i} src={source.src} type={source.type} />
                ))}
              </video>
            ) : undefined,
        }}
      />

      {/* =========================================
          SECTION 5: FOOTER CTA
      ========================================= */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            See yourself here?
          </h2>
          <Button className="bg-primary text-black hover:bg-white text-lg px-10 py-6 rounded-none font-bold">
            Join the Next Event <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </main>
  );
}
