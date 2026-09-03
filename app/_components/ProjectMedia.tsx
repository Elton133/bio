import Image from "next/image";

const media:Record<string,string>={beagine:"/beagine1.png",speakup:"/speakup1.png",sabary:"/sabary1.png"};

export function ProjectMedia({slug,name,priority=false}:{slug:string;name:string;priority?:boolean}){
  const src=media[slug];
  if(!src)return <span className="media-placeholder" aria-hidden/>;
  return <Image src={src} alt={`${name} product interface`} fill sizes="(max-width: 760px) 90vw, 70vw" priority={priority} className="project-image"/>;
}
