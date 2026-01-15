import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Import the footer
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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