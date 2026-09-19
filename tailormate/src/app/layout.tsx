import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TailorMate — Modern Tailoring Management",
  description: "TailorMate helps tailoring businesses manage customers, measurements, clothing orders, payments and staff from one simple workspace.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/tailormate_icon.png", type: "image/png" },
    ],
    shortcut: "/images/tailormate_icon.png",
    apple: "/images/tailormate_icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#faf7f2] text-[#1c1917] font-sans antialiased selection:bg-[#e8dcce] selection:text-[#1c1917]">
        {children}
      </body>
    </html>
  );
}
