"use client";

import { useLayoutEffect } from "react";

export default function HomeAnimations() {
  useLayoutEffect(() => {
    // reduce motion support
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    let ctx;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // HERO bottom image parallax
        const container = document.querySelector(
          '[data-gsap="hero-container"]',
        );
        const heroImg = document.querySelector('[data-gsap="hero-image"]');

        if (container && heroImg && window.innerWidth >= 768) {
          gsap.to(heroImg, {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        // Who can join parallax
        const joinContainer = document.querySelector(
          '[data-gsap="join-container"]',
        );
        const joinCard = document.querySelector('[data-gsap="join-card"]');

        if (joinContainer && joinCard && window.innerWidth >= 768) {
          gsap.to(joinCard, {
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: joinContainer,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        // Page-load reveal
        gsap.from(".page-load-y", {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        });

        // Fade up on scroll
        gsap.utils.toArray(".gsap-fade-up").forEach((item) => {
          gsap.fromTo(
            item,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 85%" },
            },
          );
        });

        // Avatars + reveal-img
        const tl = gsap.timeline();
        tl.from(
          ".gsap-avatar",
          {
            x: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          },
          0,
        );

        gsap.utils.toArray(".reveal-img").forEach((img, i) => {
          tl.fromTo(
            img,
            { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: 1.0,
              ease: "power3.out",
            },
            i === 0 ? "+=0.2" : "-=0.8",
          );
        });

        // WHY section (once)
        const whyBlock = document.querySelector('[data-gsap="why-trigger"]');
        if (whyBlock) {
          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: whyBlock,
                start: "top 70%",
                once: true,
              },
            })
            .from(".gsap-why", { opacity: 0, duration: 0.7 })
            .fromTo(
              ".gsap-heading",
              {
                x: 150,
                opacity: 0,
                scaleX: 1.4,
                transformOrigin: "right center",
              },
              { x: 0, opacity: 1, scaleX: 1, duration: 0.9 },
              "-=0.25",
            )
            .fromTo(
              ".gsap-para",
              {
                x: 120,
                opacity: 0,
                scaleX: 1.2,
                transformOrigin: "right center",
              },
              { x: 0, opacity: 1, scaleX: 1, duration: 0.85 },
              "-=0.5",
            );
        }

        // USP cards stagger
        const uspsWrap = document.querySelector('[data-gsap="usps-wrapper"]');
        if (uspsWrap) {
          gsap.fromTo(
            ".gsap-usps-card",
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.18,
              scrollTrigger: { trigger: uspsWrap, start: "top 80%" },
            },
          );
        }

        // Stats counter (if you enable later)
        gsap.utils.toArray(".stat-number").forEach((el) => {
          const endValue = parseFloat(el.getAttribute("data-val"));
          const suffix = el.getAttribute("data-suffix") || "";
          const tracker = { val: 0 };

          gsap.to(tracker, {
            val: endValue,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
            onUpdate: () => {
              el.textContent = Math.ceil(tracker.val) + suffix;
            },
          });
        });
      });
    })();

    return () => ctx?.revert?.();
  }, []);

  return null;
}
