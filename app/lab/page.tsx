"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { PageIntro } from "../_components/PageIntro";
const experiments=["TYPE GRAVITY","CURSOR FIELD","NOISE MACHINE","ORBIT_04","USELESS BUTTON"];
export default function Lab(){const [active,setActive]=useState(0);const [point,setPoint]=useState({x:50,y:50});return <main className="route-page lab-page"><PageIntro index="02" kicker="THE LAB" title={<>THINGS I BUILT<br/><span>BECAUSE I COULD.</span></>} note="some were actually useful."/><section className="lab-console"><div className="lab-list">{experiments.map((x,i)=><button className={active===i?"active":""} onClick={()=>setActive(i)} key={x}><span className="mono">0{i+1}</span>{x}</button>)}</div><div className={`lab-stage experiment-${active}`} onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();setPoint({x:(e.clientX-r.left)/r.width*100,y:(e.clientY-r.top)/r.height*100})}} style={{"--mx":`${point.x}%`,"--my":`${point.y}%`} as React.CSSProperties}>
 {active===0&&<div className="gravity-words">{["BUILD","BREAK","LEARN","SHIP"].map((x,i)=><motion.span drag dragConstraints={{left:-180,right:180,top:-180,bottom:180}} initial={{y:-120}} animate={{y:i*62,rotate:i%2?4:-3}} transition={{type:"spring",delay:i*.12}} key={x}>{x}</motion.span>)}</div>}
 {active===1&&<><div className="field-dot"/><div className="field-ring"/><p>MOVE THROUGH THE FIELD</p></>}
 {active===2&&<div className="noise"><b>GENERATIVE<br/>SIGNAL</b></div>}
 {active===3&&<div className="orbit"><i/><i/><i/><b>04</b></div>}
 {active===4&&<button className="useless" onClick={e=>{e.currentTarget.style.transform=`translate(${Math.random()*180-90}px,${Math.random()*180-90}px)`}}>DO NOT PRESS</button>}
 <span className="lab-coords mono">X {point.x.toFixed(0)} / Y {point.y.toFixed(0)}</span></div></section><div className="lab-marquee"><span>BUILD / BREAK / UNDERSTAND / REPEAT / BUILD / BREAK / UNDERSTAND / REPEAT /</span></div></main>}
