// Remove "use client" if no longer needed, or keep if other client logic exists
// "use client";

import Link from "next/link";
// No longer need useEffect or useUser here
// import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
// import { useUser } from "@/context/UserContext";

export default function LandingPage() {
  // Remove the useEffect that called logout
  // const { logout } = useUser();
  // useEffect(() => {
  //   logout(false);
  // }, [logout]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-grow flex-col items-center justify-center p-8 sm:p-16 md:p-24">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
             The Future-Ready E-commerce Platform
           </h1>
           <p className="text-lg text-muted-foreground mb-8">
             Unlock growth with a flexible, scalable, and powerful platform designed
             for modern commerce. Leverage our integrated Payments solution for seamless transactions.
           </p>
           <Link href="/signup" passHref className="mb-16 inline-block">
             <Button size="lg">Get Started for Free</Button>
           </Link>
         </div>
 
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          <Card>
            <CardHeader>
              <CardTitle>Unmatched Flexibility</CardTitle>
              <CardDescription>API-first & Headless</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Customize every aspect of your store. Integrate best-of-breed tools and build unique experiences with open APIs.</p>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Built to Scale</CardTitle>
              <CardDescription>From Startup to Enterprise</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Grow without limits. Our platform handles increasing traffic and complex catalogs effortlessly.</p>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>B2B & B2C Unified</CardTitle>
              <CardDescription>Serve All Your Customers</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Manage both wholesale and direct-to-consumer operations from a single, powerful backend.</p>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Streamlined Operations</CardTitle>
              <CardDescription>Automate & Optimize</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Reduce manual effort with visual workflow builders and rule engines for pricing, shipping, and more.</p>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Peak Performance</CardTitle>
              <CardDescription>Reliable & Fast</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Benefit from industry-leading uptime and optimized page speeds for better conversions.</p>
            </CardContent>
          </Card>
  
           <Card>
            <CardHeader>
              <CardTitle>Global Reach</CardTitle>
              <CardDescription>Expand Internationally</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Easily manage multiple currencies, languages, and storefronts to sell across borders.</p>
            </CardContent>
          </Card>
         </div>
      </main>
    </div>
  );
}
