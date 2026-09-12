import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Blog7 } from "@/components/ui/blog7";
import { upcomingTopics } from "@/lib/perspectivas-topics";
import { blogPosts } from "@/lib/blog-data";
import { useContactWizard } from "@/lib/contact-wizard-context";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/paginas";
import "@/i18n/ns/blog";

interface BlogPostSummary {
  title: string;
  label: string;
  excerpt: string;
}

export default function Perspectivas() {
  const { t } = useTranslation("paginas");
  const { t: tBlog } = useTranslation("blog");
  const lang = useLang();
  const { openWizard } = useContactWizard();

  const siteUrl = "https://cyrruscs.com";
  const pagePath = lang === "en" ? "/en/perspectivas" : "/perspectivas";
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
      url: `${lang === "en" ? "/en" : ""}/perspectivas/${entry.slug}`,
      href: `${lang === "en" ? "/en" : ""}/perspectivas/${entry.slug}`,
      image: entry.coverImage,
    };
  });

  usePageMeta({
    title: t("perspectivas.meta.title"),
    description: t("perspectivas.meta.description"),
    alternatePath: lang === "en" ? "/perspectivas" : "/en/perspectivas",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${siteUrl}${pagePath}#blog`,
        url: `${siteUrl}${pagePath}`,
        name: t("perspectivas.meta.title"),
        description: t("perspectivas.meta.description"),
        publisher: { "@id": `${siteUrl}/#organization` },
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: lang === "en" ? "en" : "es",
        blogPost: blogPosts.map((entry) => ({
          "@id": `${siteUrl}${lang === "en" ? "/en" : ""}/perspectivas/${entry.slug}#article`,
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${lang === "en" ? "/en" : "/"}` },
          { "@type": "ListItem", position: 2, name: t("perspectivas.meta.title"), item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />

      <Blog7
        tagline={t("perspectivas.tagline")}
        headingAs="h1"
        heading={t("perspectivas.heading")}
        description={t("perspectivas.description")}
        buttonText={t("perspectivas.buttonText")}
        onButtonClick={openWizard}
        posts={[...publishedPosts, ...upcomingTopics]}
      />

      <FinalCta />
      <Footer />
    </>
  );
}
