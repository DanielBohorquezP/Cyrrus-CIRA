import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { langPath, useLang } from "@/lib/language";
import { jacksonBohorquez, type TeamMember } from "@/lib/team";
import { Eyebrow } from "@/components/ui/eyebrow";
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
    <section className={cn("w-full bg-mist py-[clamp(80px,10vw,120px)]", className)}>
      <Reveal className="mx-auto grid w-full max-w-[1080px] grid-cols-1 items-center gap-x-14 gap-y-10 px-[clamp(24px,5vw,64px)] sm:grid-cols-[240px_1fr]">
        <Img
          src={member.photo}
          alt={t("ceo.photoAlt")}
          width={240}
          height={300}
          sizes="240px"
          className="aspect-[4/5] w-60 rounded-2xl object-cover"
        />
        <div className="max-w-[700px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-heading text-[clamp(28px,3vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-navy">
            {title}
          </h2>
          <p className="mt-3 font-heading text-sm font-semibold text-navy">
            {`${t("ceo.name")} · ${t("ceo.role")}`}
          </p>
          {member.credentials.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {member.credentials.map((credential) => (
                <li
                  key={credential}
                  className="rounded-full border border-line-2 bg-white px-3 py-1 text-xs font-semibold text-navy"
                >
                  {credential}
                </li>
              ))}
            </ul>
          )}
          <p className="t-lead mt-6 text-slate">{bio}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-heading text-sm font-medium">
            <Link
              to={langPath("/quienes-somos", lang)}
              className="text-blue hover:text-navy"
            >
              {`${lang === "en" ? "Full profile" : "Perfil completo"} →`}
            </Link>
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-navy hover:text-blue"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
