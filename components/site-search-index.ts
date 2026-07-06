import { CASE_STUDIES } from "@/components/case-studies-data";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";
import { TEAM_MEMBERS } from "@/lib/team-data";

/** Mirror of memberSlug() in team-page.tsx. Inlined here so this index
 *  module stays free of client-component imports. Keep these in sync. */
function memberSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[.,]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type SearchEntry = {
  title: string;
  href: string;
  category: string;
  description: string;
  keywords: string;
};

const STATIC_ENTRIES: SearchEntry[] = [
  {
    title: "Home",
    href: "/",
    category: "Main",
    description:
      "Rawlins Infra Consult — trusted advisory at the intersection of strategy, operations, and technology.",
    keywords:
      "home rawlins consulting strategy operations technology advisory transportation infrastructure landing",
  },
  {
    title: "Capabilities",
    href: "/capabilities",
    category: "Main",
    description:
      "Three areas of expertise, one mission—to navigate complexity and deliver measurable, lasting outcomes. Strategy, operations, and technology across transportation and infrastructure.",
    keywords:
      "capabilities services strategy operations technology solutions practice areas consulting practice offerings aam uam uas advanced air mobility urban air mobility uncrewed data governance automation ai drones rethink how organization works",
  },
  {
    title: "Strategy",
    href: "/capabilities#strategy",
    category: "Capabilities",
    description:
      "Decision systems, planning, and organizational design that turn priorities into measurable results.",
    keywords:
      "strategy strategic planning decision systems organizational design governance frameworks leadership priorities roadmap",
  },
  {
    title: "Operations",
    href: "/capabilities#operations",
    category: "Capabilities",
    description:
      "People, process, culture, and workforce programs that foster accountability and high performance.",
    keywords:
      "operations people process culture workforce organizational change management performance accountability efficiency",
  },
  {
    title: "Technology",
    href: "/capabilities#technology",
    category: "Capabilities",
    description:
      "Human-centric AI integration, data governance, analytics, and advanced air mobility & UAS.",
    keywords:
      "technology ai artificial intelligence data governance analytics automation integration digital information systems aam uam uas advanced air mobility urban air mobility uncrewed drones aviation",
  },
  {
    title: "Advanced Air Mobility & UAS",
    href: "/capabilities/technology/advanced-air-mobility",
    category: "Technology",
    description:
      "Planning, implementation, and integration of advanced air mobility, urban air mobility, and uncrewed aircraft systems.",
    keywords:
      "advanced air mobility aam uam urban air mobility uas ua uav uncrewed unmanned aircraft systems drones evtol vtol airspace multimodal transport aviation airspace integration vertiports air taxi passenger cargo drone delivery",
  },
  {
    title: "Urban Air Mobility (UAM)",
    href: "/capabilities/technology/advanced-air-mobility#uam",
    category: "Technology",
    description:
      "Urban air mobility planning and airspace integration — part of our Advanced Air Mobility practice.",
    keywords:
      "urban air mobility uam air taxi vertiport evtol passenger drone airspace integration city transport multimodal",
  },
  {
    title: "UAS / Uncrewed Aircraft Systems",
    href: "/capabilities/technology/advanced-air-mobility#uas",
    category: "Technology",
    description:
      "Uncrewed aircraft systems (UAS/drones) planning, policy, and operations — part of our Advanced Air Mobility practice.",
    keywords:
      "uncrewed aircraft systems uas ua uav unmanned drone drones aerial surveying inspection delivery airspace integration part 107 beyond visual line of sight bvlos faa policy operations",
  },
  {
    title: "Data Governance, Automation & AI",
    href: "/capabilities/technology/automation-integration",
    category: "Technology",
    description:
      "Data governance, automation, and AI capabilities that help people work smarter and organizations thrive.",
    keywords:
      "data governance automation ai artificial intelligence workflow integration analytics digital transformation efficiency smarter",
  },
  {
    title: "About",
    href: "/#story",
    category: "Main",
    description:
      "Who we are: the story behind Rawlins and our approach to advising organizations.",
    keywords: "about who we are story company history mission values",
  },
  {
    title: "Our People",
    href: "/about/our-people",
    category: "About",
    description:
      "Meet the Rawlins team — experts in strategy, operations, and technology across sectors.",
    keywords:
      "our people team members experts meet the team leadership advisors staff profiles biography bio",
  },
  {
    title: "Areas We Serve",
    href: "/about/areas-we-serve",
    category: "About",
    description:
      "The sectors and regions where Rawlins partners with public and private organizations.",
    keywords:
      "areas we serve sectors regions global transportation infrastructure public private states coverage map",
  },
  {
    title: "Insights",
    href: "/insights",
    category: "Main",
    description:
      "Ideas, experiences, and stories shaping better decisions from the Rawlins team.",
    keywords:
      "insights ideas experiences stories decisions thought leadership podcast case studies articles content library perspectives",
  },
  {
    title: "Thought Leadership",
    href: "/insights/thought-leadership",
    category: "Insights",
    description:
      "Expert perspectives and practical insights from Rawlins advisors on complex challenges. Latest: Ron Crew on strengthening your team and April Blackburn on data governance.",
    keywords:
      "thought leadership articles expert perspectives practical insights research advisors writing essays ron crew april blackburn strengthening your team data governance fatigue leadership team building high performance",
  },
  {
    title: "The Rawlins Way — Podcast",
    href: "/insights/podcast",
    category: "Insights",
    description:
      "Candid conversations about the real challenges facing transportation agencies and complex organizations.",
    keywords:
      "podcast rawlins way conversations transportation agencies leaders interviews audio listen episodes listen in learn more lead better",
  },
  {
    title: "Case Studies",
    href: "/insights/case-studies",
    category: "Insights",
    description:
      "Detailed accounts of how we've helped agencies modernize and deliver measurable results.",
    keywords:
      "case studies projects engagements results impact examples portfolio client work proven",
  },
  {
    title: "Careers",
    href: "/careers",
    category: "Main",
    description:
      "Join Rawlins. We connect with thoughtful, driven professionals who create meaningful impact.",
    keywords:
      "careers jobs hiring employment open positions work opportunities join us",
  },
  {
    title: "Contact",
    href: "/contact",
    category: "Main",
    description:
      "Get in touch with the Rawlins team to start a conversation.",
    keywords:
      "contact get in touch email phone address message form reach out conversation reno nv nevada 89521 damonte ranch parkway pkwy office location headquarters",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
    category: "Legal",
    description: "How Rawlins handles personal information and site data.",
    keywords: "privacy policy personal data information legal",
  },
  {
    title: "Terms of Service",
    href: "/terms-of-service",
    category: "Legal",
    description: "Terms governing use of the Rawlins website and services.",
    keywords: "terms of service conditions legal agreement website",
  },
  {
    title: "Accessibility",
    href: "/accessibility",
    category: "Legal",
    description: "Our commitment to accessibility and inclusive design.",
    keywords: "accessibility wcag inclusive design a11y compliance",
  },
];

const CASE_STUDY_ENTRIES: SearchEntry[] = CASE_STUDIES.map((cs) => {
  const projectTitles = cs.projects?.map((p) => p.title).join(" ") || "";
  const descriptions = cs.projects?.map((p) => p.description || "").join(" ") || "";
  return {
    title: cs.title,
    href: `/insights/case-studies/${cs.slug}`,
    category: "Case Study",
    description: cs.description || cs.subtitle || "Case study from the Rawlins team.",
    keywords: `case study ${cs.title} ${cs.subtitle || ""} ${projectTitles} ${descriptions} ${cs.clientInfo?.services || ""} ${cs.clientInfo?.location || ""}`.toLowerCase(),
  };
});

const TL_ENTRIES: SearchEntry[] = THOUGHT_LEADERSHIP.map((a) => {
  const contentText = a.content
    ?.map((b) => b.text || (b.items ? b.items.join(" ") : ""))
    .filter(Boolean)
    .join(" ") || "";
  return {
    title: a.title,
    href: `/insights/thought-leadership/${a.slug}`,
    category: "Article",
    description: a.subtitle || a.excerpt || "Thought leadership article.",
    keywords: `article ${a.title} ${a.subtitle || ""} ${a.category || ""} ${a.author || ""} ${a.authorRole || ""} ${a.excerpt || ""} ${contentText}`.toLowerCase().slice(0, 2000),
  };
});

const TEAM_ENTRIES: SearchEntry[] = TEAM_MEMBERS.map((m) => {
  const descParts = [m.title, m.role, m.location].filter(Boolean);
  const description = descParts.join(" · ");
  const keywordParts = [
    "team",
    "people",
    "person",
    "bio",
    "biography",
    m.name,
    m.title || "",
    m.role,
    m.location,
    m.email,
    (m.categories || []).join(" "),
    m.background,
    m.achievements,
  ];
  return {
    title: m.name,
    href: `/about/our-people#${memberSlug(m.name)}`,
    category: "Team",
    description,
    keywords: keywordParts.join(" ").toLowerCase().slice(0, 2000),
  };
});

export const SEARCH_INDEX: SearchEntry[] = [
  ...STATIC_ENTRIES,
  ...CASE_STUDY_ENTRIES,
  ...TL_ENTRIES,
  ...TEAM_ENTRIES,
];
