import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import SmoothScroll from "@/components/SmoothScroll";
import { PageTransitionProvider } from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.winterbrook.ie"),
  title: {
    default: "Winterbrook — Homebuilding for over 40 years",
    template: "%s | Winterbrook",
  },
  description:
    "Winterbrook is a family-owned Irish property developer creating exceptional, architecturally distinctive homes across Dublin and Wicklow for over 40 years.",
  icons: { icon: "/images/logo.svg" },
  alternates: { canonical: "./" },
  openGraph: {
    siteName: "Winterbrook",
    type: "website",
    locale: "en_IE",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" className={`${cormorant.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        {/* Flag JS availability before paint so reveal styles never flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('no-motion');`,
          }}
        />
      </head>
      <body className="ambient">
        <Preloader />
        <SmoothScroll>
          <PageTransitionProvider>
            <Cursor />
            <ScrollProgress />
            <Header />
            <main id="main" className="relative z-[1]">
              {children}
            </main>
            <Footer />
          </PageTransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
