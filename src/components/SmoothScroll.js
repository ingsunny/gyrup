"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // old settings
    // const lenis = new Lenis({
    //   smooth: true,
    //   lerp: 0.1, // smoothness
    //   duration: 0.2, // speed of ease
    //   wheelMultiplier: 1, // how fast scroll wheel moves
    //   gestureOrientation: "vertical",
    //   infinite: false,
    // });

    // Minimal softening
    // const lenis = new Lenis({
    //   smooth: true,
    //   lerp: 0.15,
    //   wheelMultiplier: 1.1,
    //   touchMultiplier: 1.3,
    //   duration: 1.0,
    //   gestureOrientation: "vertical",
    // });

    //  Story telling scroll
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.04,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      duration: 1.8,
      gestureOrientation: "vertical",
    });

    // Balanced storytelling scroll
    // const lenis = new Lenis({
    //   smooth: true,
    //   lerp: 0.065, // Faster response, less drag
    //   wheelMultiplier: 1.15, // Slightly faster scroll from mouse
    //   touchMultiplier: 1.3, // Faster on touch devices
    //   duration: 1.25, // Shorter animation duration → faster feel
    //   gestureOrientation: "vertical",
    // });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
