import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

// The renderer can't load variable fonts, so static Regular/Bold instances of the site font live in ./fonts.
const font = (file: string) => readFile(join(process.cwd(), "app/_lib/fonts", file));

// Shared social preview card: kicker, big title, optional subtitle, accent footer bar.
export async function ogCard({ kicker, title, subtitle, accent = "#caff38", surface = "#070707", ink = "#e8e8e2" }: { kicker: string; title: string; subtitle?: string; accent?: string; surface?: string; ink?: string }) {
  const [regular, bold] = await Promise.all([font("GoogleSansFlex-Regular.ttf"), font("GoogleSansFlex-Bold.ttf")]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: surface, color: ink, fontFamily: "Google Sans Flex" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3, opacity: 0.7 }}>
          <span>{kicker}</span>
          <span>ELTON JOHN MORDEN</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: title.length > 40 ? 64 : 104, lineHeight: 1.05, letterSpacing: -2, fontWeight: 700, maxWidth: 1000 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 28, lineHeight: 1.4, opacity: 0.75, maxWidth: 900 }}>{subtitle}</div>}
        </div>
        <div style={{ display: "flex", height: 10, width: 160, background: accent }} />
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Google Sans Flex", data: regular, weight: 400, style: "normal" }, { name: "Google Sans Flex", data: bold, weight: 700, style: "normal" }] },
  );
}
