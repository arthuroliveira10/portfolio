import type { Metadata, Viewport } from "next";
import "@fontsource/chakra-petch/500.css";
import "@fontsource/chakra-petch/600.css";
import "@fontsource/chakra-petch/700.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arthur Oliveira · Engenheiro de Software com foco em IA",
  description:
    "Portfólio de Arthur Oliveira: projetos de IA aplicada com LLMs (Groq, Gemini), Next.js, TypeScript e Python/FastAPI.",
  openGraph: {
    title: "Arthur Oliveira · Engenheiro de Software com foco em IA",
    description: "Projetos de IA aplicada com LLMs, Next.js e Python/FastAPI.",
    images: ["/img/pm-landing.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e16",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="bg-hud" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
