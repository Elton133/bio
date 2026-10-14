import type { Metadata } from "next";
export const metadata: Metadata = { title: "Lab", description: "Interactive experiments and small playful builds." };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
