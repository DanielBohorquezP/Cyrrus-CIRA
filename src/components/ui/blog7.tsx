import { ArrowRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
}

const Blog7 = ({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  headingAs = "h2",
  description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  buttonText = "View all articles",
  buttonUrl = "https://shadcnblocks.com",
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
}: Blog7Props) => {
  return (
    <section className="cv-section py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            {tagline}
          </Badge>
          {(() => {
            const Heading = headingAs;
            return (
              <Heading className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
                {heading}
              </Heading>
            );
          })()}
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
          {onButtonClick ? (
            <Button variant="link" className="w-full sm:w-auto" onClick={onButtonClick}>
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          ) : (
            <Button variant="link" className="w-full sm:w-auto" asChild>
              <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
                {buttonText}
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="grid grid-rows-[auto_auto_1fr_auto]">
              <div className="relative aspect-[16/9] w-full">
                <Img
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={240}
                  className="h-full w-full object-cover object-center"
                  sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />
                <span className="absolute inset-0 flex items-center justify-center px-4 text-center">
                  <span className="rounded-full bg-navy px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                    Próximamente
                  </span>
                </span>
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold md:text-xl">{post.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
              <CardFooter>
                <span className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 size-4" />
                  {/* Single interpolation: literal text next to an expression is
                      two adjacent text nodes to React, but one after the DOM
                      serialises it, which breaks hydration of the whole page. */}
                  {`Se publica en ${post.published}`}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };
