"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWordpress, FaReact, FaNodeJs } from "react-icons/fa";
import { SiFlutter, SiRedux } from "react-icons/si";
import type { LangProp } from '../../lib/props';
const TECH_STACK = [
  { name: "WordPress", Icon: FaWordpress },
  { name: "React.js", Icon: FaReact },
  { name: "Node.js", Icon: FaNodeJs },
  { name: "Flutter", Icon: SiFlutter },
  { name: "Redux", Icon: SiRedux },
];


const TOP_ROW = [
  { src: "images/project/image1.jpg", alt: "Project mockup 1" },
  { src: "images/project/image2.webp", alt: "Project mockup 2" },
  { src: "images/project/image3.webp", alt: "Project mockup 3" },
  { src: "images/project/image4.webp", alt: "Project mockup 4" },
];

const BOTTOM_ROW = [
  { src: "images/project/image5.avif", alt: "Project mockup 5" },
  { src: "images/project/image6.avif", alt: "Project mockup 6" },
  { src: "images/project/image7.jpg", alt: "Project mockup 7" },
  { src: "images/project/image1.jpg", alt: "Project mockup 8" },
];

export default function TechExpertiseScroll({ lang }: LangProp) {
  const sectionRef = useRef(null);
  const topTrackRef = useRef(null);
  const bottomTrackRef = useRef(null);
  const badgesRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const badges = badgesRef.current
        ? Array.from(badgesRef.current.children)
        : [];
      gsap.from(badges, {
        x: -60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: badgesRef.current,
          start: "top 85%",
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(Math.round(self.progress * 100)),
        },
      });

      tl.to(topTrackRef.current, { xPercent: -20, ease: "none" }, 0);
      tl.to(bottomTrackRef.current, { xPercent: 20, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full ">
      <section
        ref={sectionRef}
        className="relative w-full min-h-dvh sm:min-h-[80vh] md:min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden "
      >
        <div className="relative w-full py-2 sm:py-3">
          <div
            ref={topTrackRef}
            className="flex w-max gap-2 sm:gap-3 md:gap-4"
          >
            {[...TOP_ROW, ...TOP_ROW].map((img, i) => (
              <div
                key={`top-${i}`}
                className="h-[26vh] w-auto sm:h-[30vh] md:h-[34vh] lg:h-auto lg:w-[33vw] aspect-4/3 shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>


          <div
            ref={bottomTrackRef}
            className="flex w-max gap-2 sm:gap-3 mt-2 sm:mt-3 -translate-x-1/4"
          >
            {[...BOTTOM_ROW, ...BOTTOM_ROW].map((img, i) => (
              <div
                key={`bottom-${i}`}
                className="h-[26vh] w-auto sm:h-[30vh] md:h-[34vh] lg:h-auto lg:w-[33vw] aspect-4/3 shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>


          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="pointer-events-auto flex flex-col items-center justify-center rounded-full text-center"
              style={{
                backgroundColor: "#CBFB45",
                width: "clamp(7rem, 14vw, 11rem)",
                height: "clamp(7rem, 14vw, 11rem)",
              }}
            >
              <span className="text-black font-extrabold text-xs sm:text-sm md:text-base tracking-tight uppercase">
                Case Study
              </span>
              <span className="text-black font-extrabold text-lg sm:text-xl md:text-2xl mt-1">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}