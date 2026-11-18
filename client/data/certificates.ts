export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  /** What kind of credential the document is, as printed on it. */
  kind: string;
  /** Issue date as YYYY-MM-DD. */
  issued: string;
  expires?: string;
  credentialId?: string;
  url?: string;
  skills?: readonly string[];
  image: { src: string; width: number; height: number; alt: string };
};

const size = { width: 1800, height: 1391 } as const;

// Details are taken from each certificate. Verify links come from the printed URL or the QR code.
export const certificates: readonly Certificate[] = [
  {
    id: "it-specialist-artificial-intelligence",
    title: "IT Specialist: Artificial Intelligence",
    issuer: "Certiport",
    kind: "Certification",
    issued: "2026-11-13",
    expires: "2031-11-13",
    credentialId: "aMDd-s4Yk",
    url: "https://verify.certiport.com",
    skills: ["Artificial intelligence"],
    image: { src: "/certificates/it-specialist-artificial-intelligence.webp", ...size, alt: "Information Technology Specialist certificate in Artificial Intelligence from Certiport, awarded November 13, 2026." },
  },
  {
    id: "ibm-data-fundamentals",
    title: "Data Fundamentals",
    issuer: "IBM SkillsBuild",
    kind: "Digital credential",
    issued: "2026-05-22",
    url: "https://www.credly.com/badges/e1bed6bf-521e-40ba-bf9f-90454e07bfd6",
    skills: ["Data"],
    image: { src: "/certificates/ibm-data-fundamentals.webp", ...size, alt: "IBM SkillsBuild Data Fundamentals certificate, issued May 22, 2026." },
  },
  {
    id: "ibm-ux-design-fundamentals",
    title: "User Experience Design Fundamentals",
    issuer: "IBM SkillsBuild",
    kind: "Digital credential",
    issued: "2026-05-22",
    url: "https://www.credly.com/badges/4bb3f082-40c6-4ef0-b075-41d7a4e50822",
    skills: ["UX design"],
    image: { src: "/certificates/ibm-ux-design-fundamentals.webp", ...size, alt: "IBM SkillsBuild User Experience Design Fundamentals certificate, issued May 22, 2026." },
  },
  {
    id: "cisco-operating-systems-basics",
    title: "Operating Systems Basics",
    issuer: "Cisco Networking Academy",
    kind: "Course completion",
    issued: "2026-05-18",
    url: "https://www.credly.com/badges/c26e4981-0ded-4f4c-b721-59600f0885de",
    skills: ["Windows", "Linux", "Mobile OS"],
    image: { src: "/certificates/cisco-operating-systems-basics.webp", ...size, alt: "Cisco Networking Academy certificate of course completion for Operating Systems Basics, issued May 18, 2026." },
  },
  {
    id: "ibm-project-management-fundamentals",
    title: "Project Management Fundamentals",
    issuer: "IBM SkillsBuild",
    kind: "Digital credential",
    issued: "2025-11-30",
    url: "https://www.credly.com/badges/65c660e1-26fe-40a2-9c42-923afe2ae967",
    skills: ["Project management"],
    image: { src: "/certificates/ibm-project-management-fundamentals.webp", ...size, alt: "IBM SkillsBuild Project Management Fundamentals certificate, issued November 30, 2025." },
  },
  {
    id: "cisco-introduction-to-modern-ai",
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    kind: "Course completion",
    issued: "2025-10-27",
    url: "https://www.credly.com/badges/094b4d56-d0a0-45d2-b02f-e4313043a2b9",
    skills: ["LLMs", "Prompting", "Computer vision"],
    image: { src: "/certificates/cisco-introduction-to-modern-ai.webp", ...size, alt: "Cisco Networking Academy certificate of course completion for Introduction to Modern AI, issued October 27, 2025." },
  },
  {
    id: "cisco-ai-fundamentals",
    title: "AI Fundamentals with IBM SkillsBuild",
    issuer: "Cisco Networking Academy",
    kind: "Statement of achievement",
    issued: "2024-11-05",
    url: "https://www.credly.com/badges/f483895e-7498-4abb-82e0-b0967fcc4746",
    skills: ["Machine learning", "AI ethics", "Watson Studio"],
    image: { src: "/certificates/cisco-ai-fundamentals.webp", ...size, alt: "Cisco Networking Academy statement of achievement for AI Fundamentals with IBM SkillsBuild, issued November 5, 2024." },
  },
  {
    id: "ibm-artificial-intelligence-fundamentals",
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    kind: "Digital credential",
    issued: "2024-10-14",
    url: "https://www.credly.com/badges/23e8b85c-7c25-48e7-8abc-ec3bac28ded2",
    skills: ["Artificial intelligence"],
    image: { src: "/certificates/ibm-artificial-intelligence-fundamentals.webp", ...size, alt: "IBM SkillsBuild Artificial Intelligence Fundamentals certificate, issued October 14, 2024." },
  },
];

const monthYear = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export function formatIssued(date: string) {
  return monthYear.format(new Date(`${date}T00:00:00Z`));
}

export const certificateIssuers = [...new Set(certificates.map(({ issuer }) => issuer))];
