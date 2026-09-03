import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
export function PageIntro({index,kicker,title,note}:{index:string;kicker:string;title:React.ReactNode;note?:string}){return <section className="page-intro"><div className="page-kicker mono"><span>{index} / {kicker}</span><Link href="/"><HugeiconsIcon icon={ArrowLeft01Icon} size={15}/> RETURN HOME</Link></div><h1>{title}</h1>{note&&<p className="scribble">{note}</p>}<HugeiconsIcon className="intro-arrow" icon={ArrowDown01Icon} size={24}/></section>}
