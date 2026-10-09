import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "বাংলা বাজার দর tracking web application - প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="bazardor" className={hindSiliguri.variable}>
      <body className="font-bengali min-h-screen flex flex-col">
        <Navbar />
        <PriceTicker />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "Hind Siliguri, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
