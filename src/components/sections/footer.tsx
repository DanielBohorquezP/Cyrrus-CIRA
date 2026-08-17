import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  SocialTooltip,
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
  type SocialItem,
} from "@/components/ui/social-media";
import { langPath, useLang } from "@/lib/language";

const socialLinks: SocialItem[] = [
  {
    href: "https://www.linkedin.com/company/cyrrus-cs/",
    ariaLabel: "LinkedIn de Cyrrus Consulting Services",
    tooltip: "LinkedIn",
    color: "#0A66C2",
    icon: LinkedInIcon,
  },
  {
    href: "https://www.instagram.com/cyrruscs/",
    ariaLabel: "Instagram de Cyrrus Consulting Services",
    tooltip: "Instagram",
    color: "#E1306C",
    icon: InstagramIcon,
  },
  {
    href: "https://www.youtube.com/@cyrrusconsultingservices3066",
    ariaLabel: "YouTube de Cyrrus Consulting Services",
    tooltip: "YouTube",
    color: "#FF0000",
    icon: YouTubeIcon,
  },
];

export function Footer() {
  const { t } = useTranslation();
  const lang = useLang();

  const links = [
    { label: t("nav.metodoCira", { ns: "common" }), href: langPath("/metodo-cira", lang) },
    { label: t("nav.intelligenceLab", { ns: "common" }), href: langPath("/intelligence-lab", lang) },
    { label: t("nav.leadershipAcademy", { ns: "common" }), href: langPath("/leadership-academy", lang) },
    { label: t("nav.experiencia", { ns: "common" }), href: langPath("/experiencia", lang) },
    { label: t("nav.perspectivas", { ns: "common" }), href: langPath("/perspectivas", lang) },
    { label: lang === "en" ? "Contact" : "Contacto", href: langPath("/contacto", lang) },
  ];

  const legalLinks = [
    { label: t("footer.privacidad", { ns: "common" }), href: langPath("/privacidad", lang) },
    { label: t("footer.cookies", { ns: "common" }), href: langPath("/cookies", lang) },
  ];

  return (
    <footer className="cv-section w-full border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <Link to={lang === "en" ? "/en" : "/"}>
          <img
            src="/assets/logos-cyrrus/cyrrus-logo-negro.png"
            alt="Cyrrus Consulting Services"
            width={140}
            height={44}
            loading="lazy"
            className="h-11 w-auto"
          />
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm text-gray transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-center gap-4 md:items-end">
          <SocialTooltip items={socialLinks} />
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cyrrus Consulting Services
          </div>
        </div>
      </div>
    </footer>
  );
}
