import { ogCard, ogSize } from "../../_lib/og";
import { projects } from "../../_data/site";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study";
export function generateStaticParams() { return projects.map(p => ({ project: p.slug })); }
export default async function Image({ params }: { params: Promise<{ project: string }> }) {
  const { project } = await params;
  const p = projects.find(x => x.slug === project) ?? projects[0];
  return ogCard({ kicker: `CASE STUDY ${p.id} / ${p.type}`, title: p.name, subtitle: p.summary, accent: p.ink, surface: p.surface, ink: p.ink });
}
