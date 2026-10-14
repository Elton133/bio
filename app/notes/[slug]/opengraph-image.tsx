import { ogCard, ogSize } from "../../_lib/og";
import { notes } from "../../_data/site";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Note";
export function generateStaticParams() { return notes.map(n => ({ slug: n.slug })); }
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = notes.find(x => x.slug === slug) ?? notes[0];
  return ogCard({ kicker: `NOTE / ${n.topic} / ${n.read} READ`, title: n.title, subtitle: n.lead, accent: "#a276ff" });
}
