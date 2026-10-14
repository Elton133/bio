import type { Metadata } from "next";
export const metadata: Metadata = { title: "Stack", description: "The tools I use in production, and the projects where each one earned its place." };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
