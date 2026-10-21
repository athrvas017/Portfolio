import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { AnsIntroLoader } from "@/components/intro/AnsIntroLoader";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
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
  title: "Athrva Sarade | AI Engineer & Systems Architecture OS",
  description:
    "AI Systems Engineer & Computer Engineering at VJTI Mumbai. Engineering autonomous multi-agent pipelines, specialized inference optimization, graph risk engines, and security classifiers.",
  keywords: [
    "Athrva Sarade",
    "AI Engineer",
    "Agentic AI",
    "Systems Architecture",
    "VJTI Mumbai",
    "NetShield",
    "SupplyLens360",
    "Model Registry",
    "Agent Lab",
  ],
  authors: [{ name: "Athrva Sarade" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link
          rel="preload"
          href="/videos/ans-intro.mp4"
          as="video"
          type="video/mp4"
        />
      </head>
      <body className="bg-[#101113] text-[#F0EDE6] antialiased min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
        <AnsIntroLoader />
        <main className="flex-1 w-full min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

