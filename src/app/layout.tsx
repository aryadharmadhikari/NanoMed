import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. IMPORT YOUR NAVBAR HERE
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NANOMED | Direct-to-Consumer Healthcare",
  description: "Premium mobility aids for the elderly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. PLACE THE NAVBAR AT THE TOP */}
        <Navbar />

        {/* This {children} is where your 'page.tsx' content goes */}
        {children}
      </body>
    </html>
  );
}
