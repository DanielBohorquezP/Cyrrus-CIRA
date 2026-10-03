import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { langPath, useLang } from "@/lib/language";
import { jacksonBohorquez, type TeamMember } from "@/lib/team";
import { Reveal } from "@/components/ui/reveal";
import { Img } from "@/components/ui/img";
import { LinkedInIcon } from "@/components/ui/social-media";
import { cn } from "@/lib/utils";

interface ServiceLeadProps {
  eyebrow: string;
  title: string;
  /** What this person does on this particular service — one or two sentences. */
  bio: string;
  member?: TeamMember;
  className?: string;
}

/**
 * "Who leads this service": a named person, photo, credentials and a link to
 * their profile, the way the large consultancies show their team on each
 * service page. Name and role come from the `home` namespace (always loaded).
 */
export function ServiceLead({ eyebrow, title, bio, member = jacksonBohorquez, className }: ServiceLeadProps) {
  const { t } = useTranslation("home");
  const lang = useLang();

  return (
    <section className={cn("w-full bg-background py-20 md:py-28", className)}>
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <Reveal className="text-center">
          <span className="text-base font-bold uppercase tracking-wider text-blue">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {title}
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-12 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-7 text-center sm:flex-row sm:items-start sm:gap-8 sm:p-8 sm:text-left"
        >
          <Img
            src={member.photo}
            alt={t("ceo.photoAlt")}
            width={128}
            height={128}
            sizes="128px"
            className="h-28 w-28 shrink-0 rounded-full object-cover sm:h-32 sm:w-32"
          />
          <div>
            <h3 className="text-xl font-semibold text-navy">{t("ceo.name")}</h3>
            <p className="mt-1 text-sm font-medium text-blue">{t("ceo.role")}</p>
            {member.credentials.length > 0 && (
              <ul className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                {member.credentials.map((credential) => (
                  <li
                    key={credential}
                    className="rounded-full bg-light-blue px-3 py-1 text-xs font-semibold text-navy"
                  >
                    {credential}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-base leading-relaxed text-gray">{bio}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-start">
              <Link
                to={langPath("/quienes-somos", lang)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue underline-offset-4 hover:underline"
              >
                {lang === "en" ? "Full profile" : "Perfil completo"}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy underline-offset-4 hover:underline"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
