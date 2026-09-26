import Image from "next/image";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  span?: boolean;
};

const FEATURES: Feature[] = [
  {
    title: "Truly Collaborative",
    description:
      "Create teams and organize your designs into folders using project specs and insights.",
    icon: (
      <svg
        className="inline-flex fill-zinc-400"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path d="M17 9c.6 0 1 .4 1 1v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6c.6 0 1 .4 1 1s-.4 1-1 1H4v12h12v-6c0-.6.4-1 1-1Zm-.7-6.7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8Z" />
      </svg>
    ),
    image: "/images/feature-post-01.png",
    imageAlt: "Feature Post 01",
    imageWidth: 721,
    imageHeight: 280,
    span: true,
  },
  {
    title: "Advanced AI",
    description:
      "Generate images and explore new ways of presenting your designs with AI.",
    icon: (
      <svg
        className="inline-flex fill-zinc-400"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path d="m6.035 17.335-4-14c-.2-.8.5-1.5 1.3-1.3l14 4c.9.3 1 1.5.1 1.9l-6.6 2.9-2.8 6.6c-.5.9-1.7.8-2-.1Zm-1.5-12.8 2.7 9.5 1.9-4.4c.1-.2.3-.4.5-.5l4.4-1.9-9.5-2.7Z" />
      </svg>
    ),
    image: "/images/feature-post-02.png",
    imageAlt: "Feature Post 02",
    imageWidth: 342,
    imageHeight: 280,
  },
  {
    title: "Simple Snippets",
    description: "Get your scenes inside your projects using simple embed code/snippets.",
    icon: (
      <svg
        className="inline-flex fill-zinc-400"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path d="M8.974 16c-.3 0-.7-.2-.9-.5l-2.2-3.7-2.1 2.8c-.3.4-1 .5-1.4.2-.4-.3-.5-1-.2-1.4l3-4c.2-.3.5-.4.9-.4.3 0 .6.2.8.5l2 3.3 3.3-8.1c0-.4.4-.7.8-.7s.8.2.9.6l4 8c.2.5 0 1.1-.4 1.3-.5.2-1.1 0-1.3-.4l-3-6-3.2 7.9c-.2.4-.6.6-1 .6Z" />
      </svg>
    ),
    image: "/images/feature-post-03.png",
    imageAlt: "Feature Post 03",
    imageWidth: 342,
    imageHeight: 280,
  },
  {
    title: "Precise Activity",
    description: "Easily make drag and drop interactions without coding.",
    icon: (
      <svg
        className="inline-flex fill-zinc-400"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path d="M9.3 11.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0ZM9.3 17.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0ZM2.3 12.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0Z" />
      </svg>
    ),
    image: "/images/feature-post-04.png",
    imageAlt: "Feature Post 04",
    imageWidth: 342,
    imageHeight: 280,
  },
  {
    title: "Real-time Feedback",
    description: "Create tasks, projects, issues and more in just seconds.",
    icon: (
      <svg
        className="inline-flex fill-zinc-400"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path d="M16 2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h8.667l3.733 2.8A1 1 0 0 0 18 17V4a2 2 0 0 0-2-2Zm0 13-2.4-1.8a1 1 0 0 0-.6-.2H4V4h12v11Z" />
      </svg>
    ),
    image: "/images/feature-post-05.png",
    imageAlt: "Feature Post 05",
    imageWidth: 342,
    imageHeight: 280,
  },
];

export default function AiFeaturesSection() {
  return (
    <section>
      <div className="py-12 md:py-20">
        <div className="mx-auto container px-4 sm:px-6">
          <div className="relative mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="font-inter-tight mb-4 text-3xl font-bold text-zinc-900 md:text-4xl">
              AI-powered features and effects
            </h2>
            <p className="text-lg text-zinc-500">
              Whenever you are ready, just hit publish to turn your site sketches
              into an actual designs. No creating, no skills, no reshaping.
            </p>
          </div>

          <div className="mx-auto grid max-w-xs gap-8 sm:max-w-none sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:gap-8">
            {FEATURES.map((feature) => (
              <article
                key={feature.title}
                className={`flex flex-col rounded-lg border border-transparent
                  [background:linear-gradient(var(--color-white),var(--color-zinc-50))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box]
                  ${feature.span ? "sm:col-span-2" : ""}`}
              >
                <div className="flex grow flex-col p-5 pt-6">
                  <div className="mb-1 flex items-center space-x-3">
                    {feature.icon}
                    <h3 className="font-inter-tight font-semibold text-zinc-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="max-w-md grow text-sm text-zinc-500">
                    {feature.description}
                  </p>
                </div>
                <figure>
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    width={feature.imageWidth}
                    height={feature.imageHeight}
                    className="mx-auto h-70 object-cover object-left sm:h-auto sm:object-contain"
                  />
                </figure>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}