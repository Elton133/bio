// Extra case-study content, keyed by project slug.
// featureCopy follows the order of `features` in site.ts.
// writing: words that link a Substack build log to this project when they appear in its title.

export type CaseExtras = { highlights: { value: string; label: string }[]; featureCopy: string[]; writing?: string[] };

export const caseExtras: Record<string, CaseExtras> = {
  beagine: {
    highlights: [
      { value: "6", label: "Person multidisciplinary startup team, led as founder" },
      { value: "4", label: "Connected experiences: customer, specialist, vendor and operations" },
      { value: "Live", label: "Customer and specialist apps at advanced implementation" },
    ],
    featureCopy: [
      "Customers find verified skilled workers near them instead of relying on referrals and WhatsApp contacts.",
      "Jobs can be requested now or scheduled for later, with the details a specialist needs up front.",
      "Both sides follow a job as it moves from request to dispatch to completion.",
      "Messaging and payment live inside the job, so the conversation and the money stay attached to the work.",
      "Every job closes with a rating, a receipt and a route to support if something went wrong.",
      "Specialists control when they are available, so dispatch only reaches people who can take the job.",
      "Each job moves through explicit states, keeping customer, specialist and operations views in sync.",
      "Operations tooling verifies specialists and steps in when real-world jobs go off script.",
    ],
    writing: ["beagine", "marketplace"],
  },
  sgms: {
    highlights: [
      { value: "5", label: "Months of iterative delivery with peer testing rounds" },
      { value: "RBAC", label: "Authentication and role-based access for students and staff" },
      { value: "Live", label: "Real-time status updates, deployed on Vercel" },
    ],
    featureCopy: [
      "Students submit a grievance through a structured form instead of an email thread or office visit.",
      "Every grievance has a visible status, so students know where it stands without chasing anyone.",
      "Students, staff and administrators each see only what their role allows.",
      "Grievances reach the department responsible for resolving them.",
      "Each status change is recorded, giving a clear timeline from submission to resolution.",
      "Students are notified as their case moves and can attach supporting documents.",
      "Actions are logged so the resolution process stays accountable.",
      "Administrators manage users, departments and the workflow from one place.",
    ],
    writing: ["grievance", "sgms"],
  },
  speakup: {
    highlights: [
      { value: "0→1", label: "Original concept, product direction and intended experience" },
      { value: "2", label: "Modes of expression: long-form and short-form" },
    ],
    featureCopy: [
      "A space for conversation shaped by faith, outside the walls of a single church.",
      "People ask real questions and get thoughtful responses rather than quick reactions.",
      "Discussion gathers around communities instead of scattering across group chats.",
      "Room for ideas about culture and society, not only church life.",
      "Space for longer, considered writing.",
      "Lighter ways to join in for people who don't want to write an essay.",
    ],
    writing: ["speakup"],
  },
  sabary: {
    highlights: [
      { value: "CMS", label: "Content moved into Strapi, editable without a frontend deploy" },
      { value: "Paystack", label: "Payments integrated into the booking experience" },
      { value: "Prod", label: "Production client project" },
    ],
    featureCopy: [
      "A polished travel site that works as well on a phone as on a laptop.",
      "Tours, pages and offerings come from Strapi, so the client updates content without a developer.",
      "Each tour carries its itinerary details and traveller reviews.",
      "Prices are managed as content and change without code changes.",
      "Paystack handles payments for local customers.",
      "Administrators manage offerings and content through the CMS.",
      "Google Tag Manager gives the client visibility into how visitors use the site.",
      "Existing content was imported into the new CMS during the migration.",
    ],
    writing: ["sabary", "strapi"],
  },
  "utility-finder": {
    highlights: [
      { value: "~5 km", label: "Search radius, using geographic distance calculations" },
      { value: "RN", label: "Built while moving into React Native engineering" },
    ],
    featureCopy: [
      "Shows pharmacies close to the user's current location.",
      "Searches for a specific medication instead of calling pharmacies one by one.",
      "Contact details and location for each pharmacy.",
      "Finds nearby ECG prepaid electricity vendors as well.",
      "Results are ordered by what is actually close.",
      "Distances are calculated from coordinates to keep results within about five kilometres.",
      "Moves between service categories from one interface.",
    ],
    writing: ["utility finder", "pharmacy"],
  },
};
