import type {Metadata} from "next";import Link from "next/link";import {HugeiconsIcon} from "@hugeicons/react";import {ArrowUpRight01Icon} from "@hugeicons/core-free-icons";import {PageIntro} from "../_components/PageIntro";import {notes} from "../_data/site";import {linkedinPosts} from "../_data/linkedin";import {getSubstackPosts,SUBSTACK_URL} from "../_lib/feeds";
export const revalidate=3600;
export const metadata:Metadata={title:"Notes",description:"Build logs and notes on product engineering, real-time systems and working across the stack."};
type Entry={key:string;title:string;date:string;summary:string;meta:string;source:string;href:string;external:boolean};
export default async function Notes(){
 const substack=await getSubstackPosts();
 const entries:Entry[]=[
  ...notes.map(n=>({key:n.slug,title:n.title,date:n.date,summary:n.lead,meta:`${n.read} READ`,source:n.topic,href:`/notes/${n.slug}`,external:false})),
  ...substack.map(p=>({key:p.url,title:p.title,date:p.date,summary:p.summary,meta:"ON SUBSTACK ↗",source:"BUILD LOG",href:p.url,external:true})),
  ...linkedinPosts.map(p=>({key:p.url,title:p.title,date:p.date,summary:p.summary??"",meta:"ON LINKEDIN ↗",source:"POST",href:p.url,external:true})),
 ].sort((a,b)=>b.date.localeCompare(a.date));
 return <main className="route-page notes-page"><PageIntro index="05" kicker="ENGINEER'S NOTEBOOK" title={<>THINKING<br/><span>OUT LOUD.</span></>} note="subject to revision, like most good systems."/>
 <section className="notes-index"><p className="mono notes-head"><span>{String(entries.length).padStart(2,"0")} ENTRIES</span><a href={SUBSTACK_URL} target="_blank" rel="noreferrer">SUBSCRIBE ON SUBSTACK ↗</a></p>
 {entries.map((n,i)=>{const body=<><span className="mono"><b>{String(i+1).padStart(2,"0")} / {n.source}</b>{n.date} · {n.meta}</span><div><h2>{n.title}</h2>{n.summary&&<p>{n.summary}</p>}</div><HugeiconsIcon icon={ArrowUpRight01Icon} size={25}/></>;return n.external?<a key={n.key} href={n.href} target="_blank" rel="noreferrer" data-cursor="READ ↗">{body}</a>:<Link key={n.key} href={n.href} data-cursor="READ ↗">{body}</Link>})}
 </section></main>}
