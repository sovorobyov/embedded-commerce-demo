import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Montserrat, Manrope } from "next/font/google";
import "./globals.css";
import { AuthWrapper } from "./AuthWrapper";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "@/components/ui/sonner";
import { BrandingProvider } from "@/context/BrandingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${montserrat.variable} ${manrope.variable} antialiased`}
      >
        <BrandingProvider>
          <UserProvider>
            <AuthWrapper>{children}</AuthWrapper>
          </UserProvider>
        </BrandingProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
