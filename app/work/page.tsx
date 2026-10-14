import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { PageIntro } from "../_components/PageIntro";
import { getFeaturedRepos, GITHUB_USER } from "../_lib/feeds";
import { WorkList } from "./WorkList";
export const revalidate=3600;
export const metadata:Metadata={title:"Work",description:"Selected products and systems: Beagine, SGMS, SpeakUp, Sabary Tours and Utility Finder."};
export default async function Work(){const {repos}=await getFeaturedRepos();return <main className="route-page work-page"><PageIntro index="01" kicker="SELECTED WORK" title={<>WORK<br/><span>IN MOTION.</span></>} note="products, systems, and useful trouble."/>
 <WorkList/>
 {repos.length>0&&<section className="repo-archive"><header><p className="mono">MORE ON GITHUB</p><h2>Smaller builds, experiments and client sites.</h2><a className="mono" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">ALL REPOSITORIES <HugeiconsIcon icon={ArrowUpRight01Icon} size={14}/></a></header>
 <ul>{repos.map(r=><li key={r.name}><a href={r.homepage??r.url} target="_blank" rel="noreferrer"><span className="mono">{[r.language,r.updated].filter(Boolean).join(" · ")}</span><strong>{r.title}</strong>{r.description&&<p>{r.description}</p>}</a><div className="mono">{r.homepage&&<a href={r.homepage} target="_blank" rel="noreferrer">LIVE ↗</a>}<a href={r.url} target="_blank" rel="noreferrer">CODE ↗</a></div></li>)}</ul></section>}
 <section className="work-statement"><span className="mono">NO TEMPLATE / NO TWO STORIES ALIKE</span><h2>THE WORK IS<br/>THE EVIDENCE.</h2></section></main>}
