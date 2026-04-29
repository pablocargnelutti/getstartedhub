import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "GetStartedHub - Guías y Tutoriales",
    template: "%s | GetStartedHub",
  },
  description:
    "Descubre guías completas, tutoriales y recursos para aprender desarrollo web, programación y tecnología.",
  keywords:
    "tutoriales, guías, desarrollo web, programación, tecnología, aprender",
  authors: [{ name: "GetStartedHub" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://getstartedhub.com",
    siteName: "GetStartedHub",
    title: "GetStartedHub - Guías y Tutoriales",
    description:
      "Descubre guías completas, tutoriales y recursos para aprender desarrollo web, programación y tecnología.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetStartedHub - Guías y Tutoriales",
    description:
      "Descubre guías completas, tutoriales y recursos para aprender desarrollo web, programación y tecnología.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXX"}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
