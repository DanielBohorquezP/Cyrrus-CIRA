import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Img } from "@/components/ui/img";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
  /** Internal route to a real, published article. When set, the card links
   *  there instead of showing the "Próximamente" placeholder overlay. */
  href?: string;
  /** Pre-localized override for the footer date line (e.g. "Published Sep 8, 2026").
   *  Falls back to the Spanish "Se publica en {published}" placeholder copy. */
  dateLabel?: string;
}

interface Blog7Props {
  tagline: string;
  heading: string;
  headingAs?: "h1" | "h2";
  description: string;
  buttonText: string;
  buttonUrl?: string;
  /** Takes precedence over buttonUrl when provided — renders a <button> that
   *  calls this instead of an <a href>. */
  onButtonClick?: () => void;
  posts: Post[];
  /** Hide the heading block when the page already shows it in its own hero. */
  showHeader?: boolean;
}

const Blog7 = ({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  headingAs = "h2",
  description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  buttonText = "View all articles",
  buttonUrl = "/perspectivas",
  onButtonClick,
  posts = [
    {
      id: "post-1",
      title: "Getting Started with shadcn/ui Components",
      summary:
        "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
      label: "Tutorial",
      author: "Sarah Chen",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "/images/block/placeholder-dark-1.svg",
    },
    {
      id: "post-2",
      title: "Building Accessible Web Applications",
      summary:
        "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
      label: "Accessibility",
      author: "Marcus Rodriguez",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "/images/block/placeholder-dark-1.svg",
    },
    {
      id: "post-3",
      title: "Modern Design Systems with Tailwind CSS",
      summary:
        "Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
      label: "Design Systems",
      author: "Emma Thompson",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "/images/block/placeholder-dark-1.svg",
    },
  ],
  showHeader = true,
}: Blog7Props) => {
  return (
    <section className="cv-section section-y">
      <div className="container-site">
        {showHeader && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-end gap-x-24 gap-y-8 mb-16">
          <div>
            <Eyebrow>{tagline}</Eyebrow>
            {(() => {
              const Heading = headingAs;
              return (
                <Heading className="mt-6 font-heading text-[clamp(28px,3vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-balance text-navy">
                  {heading}
                </Heading>
              );
            })()}
          </div>
          <div>
            <p className="text-lg leading-[1.7] text-pretty text-slate">{description}</p>
            {onButtonClick ? (
              <button
                type="button"
                onClick={onButtonClick}
                className="mt-6 inline-block border-b border-blue pb-1 font-heading text-sm font-medium text-blue hover:border-navy hover:text-navy"
              >
                {`${buttonText} →`}
              </button>
            ) : (
              <Link
                to={buttonUrl}
                className="mt-6 inline-block border-b border-blue pb-1 font-heading text-sm font-medium text-blue hover:border-navy hover:text-navy"
              >
                {`${buttonText} →`}
              </Link>
            )}
          </div>
        </div>
        )}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-8">
          {posts.map((post) => {
            // One level below the section heading: h2 cards under the
            // /perspectivas h1, h3 cards under the Home's h2 section.
            const CardHeading = headingAs === "h1" ? "h2" : "h3";
            return (
              <article key={post.id} className="flex flex-col">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                  <Img
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={240}
                    className="h-full w-full object-cover object-center"
                    sizes="1100px"
                  />
                  {!post.href && (
                    <>
                      <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />
                      <span className="absolute inset-0 flex items-center justify-center px-4 text-center">
                        <span className="rounded-full bg-navy px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                          Próximamente
                        </span>
                      </span>
                    </>
                  )}
                </div>
                <div className="flex flex-1 flex-col border-t-2 border-navy pt-5 mt-5">
                  <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-cyan-ink">
                    {post.label}
                  </span>
                  <CardHeading className="mt-3 font-heading text-xl font-semibold leading-snug text-navy">
                    {post.href ? (
                      <Link to={post.href} className="hover:text-blue">
                        {post.title}
                      </Link>
                    ) : (
                      post.title
                    )}
                  </CardHeading>
                  <p className="mt-3 flex-1 text-base leading-[1.65] text-slate">{post.summary}</p>
                  <span className="mt-5 flex items-center text-sm text-slate">
                    <Clock className="mr-2 size-4" aria-hidden="true" />
                    {/* Single interpolation: literal text next to an expression is
                        two adjacent text nodes to React, but one after the DOM
                        serialises it, which breaks hydration of the whole page. */}
                    {post.dateLabel ?? `Se publica en ${post.published}`}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };
