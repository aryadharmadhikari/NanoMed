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
  title: "NanoMed",
  description: "Recovery deserves care, comfort, and confidence.",
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