/**
 * People shown as the named lead on service pages (E-E-A-T: a real person,
 * with verifiable credentials, behind each service).
 *
 * `credentials` renders as badges under the lead's name. Only add a
 * certification the person actually holds and could show if asked (PMP,
 * Prosci, ITIL, etc.) — an unverifiable credential does more harm than none.
 * Leave the array empty and the badge row simply doesn't render.
 */
export interface TeamMember {
  photo: string;
  linkedIn: string;
  credentials: string[];
}

export const jacksonBohorquez: TeamMember = {
  photo: "/assets/decoracion/JacksonCEO1.jpeg",
  linkedIn: "https://www.linkedin.com/in/jacksonbohorquezb/",
  credentials: [],
};
