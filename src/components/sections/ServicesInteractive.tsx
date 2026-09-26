"use client";

import { useState } from "react";

type ServiceItem = {
  id: string;
  label: string;
  image: string;
};

const SERVICES: ServiceItem[] = [
  { id: "branding", label: "Branding", image: "/images/project/image1.jpg" },
  { id: "digital", label: "Digital Products", image: "/images/project/image2.webp" },
  { id: "websites", label: "Websites", image: "/images/project/image3.webp" },
  { id: "development", label: "Development", image: "/images/project/image4.webp" },
  { id: "content", label: "Content", image: "/images/project/image5.avif" },
  { id: "ai", label: "Generative AI", image: "/images/project/image6.avif" },
];

export default function ServicesInteractive() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];

  return (
    <section
      id="services-interactive"
      className="w-full"
      style={{ paddingBlock: "var(--spacing-section)" }}
    >
      <div className="mx-auto container px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-center lg:gap-8">
          <div>
            <h2 className="font-display h3">What we build</h2>
            <p className="mt-4 max-w-sm text-mute">
              From first sketch to shipped product — a focused set of
              services covering brand, product, and engineering.
            </p>
          </div>

          <div
            className="relative order-first aspect-4/3 w-full overflow-hidden rounded-2xl border lg:order-0"
            style={{ borderColor: "var(--line)" }}
          >
            {SERVICES.map((service) => (
              <img
                key={service.id}
                src={service.image}
                alt=""
                aria-hidden="true"
                data-active={service.id === activeId ? "" : undefined}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out data-active:opacity-100"
              />
            ))}
          </div>

          <ul className="flex flex-col">
            {SERVICES.map((service, i) => (
              <li
                key={service.id}
                className="border-t last:border-b"
                style={{ borderColor: "var(--line)" }}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActiveId(service.id)}
                  onFocus={() => setActiveId(service.id)}
                  onClick={() => setActiveId(service.id)}
                  data-active={service.id === activeId ? "" : undefined}
                  className="font-display block w-full py-4 text-left text-lg font-semibold tracking-tight text-mute transition-colors duration-200 data-active:text-ink"
                >
                  {service.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}