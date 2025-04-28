'use client'; // Required for next/script

import Script from 'next/script'; // Import Script
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/40">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:px-6 sm:py-4 md:gap-8 overflow-auto">
          {children}
        </main>
      </div>
      {/* Load PayPal SDK globally for the dashboard */}
      <Script
        src="https://www.paypalobjects.com/sdk/v1/js/sandbox.partner.js"
        strategy="lazyOnload" // Load when browser is idle
      />
    </div>
  );
} 