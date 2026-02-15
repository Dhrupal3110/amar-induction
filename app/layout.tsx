import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amar Induction - Precision Through Induction | Induction Melting & Hardening Solutions",
  description:
    "Leading manufacturer and exporter of advanced induction melting and hardening solutions. Specializing in induction melting machines, hardening systems, and custom industrial solutions worldwide.",
  keywords:
    "induction melting, induction hardening, industrial heating, metal processing, manufacturing, export, induction systems",
  authors: [{ name: "Amar Induction" }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico', // The classic ICO file
    apple: '/apple-icon.png', // The Apple touch icon
  },

  // Optional: For Progressive Web App (PWA) features
  manifest: '/manifest.json',
  openGraph: {
    title: "Amar Induction - Precision Through Induction",
    description:
      "Leading manufacturer and exporter of advanced induction melting and hardening solutions for industrial applications worldwide.",
    url: "https://amarinduction.com",
    siteName: "Amar Induction",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Amar Induction - Industrial Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amar Induction - Precision Through Induction",
    description:
      "Leading manufacturer and exporter of advanced induction melting and hardening solutions.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-background text-foreground selection:bg-primary selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
