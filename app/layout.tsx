import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Amar Induction - Precision Through Induction | Induction Melting & Hardening Solutions",
  description:
    "Leading manufacturer and exporter of advanced induction melting and hardening solutions. Specializing in induction melting machines, hardening systems, and custom industrial solutions worldwide.",
  keywords:
    "induction melting, induction hardening, industrial heating, metal processing, manufacturing, export, induction systems",
  authors: [{ name: "Amar Induction" }],
  openGraph: {
    title: "Amar Induction - Precision Through Induction",
    description:
      "Leading manufacturer and exporter of advanced induction melting and hardening solutions for industrial applications worldwide.",
    url: "https://amarinduction.com",
    siteName: "Amar Induction",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
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
    description: "Leading manufacturer and exporter of advanced induction melting and hardening solutions.",
    images: ["/placeholder.svg?height=630&width=1200"],
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://amarinduction.com" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
