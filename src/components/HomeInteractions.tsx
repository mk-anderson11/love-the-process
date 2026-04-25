"use client";

import { useEffect } from "react";

/**
 * Wires up the three interactive bits from the original landing page:
 *   1. Reveal-on-scroll for .reveal elements
 *   2. Counter animation for .stat-n elements
 *   3. Radial mouse-glow hover on .module-card
 *
 * Mounted once at the bottom of the home page. No JSX, side-effects only.
 */
export function HomeInteractions() {
  useEffect(() => {
    // ── 1. Reveal on scroll ──
    const revealEls = document.querySelectorAll<HTMLElement>(".reveal");
    const ro = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            ro.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    revealEls.forEach((el) => ro.observe(el));

    // ── 2. Counter animation ──
    function countUp(el: HTMLElement, target: number, duration = 1800) {
      let current = 0;
      const step = target / (duration / 16);
      function tick() {
        current += step;
        if (current < target) {
          el.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(tick);
        } else {
          el.textContent = target.toLocaleString();
        }
      }
      requestAnimationFrame(tick);
    }
    const statNums = document.querySelectorAll<HTMLElement>(".stat-n");
    const so = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.target instanceof HTMLElement) {
            const target = parseInt(e.target.dataset.target ?? "0", 10);
            countUp(e.target, target);
            so.unobserve(e.target);
          }
        }
      },
      { threshold: 0.5 },
    );
    statNums.forEach((el) => so.observe(el));

    // ── 3. Module card radial hover glow ──
    const cards = document.querySelectorAll<HTMLElement>(".module-card");
    const moveHandlers = new Map<HTMLElement, (e: MouseEvent) => void>();
    const leaveHandlers = new Map<HTMLElement, () => void>();
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (((e.clientX - r.left) / r.width) * 100).toFixed(1);
        const y = (((e.clientY - r.top) / r.height) * 100).toFixed(1);
        card.style.background = `radial-gradient(circle at ${x}% ${y}%, #D0DCF0 0%, #EDE6D8 60%)`;
      };
      const onLeave = () => {
        card.style.background = "";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      moveHandlers.set(card, onMove);
      leaveHandlers.set(card, onLeave);
    });

    return () => {
      ro.disconnect();
      so.disconnect();
      cards.forEach((card) => {
        const onMove = moveHandlers.get(card);
        const onLeave = leaveHandlers.get(card);
        if (onMove) card.removeEventListener("mousemove", onMove);
        if (onLeave) card.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return null;
}
