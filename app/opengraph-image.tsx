import { ogCard, ogSize } from "./_lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Elton John Morden — Software Engineer";
export default function Image() {
  return ogCard({ kicker: "PORTFOLIO / ACCRA, GHANA", title: "Software engineer, product builder and founder.", subtitle: "Production web and mobile applications, increasingly across backend, cloud and AI-powered systems." });
}
