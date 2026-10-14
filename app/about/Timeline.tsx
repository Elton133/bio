"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { timeline, type TimelineEntry, type TimelineKind } from "../_data/timeline";

const filters: { label: string; kind: TimelineKind | null }[] = [{ label: "Everything", kind: null }, { label: "Roles", kind: "ROLE" }, { label: "Projects", kind: "PROJECT" }, { label: "Milestones", kind: "MILESTONE" }, { label: "Writing", kind: "WRITING" }];
const years = [...new Set(timeline.map(e => e.year))];

function Entry({ e, dim }: { e: TimelineEntry; dim: boolean }) {
  const body = <>
    <span className="mono timeline-meta"><b>{e.kind}</b>{e.when ?? e.year}{e.now && <em>NOW</em>}</span>
    <h3>{e.title}</h3>
    {e.place && <p className="timeline-place">{e.place}</p>}
    <p>{e.copy}</p>
    {e.href && <span className="mono timeline-open">{e.href.startsWith("http") ? "OPEN ↗" : "OPEN"} <HugeiconsIcon icon={ArrowRight01Icon} size={14} /></span>}
  </>;
  const className = `timeline-entry${dim ? " dim" : ""}${e.now ? " now" : ""}`;
  if (!e.href) return <li className={className}>{body}</li>;
  return <li className={className}>{e.href.startsWith("http")
    ? <a href={e.href} target="_blank" rel="noreferrer">{body}</a>
    : <Link href={e.href}>{body}</Link>}</li>;
}

export function Timeline() {
  const [kind, setKind] = useState<TimelineKind | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: .3 });
  return <section className="timeline-section">
    <header>
      <p className="mono">THE PATH / {timeline.length} MOMENTS</p>
      <h2>From a first degree to production systems.</h2>
      <div className="timeline-filters" role="group" aria-label="Filter the timeline">{filters.map(f => <button key={f.label} className={kind === f.kind ? "active" : ""} aria-pressed={kind === f.kind} onClick={() => setKind(f.kind)}>{f.label}</button>)}</div>
    </header>
    <div className="timeline-body" ref={ref}>
      <div className="timeline-rail" aria-hidden><motion.i style={{ scaleY: progress }} /></div>
      {years.map(y => <div className="timeline-year" key={y}>
        <span className="timeline-year-label">{y}</span>
        <ol>{timeline.filter(e => e.year === y).map(e => <Entry key={e.title} e={e} dim={kind !== null && e.kind !== kind} />)}</ol>
      </div>)}
    </div>
  </section>;
}
