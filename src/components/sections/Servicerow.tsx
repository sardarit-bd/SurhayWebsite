import { forwardRef, useRef } from "react";
import type { MouseEvent } from "react";
import type { ServiceItem } from "./Services.data";

interface ServiceRowProps {
  service: ServiceItem;
  isLast: boolean;
}

const DURATION_MS = 500;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

const ServiceRow = forwardRef<HTMLDivElement, ServiceRowProps>(
  ({ service, isLast }, ref) => {
    const { number, title, description, bullets, Icon, href } = service;

    const layerRef = useRef<HTMLSpanElement | null>(null);
    const originRef = useRef({ x: 0, y: 0 });

    const handleEnter = (e: MouseEvent<HTMLDivElement>) => {
      const layer = layerRef.current;
      if (!layer) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      originRef.current = { x, y };
      const radius = Math.ceil(
        Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y))
      );

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      layer.style.transition = "none";
      layer.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      void layer.offsetWidth;
      layer.style.transition = reduce
        ? "none"
        : `clip-path ${DURATION_MS}ms ${EASING}`;
      layer.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
    };

    const handleLeave = () => {
      const layer = layerRef.current;
      if (!layer) return;
      const { x, y } = originRef.current;
      layer.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    };

    return (
      <div
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={`group isolate relative grid grid-cols-1 sm:grid-cols-[auto_1fr] md:grid-cols-[70px_220px_1fr_90px] items-start md:items-center gap-4 md:gap-6 py-8 px-10 ${
          !isLast ? "border-b border-neutral-200" : ""
        }`}
      >
        <span
          ref={layerRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-accent-800"
          style={{ clipPath: "circle(0px at 50% 50%)" }}
        />

        <span className="text-sm text-neutral-500 font-medium transition-colors duration-300 group-hover:text-paper">
          {number}
        </span>

        <h3 className="text-xl md:text-2xl font-bold uppercase leading-tight text-neutral-900 transition-colors duration-300 group-hover:text-paper">
          {href ? (
            <a href={href} className="after:absolute after:inset-0 after:content-['']">
              {title[0]}
              <br />
              {title[1]}
            </a>
          ) : (
            <>
              {title[0]}
              <br />
              {title[1]}
            </>
          )}
        </h3>

        <div className="max-w-md">
          <p className="text-sm text-neutral-500 leading-relaxed transition-colors duration-300 group-hover:text-paper">
            {description}
          </p>
          {bullets.length > 0 && (
            <ul className="mt-2 space-y-1">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="text-sm text-neutral-700 flex gap-2 transition-colors duration-300 group-hover:text-paper"
                >
                  <span className="text-neutral-400 transition-colors duration-300 group-hover:text-paper">
                    +
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-start md:justify-end">
          <div className="w-16 h-16 rounded-full border border-neutral-300 flex items-center justify-center transition-colors duration-300 group-hover:border-paper">
            <Icon className="w-6 h-6 text-neutral-900 transition-colors duration-300 group-hover:text-paper" />
          </div>
        </div>
      </div>
    );
  }
);

ServiceRow.displayName = "ServiceRow";

export default ServiceRow;