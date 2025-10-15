import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/HeaderFooter/Header";
import Footer from "@/components/HeaderFooter/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "@/components/ui/sonner";
import WishlistProvider from "@/providers/WishlistProvider";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Roiser - Furniture Store",
  description: "Your online Furniture Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} antialiased`}>
        <CartProvider>
          <WishlistProvider>
            <Header />
            {children}
            <Footer />
          </WishlistProvider>
        </CartProvider>
        <Toaster richColors theme="light" />
      </body>
    </html>
  );
}
