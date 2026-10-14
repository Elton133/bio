import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { GsapReveal } from "../../_components/GsapReveal";
import { projects } from "../../_data/site";
import { ProjectMedia } from "../../_components/ProjectMedia";
import { caseExtras } from "../../_data/case-extras";
import { getSubstackPosts } from "../../_lib/feeds";
import type { Metadata } from "next";
export const revalidate=3600;
export async function generateMetadata({params}:{params:Promise<{project:string}>}):Promise<Metadata>{const {project:slug}=await params;const p=projects.find(x=>x.slug===slug);if(!p)return {};const title=p.name.split(" ").map(w=>w.length<=4?w:w[0]+w.slice(1).toLowerCase()).join(" ");return {title,description:p.summary,openGraph:{title,description:p.summary}}}
export function generateStaticParams(){return projects.map(project=>({project:project.slug}))}
export default async function ProjectPage({params}:{params:Promise<{project:string}>}){const {project:slug}=await params;const p=projects.find(x=>x.slug===slug);if(!p)notFound();const extras=caseExtras[p.slug];const related=extras?.writing?(await getSubstackPosts()).filter(post=>extras.writing!.some(w=>post.title.toLowerCase().includes(w))):[];const next=projects[(projects.indexOf(p)+1)%projects.length];return <main className="case-page" style={{"--project":p.accent,"--project-surface":p.surface,"--project-ink":p.ink} as React.CSSProperties}>
 <section className="case-hero"><div className="case-nav mono"><Link href="/work"><HugeiconsIcon icon={ArrowLeft01Icon} size={15}/> ALL WORK</Link><span>{p.id} / {p.year}</span></div><p className="mono">{p.type}</p><h1>{p.name}</h1><h2>{p.statement}</h2><div className="case-meta mono"><span>ROLE<br/><b>{p.role}</b></span><span>STATUS<br/><b>{p.status}</b></span><span>LOCATION<br/><b>GHANA</b></span></div></section>
 <section className={`case-visual ${["beagine","speakup","sabary"].includes(p.slug)?"has-media":""}`}><div className="case-media-frame"><ProjectMedia slug={p.slug} name={p.name} priority/><span className="mono">LIVE PRODUCT CAPTURE / {p.name}</span></div><div className="case-grid"/></section>
 <GsapReveal className="case-story"><p className="mono" data-reveal>01 / PURPOSE & CONTEXT</p><h2 data-reveal>{p.summary}</h2><div className="story-columns"><div data-reveal><span className="mono">THE PROBLEM</span><p>{p.problem}</p></div><div data-reveal><span className="mono">THE PROCESS</span><p>{p.process}</p></div></div></GsapReveal>
 {extras&&<section className="case-highlights">{extras.highlights.map(h=><div key={h.label}><b>{h.value}</b><span>{h.label}</span></div>)}</section>}
 {p.slug==="beagine"&&<section className="flow"><p className="mono">02 / SERVICE EXECUTION</p><div className="flow-line"><span>REQUEST</span><i/><span>DISCOVER</span><i/><span>DISPATCH</span><i/><span>EXECUTE</span></div><p className="scribble">real life refuses to be an API.</p></section>}
 <GsapReveal horizontal className="horizontal-case"><div data-track>{p.features.map((feature,i)=><article key={feature}><span className="mono">{String(i+1).padStart(2,"0")}</span><h3>{feature}</h3><div className="frame"><b>{p.id}.{i+1}</b><i/></div><p>{extras?.featureCopy[i]??`Part of the real product scope designed and developed for ${p.name}.`}</p></article>)}</div></GsapReveal>
 {related.length>0&&<section className="case-writing"><p className="mono">RELATED WRITING</p>{related.map(post=><a key={post.url} href={post.url} target="_blank" rel="noreferrer"><span className="mono">{post.date} · SUBSTACK</span><strong>{post.title}</strong><HugeiconsIcon icon={ArrowRight01Icon} size={22}/></a>)}</section>}
 <section className="tech-strip"><p className="mono">{p.tech.length?"TECHNOLOGY":"IMPLEMENTATION"}</p>{p.tech.length?p.tech.map(x=><span key={x}>{x}</span>):<span>Stack intentionally unpublished while the product remains in early concept development.</span>}</section>
 <Link className="next-project" href={`/work/${next.slug}`}><span className="mono">NEXT PROJECT</span><strong>{next.name}</strong><HugeiconsIcon icon={ArrowRight01Icon} size={42}/></Link>
 </main>}
