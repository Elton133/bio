"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GsapReveal({children,className="",horizontal=false}:{children:React.ReactNode;className?:string;horizontal?:boolean}){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduce||!ref.current)return;
    const ctx=gsap.context(()=>{
      if(horizontal){
        const track=ref.current?.querySelector<HTMLElement>("[data-track]");
        if(!track)return;
        gsap.to(track,{x:()=>-(track.scrollWidth-window.innerWidth+window.innerWidth*.08),ease:"none",scrollTrigger:{trigger:ref.current,start:"top top",end:()=>`+=${track.scrollWidth}`,scrub:1,pin:true,invalidateOnRefresh:true}});
      } else {
        gsap.fromTo(ref.current?.querySelectorAll("[data-reveal]")||[],{y:80,clipPath:"inset(0 0 100% 0)"},{y:0,clipPath:"inset(0 0 0% 0)",duration:1.1,stagger:.09,ease:"power4.out",scrollTrigger:{trigger:ref.current,start:"top 82%"}});
      }
    },ref);
    return()=>ctx.revert();
  },[horizontal]);
  return <div ref={ref} className={className}>{children}</div>;
}
