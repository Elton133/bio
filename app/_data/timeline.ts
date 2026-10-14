// Career timeline on /about, oldest first. Entries within a year are listed in rough order.
// kind drives the filter chips; href (optional) makes the entry open a case study or note.

export type TimelineKind = "ROLE" | "PROJECT" | "MILESTONE" | "WRITING";
export type TimelineEntry = { year: string; when?: string; kind: TimelineKind; title: string; place?: string; copy: string; href?: string; now?: boolean };

export const timeline: TimelineEntry[] = [
  { year: "2022", kind: "MILESTONE", title: "Started a BSc in Information Technology", place: "Regional Maritime University", copy: "The starting point: a degree that would end four years later with production systems, a startup and a graduating award." },

  { year: "2024", kind: "PROJECT", title: "Utility Finder", place: "Mobile prototype", copy: "A location-based app for finding nearby pharmacies, medication and utility vendors, built while moving into React Native.", href: "/work/utility-finder" },
  { year: "2024", when: "Dec 2024 — Mar 2025", kind: "ROLE", title: "Frontend Engineer Intern", place: "Partechnologies & Consult", copy: "Led frontend development of a deal-sourcing platform with React, Zustand and Socket.io, and documented its architecture and technical decisions." },

  { year: "2025", kind: "MILESTONE", title: "AWS Certified Cloud Practitioner", place: "AWS re/Start via AmaliTech", copy: "Formal grounding in cloud infrastructure, the start of working beyond the frontend." },
  { year: "2025", kind: "PROJECT", title: "Sabary Tours", place: "Client web platform", copy: "A tourism platform with content moved into Strapi, so the client manages offerings without a frontend deploy.", href: "/work/sabary" },
  { year: "2025", when: "Aug 2025", kind: "ROLE", title: "Intern", place: "Stanbic Bank Ghana", copy: "Gained exposure to structured corporate processes, customer-facing operations and how large organizations serve people." },
  { year: "2025", when: "Oct 2025", kind: "ROLE", title: "Frontend Developer", place: "Touch Stack Technologies", copy: "Developed and maintained client-facing web products, CMS-backed applications, backend integrations and production deployment infrastructure." },

  { year: "2026", kind: "PROJECT", title: "Beagine", place: "Founder", copy: "A real-time service marketplace and dispatch platform for skilled workers in Ghana, built with a six-person team.", href: "/work/beagine", now: true },
  { year: "2026", kind: "PROJECT", title: "SpeakUp", place: "Founder / concept", copy: "A platform for faith-informed conversation and cultural engagement beyond the walls of a single church.", href: "/work/speakup" },
  { year: "2026", kind: "PROJECT", title: "SGMS", place: "Final-year project", copy: "A full-stack grievance management system for Regional Maritime University, delivered iteratively over five months.", href: "/work/sgms" },
  { year: "2026", kind: "MILESTONE", title: "Best Graduating Student — Information Technology", place: "Regional Maritime University", copy: "Finished the BSc that started it all, at the top of the class." },
  { year: "2026", when: "2026 — Present", kind: "ROLE", title: "Software Engineer / AI Backend Engineering", place: "Global Icons Agency", copy: "Working across production software and increasingly backend, cloud and AI-enabled systems within an established engineering environment.", now: true },
  { year: "2026", when: "Jul 2026", kind: "WRITING", title: "Started writing notes", place: "On this site", copy: "Longer reflections on building Beagine and moving across the stack.", href: "/notes" },
  { year: "2026", when: "Sep 2026", kind: "WRITING", title: "Started writing build logs", place: "Substack", copy: "Short, honest logs of real engineering problems, from embedding caches to database design.", href: "https://eltonmorden.substack.com" },
];
