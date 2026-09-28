"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiPause, FiMenu, FiX } from "react-icons/fi";
import gsap from "gsap";

const NAV_LINKS = ["Services", "Industries", "Projects", "process", "About Us"];

const SCROLL_THRESHOLD = 24;

function NavLink({
  label,
  scrolled,
  className = "",
  onClick,
}: {
  label: string;
  scrolled: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href="#"
      onClick={onClick}
      className={`transition-colors duration-200 ${
        scrolled
          ? "text-neutral-700 hover:text-neutral-950"
          : "text-white/90 hover:text-white"
      } ${className}`}
    >
      {label}
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      timelineRef.current = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(
          overlayRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4 }
        )
        .fromTo(
          ".mobile-nav-link",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 },
          "-=0.2"
        );
    }, overlayRef);

    return () => ctx.revert();
  }, []);


  useEffect(() => {
    if (!timelineRef.current) return;
    if (menuOpen) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [menuOpen]);


  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? " bg-[#efe9e0]/95 backdrop-blur-sm shadow"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <a href="/" className="flex shrink-0 items-center font-sans text-lg sm:text-xl">
          <span
            className={`font-bold transition-colors duration-300 ${
              scrolled ? "text-neutral-900" : "text-white"
            }`}
          >
            Surhay
          </span>
          <span className="mx-[0.15em] text-teal-600">•</span>
          <span
            className={`font-normal transition-colors duration-300 ${
              scrolled ? "text-neutral-500" : "text-white/80"
            }`}
          >
            Design
          </span>
        </a>


        <nav className="hidden items-center gap-8 font-sans text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link} label={link} scrolled={scrolled} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#"
            className="rounded-md bg-teal-700 px-4 py-2.5 font-sans text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-800"
          >
            Request website
          </a>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className={`relative z-50 flex items-center justify-center text-xl transition-colors duration-300 md:hidden ${
            menuOpen ? "text-white" : scrolled ? "text-neutral-900" : "text-white"
          }`}
        >
          {menuOpen ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
        </button>
      </div>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 flex h-dvh w-full flex-col overflow-y-auto bg-[#1c1410] px-5 pb-10 pt-28 sm:px-8 md:hidden"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <nav className="flex flex-1 flex-col justify-center gap-7 font-sans">
          {NAV_LINKS.map((link) => (
            <div key={link} className="mobile-nav-link overflow-hidden">
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-medium text-white/90 transition-colors duration-200 hover:text-white"
              >
                {link}
              </a>
            </div>
          ))}
        </nav>

        <div className="mobile-nav-link mt-auto flex items-center gap-3 pt-8">
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="flex-1 rounded-md bg-teal-700 px-4 py-3 text-center font-sans text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-800"
          >
            Request website
          </a>
        </div>
      </div>
    </header>
  );
}