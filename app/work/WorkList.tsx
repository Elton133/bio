"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { projects } from "../_data/site";
import { ProjectMedia } from "../_components/ProjectMedia";
const withMedia=["beagine","speakup","sabary"];
export function WorkList(){return <>
 <section className="work-list"><p className="mono work-list-head"><span>SELECTED PROJECTS</span><span>{String(projects.length).padStart(2,"0")} TOTAL</span></p>
 {projects.map(p=><motion.div key={p.slug} initial={{opacity:0,y:60}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-12% 0px"}} transition={{duration:.8,ease:[.2,.8,.2,1]}}>
  <Link className="work-row" href={`/work/${p.slug}`} data-cursor="VIEW ↗" style={{"--project":p.accent,"--project-surface":p.surface,"--project-ink":p.ink} as React.CSSProperties}>
   <div className={`work-media${withMedia.includes(p.slug)?"":" is-empty"}`}><ProjectMedia slug={p.slug} name={p.name}/>{!withMedia.includes(p.slug)&&<div className="work-media-fallback"><b>{p.id}</b><span className="mono">{p.statement}</span></div>}</div>
   <div className="work-info"><p className="mono"><b>{p.id} / {p.type}</b>{p.year}</p><h2>{p.name}</h2><p className="work-summary">{p.summary}</p><p className="work-role">{p.role}</p>{p.tech.length>0&&<ul>{p.tech.slice(0,4).map(t=><li key={t}>{t}</li>)}{p.tech.length>4&&<li>+{p.tech.length-4}</li>}</ul>}<span className="work-cta mono">VIEW CASE STUDY <HugeiconsIcon icon={ArrowRight01Icon} size={16}/></span></div>
  </Link></motion.div>)}
 </section>
</>}
