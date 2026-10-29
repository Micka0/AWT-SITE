import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { company, siteUrl } from "@/lib/site";
import "./globals.css";

const bricolage = localFont({
  src: "./fonts/bricolage-grotesque.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});
const instrument = localFont({
  src: "./fonts/instrument-sans.woff2",
  variable: "--font-instrument",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${company.name} | ${company.tagline}`, template: `%s | ${company.name}` },
  description: company.description,
  applicationName: company.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: company.name,
    title: `${company.name} | ${company.tagline}`,
    description: company.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: company.name }],
  },
  twitter: { card: "summary_large_image", title: company.name, description: company.description, images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#d92424",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* Applique le thème enregistré avant l’affichage pour éviter tout flash */
const themeScript = `try{var t=localStorage.getItem('awt-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${bricolage.variable} ${instrument.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-bg font-sans text-base text-fg antialiased">{children}</body>
    </html>
  );
}
