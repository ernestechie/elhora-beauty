import NextAuthSessionProvider from "@/components/providers/NextAuthSessionProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elhora Beauty",
  description: "Your glam, our number one priority!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  );
}
