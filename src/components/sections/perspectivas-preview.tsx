import { useTranslation } from "react-i18next";
import { Blog7 } from "@/components/ui/blog7";
import { blogPosts } from "@/lib/blog-data";
import { langPath, useLang } from "@/lib/language";
// Registers the "blog" i18n namespace. Side-effect import: it must run at
// module scope so the copy is in i18next's store before this renders.
import "@/i18n/ns/blog";

interface BlogPostSummary {
  title: string;
  label: string;
  excerpt: string;
}

export function PerspectivasPreview() {
  const { t } = useTranslation("home");
  const { t: tBlog } = useTranslation("blog");
  const lang = useLang();
  const dateFormatter = new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const publishedPosts = blogPosts.map((entry) => {
    const tr = tBlog(`posts.${entry.slug}`, { returnObjects: true }) as BlogPostSummary;
    const dateLabel = `${lang === "en" ? "Published" : "Publicado"} ${dateFormatter.format(new Date(`${entry.publishedAt}T00:00:00`))}`;
    return {
      id: entry.slug,
      title: tr.title,
      summary: tr.excerpt,
      label: tr.label,
      author: "Jackson Bohorquez",
      published: entry.publishedAt,
      dateLabel,
      url: langPath(`/perspectivas/${entry.slug}`, lang),
      href: langPath(`/perspectivas/${entry.slug}`, lang),
      image: entry.coverImage,
    };
  });

  return (
    <Blog7
      tagline={t("perspectivasPreview.tagline")}
      heading={t("perspectivasPreview.heading")}
      description={t("perspectivasPreview.description")}
      buttonText={t("perspectivasPreview.buttonText")}
      buttonUrl={langPath("/perspectivas", lang)}
      posts={publishedPosts.slice(0, 4)}
    />
  );
}
