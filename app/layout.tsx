import PageLoadingBar from "@/components/page-loading-bar";
import { QueryProviders } from "@/providers/QueryProviders";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADN Dashboard",
  description: "ADN Call Agent Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageLoadingBar />
        <QueryProviders>
          {children}

          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster richColors />
        </QueryProviders>
      </body>
    </html>
  );
}
