"use client";
// Live visitors: online count everywhere; cursors and reactions on desktop for visitors who allow motion.
// Uses Supabase Realtime presence + broadcast only. Nothing is written to a database.
// Turned off entirely unless NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createClient, type RealtimeChannel } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = url && key ? createClient(url, key, { realtime: { params: { eventsPerSecond: 15 } } }) : null;

const REACTIONS = ["🔥", "👏", "👀"];
const CURSOR_EVERY_MS = 80;
const CURSOR_STALE_MS = 6000;

type Peer = { x: number; pageY: number; label: string; path: string; seen: number };
type Burst = { id: string; emoji: string; x: number };

export function LivePresence({ path, onCount }: { path: string; onCount: (n: number) => void }) {
  const [peers, setPeers] = useState<Record<string, Peer>>({});
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [rich, setRich] = useState(false);
  const [, setScroll] = useState(0);
  const channel = useRef<RealtimeChannel | null>(null);
  const me = useRef({ id: "", label: "Someone" });
  const pathRef = useRef(path);
  useEffect(() => { pathRef.current = path; }, [path]);

  useEffect(() => {
    if (!supabase) return;
    const fine = window.matchMedia("(pointer: fine) and (min-width: 761px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setRich(fine.matches && !calm.matches);
    update(); fine.addEventListener("change", update); calm.addEventListener("change", update);

    me.current.id = crypto.randomUUID();
    const ch = supabase.channel("site-presence", { config: { presence: { key: me.current.id }, broadcast: { self: false } } });
    channel.current = ch;
    ch.on("presence", { event: "sync" }, () => onCount(Object.keys(ch.presenceState()).length))
      .on("presence", { event: "leave" }, ({ key: gone }) => setPeers(p => { const n = { ...p }; delete n[gone]; return n; }))
      .on("broadcast", { event: "cursor" }, ({ payload }) => setPeers(p => ({ ...p, [payload.id]: { ...payload, seen: Date.now() } })))
      .on("broadcast", { event: "react" }, ({ payload }) => addBurst(payload.emoji, payload.x))
      .subscribe(async status => {
        if (status !== "SUBSCRIBED") return;
        const { city } = await fetch("/api/whereami").then(r => r.json()).catch(() => ({ city: null }));
        me.current.label = city ? `Someone in ${city}` : "Someone";
        await ch.track({ online_at: Date.now() });
      });

    const sweep = setInterval(() => setPeers(p => Object.fromEntries(Object.entries(p).filter(([, v]) => Date.now() - v.seen < CURSOR_STALE_MS))), 2000);
    return () => { clearInterval(sweep); fine.removeEventListener("change", update); calm.removeEventListener("change", update); channel.current = null; supabase.removeChannel(ch); };
  }, [onCount]);

  // Send our cursor, throttled; rerender on scroll so other cursors stay pinned to page content.
  useEffect(() => {
    if (!rich) return;
    let last = 0;
    const move = (e: MouseEvent) => {
      const now = Date.now();
      if (now - last < CURSOR_EVERY_MS || !channel.current) return;
      last = now;
      channel.current.send({ type: "broadcast", event: "cursor", payload: { id: me.current.id, label: me.current.label, path: pathRef.current, x: e.clientX / window.innerWidth, pageY: e.clientY + window.scrollY } });
    };
    const scroll = () => setScroll(window.scrollY);
    window.addEventListener("mousemove", move); window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("scroll", scroll); };
  }, [rich]);

  function addBurst(emoji: string, x: number) {
    const id = crypto.randomUUID();
    setBursts(b => [...b.slice(-12), { id, emoji, x }]);
    setTimeout(() => setBursts(b => b.filter(v => v.id !== id)), 2600);
  }
  function react(emoji: string) {
    const x = .55 + Math.random() * .35;
    addBurst(emoji, x);
    channel.current?.send({ type: "broadcast", event: "react", payload: { emoji, x } });
  }

  if (!supabase || !rich) return null;
  const here = Object.entries(peers).filter(([, p]) => p.path === path);
  return <>
    <div className="live-cursors" aria-hidden>
      {here.map(([id, p]) => <motion.div key={id} className="live-cursor" initial={false} animate={{ x: p.x * window.innerWidth, y: p.pageY - window.scrollY }} transition={{ type: "spring", stiffness: 300, damping: 30, mass: .4 }}><i /><span className="mono">{p.label}</span></motion.div>)}
    </div>
    <div className="live-bursts" aria-hidden><AnimatePresence>{bursts.map(b => <motion.span key={b.id} style={{ left: `${b.x * 100}%` }} initial={{ y: 0, opacity: 0, scale: .6 }} animate={{ y: -260, opacity: [0, 1, 1, 0], scale: 1.2, rotate: (b.x - .7) * 40 }} exit={{ opacity: 0 }} transition={{ duration: 2.4, ease: "easeOut" }}>{b.emoji}</motion.span>)}</AnimatePresence></div>
    <div className="live-react" role="group" aria-label="Send a reaction to everyone on the site">{REACTIONS.map(e => <button key={e} onClick={() => react(e)} aria-label={`Send ${e}`}>{e}</button>)}</div>
  </>;
}
