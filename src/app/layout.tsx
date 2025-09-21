import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurano - Talk your habits into existence",
  description: "Voice-powered accountability app that transforms your spoken intentions into organized action. Join the waitlist for early access.",
  keywords: ["productivity", "voice", "habits", "accountability", "tasks", "organization"],
  authors: [{ name: "Aurano Team" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  openGraph: {
    title: "Aurano - Talk your habits into existence",
    description: "Voice-powered accountability app that transforms your spoken intentions into organized action.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurano - Talk your habits into existence",
    description: "Voice-powered accountability app that transforms your spoken intentions into organized action.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
