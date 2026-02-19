import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";
import AnnouncementBar from "../components/AnnouncementBar";
import WhatsAppFAB from "../components/WhatsAppFAB";
import { League_Spartan, Manrope } from "next/font/google";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-spartan",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://nanomed.in'), // Update with actual domain
  title: {
    default: "NanoMed | Premium Medical Equipment for Home Care",
    template: "%s | NanoMed"
  },
  description: "NanoMed provides high-quality medical equipment designed for dignity and comfort. Shop mobility aids, commode chairs, and more with free shipping in Mumbai.",
  keywords: ["medical equipment", "elderly care", "mobility aids", "wheelchairs", "walking sticks", "commode chairs", "home healthcare", "mumbai"],
  openGraph: {
    title: "NanoMed | Premium Medical Equipment",
    description: "Recovery deserves care, comfort, and confidence. Discover our range of elderly care products.",
    url: 'https://nanomed.in',
    siteName: 'NanoMed',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NanoMed | Premium Medical Equipment",
    description: "Recovery deserves care, comfort, and confidence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${manrope.variable}`}>
      <body className="font-body antialiased text-gray-900">
        <AnnouncementBar />
        <WhatsAppFAB />
        <Navbar />
        {/* The "min-h-screen" ensures the footer stays at the bottom */}
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}