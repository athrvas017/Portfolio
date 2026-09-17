import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Athrva Sarade | Portfolio | VJTI Computer Engineering",
  description:
    "Engineering portfolio of Athrva Sarade (VJTI Computer Engineering '28). Systems, AI/ML classifiers, graph traversal engines, and backend architectures.",
  keywords: [
    "Athrva Sarade",
    "VJTI Mumbai",
    "Software Engineer Portfolio",
    "AI ML Engineer",
    "GSoC",
    "NetShield",
    "SupplyLens360",
    "Graph Algorithms",
  ],
  authors: [{ name: "Athrva Sarade" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-ss-background text-ss-on-surface antialiased min-h-screen flex flex-col selection:bg-ss-primary/20 selection:text-ss-primary">
        <main className="flex-1 w-full min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
