"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Simple component to check login status on client-side
// WARNING: This is NOT secure and only for demo purposes.
export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check only on specific dashboard-related paths
    const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/settings') || pathname.startsWith('/onboarding') || pathname.startsWith('/admin');

    if (isProtectedRoute) {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) {
        console.log('User not logged in, redirecting to /signup');
        router.replace('/signup'); // Use replace to avoid adding to history
      } else {
        setIsChecking(false); // Logged in, allow rendering
      }
    } else {
      setIsChecking(false); // Not a protected route, allow rendering
    }
  }, [pathname, router]);

  // Show nothing or a loader while checking
  if (isChecking && (pathname.startsWith('/dashboard') || pathname.startsWith('/settings') || pathname.startsWith('/onboarding') || pathname.startsWith('/admin'))) {
    return null; // Or return a loading spinner component
  }

  return <>{children}</>;
} 