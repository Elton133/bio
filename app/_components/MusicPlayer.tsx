"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  MusicNote03Icon,
  PauseIcon,
  PlayIcon,
  VolumeHighIcon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons";
import { soundtrack } from "../_data/music";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
};

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);
  const configured = soundtrack.src.trim().length > 0;

  const activeLyric = useMemo(() => {
    let index = -1;
    for (let i = 0; i < soundtrack.lyrics.length; i += 1) {
      if (soundtrack.lyrics[i].at <= currentTime) index = i;
      else break;
    }
    return index;
  }, [currentTime]);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const syncDuration = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };
    syncDuration();
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    return () => {
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("durationchange", syncDuration);
    };
  }, [configured]);

  useEffect(() => {
    if (open && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeLyric, open]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !configured || error) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <>
      {configured && (
        <audio
          ref={audioRef}
          src={soundtrack.src}
          preload="metadata"
          muted={muted}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => setError(true)}
        />
      )}

      <button
        className={`music-trigger ${playing ? "is-playing" : ""}`}
        onClick={() => setOpen(true)}
        aria-label={playing ? "Open music player, music is playing" : "Open music player"}
        aria-expanded={open}
      >
        <span className="music-eq" aria-hidden><i/><i/><i/></span>
        <HugeiconsIcon icon={configured ? VolumeHighIcon : MusicNote03Icon} size={19}/>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="music-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.section
              className="music-player"
              role="dialog"
              aria-modal="true"
              aria-labelledby="music-player-title"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: .35, ease: [.22, 1, .36, 1] }}
            >
              <header className="music-head">
                <span className="mono">SOUNDTRACK / LIVE LYRICS</span>
                <button onClick={() => setOpen(false)} aria-label="Close music player">
                  <HugeiconsIcon icon={Cancel01Icon} size={22}/>
                </button>
              </header>

              {!configured ? (
                <div className="music-empty">
                  <HugeiconsIcon icon={MusicNote03Icon} size={34}/>
                  <p className="mono">TRACK INCOMING</p>
                  <h2 id="music-player-title">The soundtrack is<br/>being tuned.</h2>
                  <span>Check back soon for music and live lyrics.</span>
                </div>
              ) : (
                <>
                  <div className="music-meta">
                    <div>
                      <span className="mono">NOW PLAYING</span>
                      <h2 id="music-player-title">{soundtrack.title}</h2>
                      <p>{soundtrack.artist}</p>
                    </div>
                    <button className="music-play" onClick={togglePlayback} disabled={error} aria-label={playing ? "Pause" : "Play"}>
                      <HugeiconsIcon icon={playing ? PauseIcon : PlayIcon} size={28}/>
                    </button>
                  </div>

                  <div className="music-timeline">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      step="0.01"
                      value={Math.min(currentTime, duration || 0)}
                      onChange={(event) => seek(Number(event.target.value))}
                      aria-label="Track position"
                      style={{ "--progress": `${duration ? (currentTime / duration) * 100 : 0}%` } as React.CSSProperties}
                    />
                    <div className="mono"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
                  </div>

                  <div className="lyrics" aria-live="polite">
                    {soundtrack.lyrics.length ? soundtrack.lyrics.map((line, index) => (
                      <button
                        key={`${line.at}-${line.text}`}
                        ref={index === activeLyric ? activeRef : undefined}
                        className={index === activeLyric ? "active" : index < activeLyric ? "past" : ""}
                        onClick={() => seek(line.at)}
                      >
                        <span className="mono">{formatTime(line.at)}</span>
                        <b>{line.text}</b>
                      </button>
                    )) : <p className="lyrics-empty">Lyrics will appear here once they&apos;re timed.</p>}
                  </div>

                  <div className="music-actions">
                    <button onClick={() => setMuted(value => !value)} aria-label={muted ? "Unmute" : "Mute"}>
                      <HugeiconsIcon icon={muted ? VolumeOffIcon : VolumeHighIcon} size={20}/>
                      <span>{muted ? "UNMUTE" : "MUTE"}</span>
                    </button>
                    {error && <span className="music-error">Audio could not be loaded.</span>}
                  </div>
                </>
              )}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
