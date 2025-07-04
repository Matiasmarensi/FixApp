import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster as Sonner, ToasterProps } from "sonner";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "FixApp",
    template: "%s | FixApp Web",
  },
  description: "Aplication FixApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="bottom-right" richColors closeButton duration={5000} className="z-50" />
        </ThemeProvider>
      </body>
    </html>
  );
}
