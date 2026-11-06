import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import siteData from "@/data/site.json";
import AppShell from "@/components/layout/AppShell";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://ziaglass.com"),
  title: {
    default: `${siteData.name} — ${siteData.tagline}`,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.description,
  keywords: [
    "furniture Nairobi",
    "olivewood furniture",
    "fluted mirror",
    "handcrafted furniture",
    "Karen atelier",
    "sustainable hardwood",
  ],
  authors: [{ name: `${siteData.name} Atelier` }],
  creator: siteData.name,
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://ziaglass.com",
    siteName: siteData.name,
    title: `${siteData.name} — ${siteData.tagline}`,
    description: siteData.description,
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQK-Al__JESlHMIHx8WDnVzs6bgsnsesr2bn3qKgKFYRAU2JeIO7IHqOoX6cAbNLVybXzy1BGBiEq2UzAn2mo8-ErmZ4QkXP1tINWPQEAT-uwYF16WNl3388wW6Q6bzIM_0-be2V23QkwWo0AEKUIbEQZWMiY7iwwyrH07OgswEoFby-Tcx0BIYaFAuQuZv2p3UvCtp-hDpXao3IrbpYBq8mjJkalQmAPKkxkQt7Bm",
        width: 1200,
        height: 630,
        alt: `${siteData.name} living space with handcrafted olivewood furniture and fluted glass partitions`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.name} — ${siteData.tagline}`,
    description: siteData.description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-cream font-sans text-body text-ink min-h-screen flex flex-col selection:bg-oak/20 selection:text-ink">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
