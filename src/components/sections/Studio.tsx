"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FiPlay } from "react-icons/fi";
import { t, withBase } from "../../i18n/utils";
import type { Lang, UiKey } from "../../i18n/ui";
import type { LangProp } from "../../lib/props";

export default function Studio({ lang }: LangProp) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const width = useTransform(scrollYProgress, [0.1, 0.45], ["60%", "100%"]);
  const height = useTransform(scrollYProgress, [0.1, 0.45], ["80vh", "100vh"]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0.1, 0.45],
    ["0px", "0px"],
  );
  const scale = useTransform(scrollYProgress, [0.1, 0.45], [0.9, 1]);
  const toggleAudio = () => {
    setIsPlaying((prev) => {
      const nextState = !prev;
      if (videoRef.current) {
        videoRef.current.muted = !nextState;
      }
      return nextState;
    });
  };

  return (
    <>
      <section className="bg-paper pt-section text-ink">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14 md:mb-20">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <h2 className="h2 lg:col-span-7">
                {t("studio.title" as UiKey, lang)}
              </h2>
              <p className="lead max-w-md text-mute lg:col-span-5 lg:justify-self-end">
                {t("studio.sub" as UiKey, lang)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={containerRef} className="relative w-full h-[170vh] z-60">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-60">
          <motion.div
            style={{
              width,
              height,
              scale,
              borderRadius,
            }}
            onClick={toggleAudio}
            className="relative overflow-hidden bg-slate-950 transition-all duration-75 ease-out cursor-pointer group"
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={!isPlaying}
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={withBase("/reel.mp4")} type="video/mp4" />
            </video>

            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-black/20 backdrop-blur-[2px]">
                <div className="relative flex items-center justify-center size-28 sm:size-32 md:size-36 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-2xl text-white transition-transform duration-300 group-hover:scale-110">
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full animate-spin [animation-duration:10s]"
                  >
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[8.5px] font-bold uppercase tracking-[2px] fill-white">
                      <textPath href="#circlePath" startOffset="0%">
                        {t("showreel.play" as UiKey, lang)}
                      </textPath>
                    </text>
                  </svg>

                  <div className="size-11 sm:size-12 md:size-14 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg">
                    <FiPlay className="text-xl md:text-2xl ml-1" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}