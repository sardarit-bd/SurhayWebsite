import { forwardRef } from "react";
import type { ServiceItem } from "./Services.data";

interface ServiceRowProps {
  service: ServiceItem;
  isLast: boolean;
}

/**
 * A single numbered service row: number / title / description+bullets / icon.
 * Ref is forwarded so the parent can register it with GSAP ScrollTrigger.
 */
const ServiceRow = forwardRef<HTMLDivElement, ServiceRowProps>(
  ({ service, isLast }, ref) => {
    const { number, title, description, bullets, Icon } = service;

    return (
      <div
        ref={ref}
        className={`grid grid-cols-1 sm:grid-cols-[auto_1fr] md:grid-cols-[70px_220px_1fr_90px] items-start md:items-center gap-4 md:gap-6 py-8 ${
          !isLast ? "border-b border-neutral-200" : ""
        }`}
      >

        <span className="text-sm text-neutral-500 font-medium">{number}</span>

        <h3 className="text-xl md:text-2xl font-bold uppercase leading-tight text-neutral-900">
          {title[0]}
          <br />
          {title[1]}
        </h3>

        <div className="max-w-md">
          <p className="text-sm text-neutral-500 leading-relaxed">
            {description}
          </p>
          {bullets.length > 0 && (
            <ul className="mt-2 space-y-1">
              {bullets.map((bullet) => (
                <li key={bullet} className="text-sm text-neutral-700 flex gap-2">
                  <span className="text-neutral-400">+</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Icon */}
        <div className="flex justify-start md:justify-end">
          <div className="w-16 h-16 rounded-full border border-neutral-300 flex items-center justify-center">
            <Icon className="w-6 h-6 text-neutral-900" />
          </div>
        </div>
      </div>
    );
  }
);

ServiceRow.displayName = "ServiceRow";

export default ServiceRow;