"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { PageIntro } from "../_components/PageIntro";
import { projects } from "../_data/site";
import { ProjectMedia } from "../_components/ProjectMedia";
export default function Work(){return <main className="route-page work-page"><PageIntro index="01" kicker="SELECTED WORK" title={<>WORK<br/><span>IN MOTION.</span></>} note="products, systems, and useful trouble."/><section className="work-canvas">{projects.map((p,i)=><motion.div key={p.slug} className={`canvas-item item-${i+1}`} drag dragConstraints={{left:-80,right:80,top:-50,bottom:50}} dragElastic={.1}><Link href={`/work/${p.slug}`} data-cursor="VIEW ↗"><span className="mono">{p.id} / {p.type}</span><strong>{p.name}</strong><div className={`canvas-preview ${["beagine","speakup","sabary"].includes(p.slug)?"has-image":""}`} style={{"--project":p.accent} as React.CSSProperties}><ProjectMedia slug={p.slug} name={p.name}/><i/><b>{p.id}</b></div><HugeiconsIcon icon={ArrowUpRight01Icon} size={24}/></Link></motion.div>)}</section><section className="work-statement"><span className="mono">NO TEMPLATE / NO TWO STORIES ALIKE</span><h2>THE WORK IS<br/>THE EVIDENCE.</h2></section></main>}
