import type { Metadata } from "next";

import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";
import NavbarNoUser from "@/components/NavbarNoUser";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Kostrakt",
  description: "Freelancing Web-app",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarNoUser />  
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
