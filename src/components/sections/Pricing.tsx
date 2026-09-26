"use client";

import { useState } from "react";
import Image from "next/image";

/* ---------- Contacts slider ---------- */

const CONTACT_LABELS = ["1K", "5K", "10K", "15K", "1M"];

/* ---------- Pricing plans ---------- */

type PlanFeature = { label: string; tooltip: string };

// Shared across all three tiers — swap in real tooltip copy per plan if it differs.
const PLAN_FEATURES: PlanFeature[] = [
  { label: "Unlimited workspace boards", tooltip: "Create and organize as many boards as your team needs." },
  { label: "Unlimited viewers", tooltip: "Invite any number of read-only collaborators at no extra cost." },
  { label: "Unlimited project templates", tooltip: "Save and reuse layouts across every new project." },
  { label: "Change management", tooltip: "Track edits and roll back to any previous version." },
  { label: "Taxonomy development", tooltip: "Organize assets with custom tags and categories." },
  { label: "Customer success manager", tooltip: "Get a dedicated contact for onboarding and support." },
];

type Plan = {
  name: string;
  price: string;
  description: string;
  variant: "light" | "dark";
  ctaLabel: string;
};

const PLANS: Plan[] = [
  {
    name: "Essential",
    price: "29",
    description: "For power users who want access to creative features.",
    variant: "light",
    ctaLabel: "Try for Free",
  },
  {
    name: "Premium",
    price: "49",
    description: "For creative organizations that need full control & support.",
    variant: "dark",
    ctaLabel: "Try for Free",
  },
  {
    name: "Enterprise",
    price: "99",
    description: "For creative organizations that need full control & support.",
    variant: "light",
    ctaLabel: "Try for Free",
  },
];

function CheckIcon() {
  return (
    <svg className="mr-3 h-3 w-3 shrink-0 fill-emerald-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
    </svg>
  );
}

function FeatureItem({ feature, id }: { feature: PlanFeature; id: string }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="flex items-center">
      <CheckIcon />
      <div className="relative">
        <button
          type="button"
          className="block cursor-help text-left text-zinc-500 underline decoration-dotted underline-offset-4 decoration-zinc-300"
          aria-describedby={id}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        >
          {feature.label}
        </button>
        {open && (
          <div
            id={id}
            role="tooltip"
            className="absolute top-full left-0 z-10 mt-1 w-56 rounded-md bg-zinc-900 px-3 py-2 text-xs font-normal text-zinc-100 shadow-lg"
          >
            {feature.tooltip}
          </div>
        )}
      </div>
    </li>
  );
}

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  const isDark = plan.variant === "dark";

  return (
    <div className="h-full">
      <div
        className={
          isDark
            ? "relative flex h-full flex-col rounded-lg bg-zinc-800 p-6"
            : "relative flex h-full flex-col rounded-lg border border-transparent p-6 [background:linear-gradient(var(--color-zinc-50),var(--color-zinc-50))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box]"
        }
      >
        {isDark && (
          <Image
            src="/images/pricing-decoration.png"
            alt="Pricing decoration"
            aria-hidden="true"
            width={76}
            height={74}
            className="absolute -top-5 right-6 mix-blend-exclusion"
          />
        )}

        <div className="mb-4">
          <div className={`mb-1 text-lg font-semibold ${isDark ? "text-zinc-200" : "text-zinc-900"}`}>
            {plan.name}
          </div>
          <div className="font-inter-tight mb-2 inline-flex items-baseline">
            <span className={`text-2xl font-bold ${isDark ? "text-zinc-200" : "text-zinc-900"}`}>$</span>
            <span className={`text-3xl font-bold ${isDark ? "text-zinc-200" : "text-zinc-900"}`}>
              {plan.price}
            </span>
            <span className="font-medium text-zinc-500">/mo</span>
          </div>
          <div className="text-zinc-500">{plan.description}</div>
        </div>

        <div className="grow">
          <div className={`mb-4 text-sm font-medium ${isDark ? "text-zinc-200" : "text-zinc-900"}`}>
            Includes:
          </div>
          <ul className="grow space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            {PLAN_FEATURES.map((feature, i) => (
              <FeatureItem key={feature.label} feature={feature} id={`tooltip-${index}-${i}`} />
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <a
            href="#0"
            className={
              isDark
                ? "btn w-full bg-white text-zinc-600 shadow-sm hover:text-zinc-900"
                : "btn w-full bg-linear-to-r from-zinc-700 to-zinc-900 text-zinc-100 shadow-sm hover:from-zinc-900 hover:to-zinc-900"
            }
          >
            {plan.ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- FAQ accordion ---------- */

type Faq = { question: string; answer: string };

const FAQS: Faq[] = [
  {
    question: "Can I use the product for free?",
    answer:
      "Absolutely! Grey allows you to create as many commercial graphics/images as you like, for yourself or your clients.",
  },
  {
    question: "What payment methods can I use?",
    answer:
      "Absolutely! Grey allows you to create as many commercial graphics/images as you like, for yourself or your clients.",
  },
  {
    question: "Can I change from monthly to yearly billing?",
    answer:
      "Absolutely! Grey allows you to create as many commercial graphics/images as you like, for yourself or your clients.",
  },
  {
    question: "Can I use the tool for personal, client, and commercial projects?",
    answer:
      "Absolutely! Grey allows you to create as many commercial graphics/images as you like, for yourself or your clients.",
  },
  {
    question: "How can I ask other questions about pricing?",
    answer:
      "Absolutely! Grey allows you to create as many commercial graphics/images as you like, for yourself or your clients.",
  },
  {
    question: "Do you offer discount for students and no-profit companies?",
    answer:
      "Absolutely! Grey allows you to create as many commercial graphics/images as you like, for yourself or your clients.",
  },
];

function AccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}) {
  const panelId = `accordion-text-faqs-${index}`;
  const titleId = `accordion-title-faqs-${index}`;

  return (
    <div className="rounded-sm bg-zinc-100">
      <h2>
        <button
          type="button"
          id={titleId}
          className="font-inter-tight flex w-full items-center justify-between px-4 py-2.5 text-left font-medium text-zinc-800"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
        >
          <span>{faq.question}</span>
          <svg className="ml-8 shrink-0 fill-zinc-400" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <rect y="5" width="12" height="2" rx="1" className="origin-center transform transition duration-200 ease-out" />
            <rect
              y="5"
              width="12"
              height="2"
              rx="1"
              className={`origin-center transform transition duration-200 ease-out ${
                isOpen ? "rotate-180" : "rotate-90"
              }`}
            />
          </svg>
        </button>
      </h2>
      <div
        id={panelId}
        role="region"
        aria-labelledby={titleId}
        className={`grid overflow-hidden text-sm text-zinc-500 transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-3">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}


export default function PricingFaqSection() {
  const [contactsIndex, setContactsIndex] = useState(2); // 0-4, default "10K"
  const [openFaq, setOpenFaq] = useState<number | null>(3); // matches original default-open item

  const progress = `${(contactsIndex / (CONTACT_LABELS.length - 1)) * 100}%`;

  return (
    <section>
      <div className="py-12 md:py-20">
        <div className="mx-auto container px-4 sm:px-6">
          <div className="relative mx-auto max-w-3xl pb-12 text-center">
            <h2 className="font-inter-tight mb-4 text-3xl font-bold text-zinc-900 md:text-4xl">
              Start your journey today
            </h2>
            <p className="text-lg text-zinc-500">
              Start creating realtime design experiences for free. Upgrade for extra
              features and collaboration with your team.
            </p>
          </div>

          <div className="pb-12 md:pb-20">
            {/* Slider */}
            {/* <div className="mx-auto mb-12 max-w-sm space-y-3 lg:mb-16 lg:max-w-3xl">
        
              <div
                className="relative flex items-center"
                style={
                  {
                    "--progress": progress,
                    "--segments-width": "25%",
                  } as React.CSSProperties
                }
              >
                <div
                  aria-hidden="true"
                  className="absolute right-2.5 left-2.5 h-1.5 overflow-hidden rounded-full bg-zinc-200
                    before:absolute before:inset-0 before:bg-linear-to-r before:from-zinc-400 before:to-zinc-800
                    before:[mask-image:linear-gradient(to_right,var(--color-white),var(--color-white)_var(--progress),transparent_var(--progress))]
                    after:absolute after:inset-0
                    after:bg-[repeating-linear-gradient(to_right,transparent,transparent_calc(var(--segments-width)-1px),--theme(--color-white/.7)_calc(var(--segments-width)-1px),--theme(--color-white/.7)_calc(var(--segments-width)+1px))]"
                />
                <input
                  type="range"
                  min={0}
                  max={CONTACT_LABELS.length - 1}
                  step={1}
                  value={contactsIndex}
                  onChange={(e) => setContactsIndex(Number(e.target.value))}
                  aria-valuetext={`${CONTACT_LABELS[contactsIndex]} contacts/month`}
                  aria-label="Pricing Slider"
                  className="relative w-full cursor-pointer appearance-none bg-transparent focus:outline-hidden
                    [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm
                    [&::-moz-range-thumb]:focus-visible:ring-3 [&::-moz-range-thumb]:focus-visible:ring-zinc-300
                    [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm
                    [&::-webkit-slider-thumb]:focus-visible:ring-3 [&::-webkit-slider-thumb]:focus-visible:ring-zinc-300"
                />
              </div>
              <ul className="flex justify-between px-2.5 text-xs font-medium text-zinc-500">
                {CONTACT_LABELS.map((label) => (
                  <li key={label} className="relative">
                    <span className="absolute -translate-x-1/2">{label}</span>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Pricing cards */}
            <div className="mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
              {PLANS.map((plan, i) => (
                <PricingCard key={plan.name} plan={plan} index={i} />
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}