import { whatsappUrl } from "@/lib/whatsapp";
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
import { Img } from "@/components/ui/img";
import { useContactWizard } from "@/lib/contact-wizard-context";

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
    href: "https://www.youtube.com/@cyrruscs",
    ariaLabel: "YouTube de Cyrrus Consulting Services",
    tooltip: "YouTube",
    color: "#FF0000",
    icon: YouTubeIcon,
  },
];

// Same NAP as the Organization JSON-LD in index.html. Keep both in sync: search
// engines and AI assistants trust contact data that matches what the page shows.
const offices = [
  { city: "Barranquilla", street: "Cra. 51B #80-58, Oficina 1505" },
  { city: "Bogotá", street: "Carrera 62 #103-44, Oficina 401S" },
];
const phone = "+57 317 5730635";
const email = "contacto@cyrruscs.com";
// Google Business Profile. Also listed in the Organization's sameAs.
const googleProfile = "https://share.google/R8aiMjHEafT2Vy0py";

export function Footer() {
  const { t } = useTranslation();
  const lang = useLang();
  const { openWizard } = useContactWizard();

  const links = [
    { label: t("nav.metodoCira", { ns: "common" }), href: langPath("/metodo-cira", lang) },
    { label: t("nav.intelligenceLab", { ns: "common" }), href: langPath("/intelligence-lab", lang) },
    { label: t("nav.leadershipAcademy", { ns: "common" }), href: langPath("/leadership-academy", lang) },
    { label: t("nav.experiencia", { ns: "common" }), href: langPath("/experiencia", lang) },
    { label: t("nav.perspectivas", { ns: "common" }), href: langPath("/perspectivas", lang) },
  ];

  // Descriptive-anchor links to the service pages, so the home (and every page
  // that renders the footer) passes link equity to them with crawlable <a href>.
  const serviceLinks = [
    { label: t("nav.estrategia", { ns: "common" }), href: langPath("/metodo-cira/estrategia", lang) },
    { label: t("nav.seleccionSoftware", { ns: "common" }), href: langPath("/metodo-cira/seleccion-de-soluciones/seleccion-de-software", lang) },
    { label: t("nav.gerenciaProyectos", { ns: "common" }), href: langPath("/metodo-cira/gestion-de-proyectos", lang) },
    { label: t("nav.gestionCambio", { ns: "common" }), href: langPath("/metodo-cira/gestion-del-cambio", lang) },
    { label: t("nav.intelligenceLab", { ns: "common" }), href: langPath("/intelligence-lab", lang) },
    { label: t("nav.leadershipAcademy", { ns: "common" }), href: langPath("/leadership-academy", lang) },
  ];

  const legalLinks = [
    { label: t("footer.privacidad", { ns: "common" }), href: langPath("/privacidad", lang) },
    { label: t("footer.cookies", { ns: "common" }), href: langPath("/cookies", lang) },
  ];

  return (
    <footer className="cv-section w-full bg-[#061129] py-16 text-white/65">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-[clamp(24px,5vw,64px)] text-center md:flex-row md:justify-between md:text-left">
        <Link to={lang === "en" ? "/en" : "/"}>
          <Img
            src="/assets/logos-cyrrus/cyrrus-logo-blanco.png"
            alt="Cyrrus Consulting Services"
            width={140}
            height={44}
              className="h-11 w-auto"
            sizes="140px"
          />
        </Link>
        <nav aria-label={lang === "en" ? "Footer" : "Pie de página"} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => openWizard()}
            className="text-sm text-white/65 transition-colors hover:text-white"
          >
            {lang === "en" ? "Contact" : "Contacto"}
          </button>
        </nav>
        <div className="flex flex-col items-center gap-4 md:items-end">
          <SocialTooltip items={socialLinks} />
          <nav aria-label={lang === "en" ? "Legal" : "Legal"} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-xs text-white/60">
            {/* One string, not `© {year} Cyrrus...`. Adjacent literal-and-expression
                children are separate text nodes to React but a single one once the
                page has been serialised to HTML, which fails hydration. */}
            {`© ${new Date().getFullYear()} Cyrrus Consulting Services`}
          </div>
        </div>
      </div>
      <nav
        aria-label={t("footer.servicios", { ns: "common" })}
        className="mx-auto mt-10 flex max-w-[1280px] flex-col items-center gap-3 border-t border-white/12 px-[clamp(24px,5vw,64px)] pt-6 text-center md:flex-row md:flex-wrap md:items-baseline md:gap-x-6 md:text-left"
      >
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-white">{t("footer.servicios", { ns: "common" })}</span>
        {serviceLinks.map((link) => (
          <Link key={link.href} to={link.href} className="text-sm text-white/65 transition-colors hover:text-white">
            {link.label}
          </Link>
        ))}
      </nav>
      <address className="mx-auto mt-6 flex max-w-[1280px] flex-col items-center gap-x-8 gap-y-2 border-t border-white/12 px-[clamp(24px,5vw,64px)] pt-6 text-center text-xs not-italic text-white/60 md:flex-row md:flex-wrap md:justify-between md:text-left">
        <span className="font-semibold text-white">
          {lang === "en" ? "Cyrrus Consulting Services S.A.S. · Tax ID (NIT) 901.121.953-1" : "Cyrrus Consulting Services S.A.S. · NIT 901.121.953-1"}
        </span>
        {offices.map((office) => (
          <span key={office.city}>{`${office.street}, ${office.city}, Colombia`}</span>
        ))}
        <span className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
            {phone}
          </a>
          <a
            href={whatsappUrl(lang === "en" ? "Hello, I would like to talk to Cyrrus about a service." : "Hola, me gustaría conversar con Cyrrus sobre un servicio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            WhatsApp
          </a>
          <a href={`mailto:${email}`} className="transition-colors hover:text-white">
            {email}
          </a>
          <a
            href={googleProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            {lang === "en" ? "Google Business Profile" : "Perfil de Google"}
          </a>
        </span>
      </address>
      {/* Agency credit. Google treats followed links in site-wide footers as link
          schemes, so it stays nofollow with a plain brand anchor. No noreferrer:
          OPPI should still see the referral in their analytics. */}
      <p className="mx-auto mt-4 max-w-[1280px] px-[clamp(24px,5vw,64px)] text-center text-xs text-white/60 md:text-left">
        {lang === "en" ? "SEO strategy by " : "Estrategia SEO por "}<a href="https://www.oppi.digital/" target="_blank" rel="nofollow noopener" className="transition-colors hover:text-white">OPPI</a>
      </p>
    </footer>
  );
}
