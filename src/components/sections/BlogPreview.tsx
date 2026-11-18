import { getCollection } from "../../lib/content";
import type { BlogData } from "../../content.config";
import { t, path, splitId, formatDate, readingTime } from "../../i18n/utils";
import type { UiKey } from "../../i18n/ui";
import type { LangProp } from "../../lib/props";

export default async function BlogPreview({ lang }: LangProp) {
  const tr = (key: string) => t(key as UiKey, lang);

  const all = await getCollection<BlogData>(
    "blog",
    ({ id }) => splitId(id).lang === lang,
  );
  const posts = [...all]
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-section-sm">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{tr("blog.eyebrow")}</p>
            <h2 className="h2 h2-sm mt-5 max-w-2xl">{tr("blog.indexTitle")}</h2>
            <p className="lead mt-4 max-w-xl text-mute">{tr("blog.indexDesc")}</p>
          </div>
          <a
            href={path(lang, "blog")}
            className="link-slide shrink-0 font-semibold"
          >
            {tr("insights.all")} →
          </a>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const { slug } = splitId(post.id);
            return (
              <a
                key={post.id}
                href={path(lang, "blog", slug)}
                aria-label={post.data.title}
                className="card-link flex min-w-0 flex-col rounded-2xl border border-(--line) bg-white p-8"
              >
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-mute">
                  <span className="rounded-full bg-accent-600 px-2.5 py-1 text-white">
                    {post.data.category}
                  </span>
                  <time dateTime={post.data.date.toISOString().slice(0, 10)}>
                    {formatDate(post.data.date, lang)}
                  </time>
                </div>
                <h3 className="h3 mt-5">{post.data.title}</h3>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-mute">
                  {post.data.metaDescription}
                </p>
                <p className="mt-6 flex items-center justify-between border-t border-(--line) pt-5 text-sm font-semibold">
                  <span className="read-more">
                    {tr("blog.readMore")}
                    <svg
                      className="read-more-arrow h-3.5 w-3.5"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 8h13M9 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-mute">
                    {readingTime(post.body ?? "")} {tr("blog.minRead")}
                  </span>
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}