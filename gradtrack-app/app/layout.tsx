import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GradTrack - AI Productivity Assistant",
  description: "AI-powered productivity assistant for college students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
