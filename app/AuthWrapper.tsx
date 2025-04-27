"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from "@/context/UserContext"; // Import useUser

// Component to check login status using context
// WARNING: This is still client-side only, not for production security.
export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, isLoading } = useUser(); // Use context state

  useEffect(() => {
    // Define protected routes
    const protectedRoutes = ['/dashboard', '/settings', '/onboarding', '/admin'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Wait for context to load
    if (isLoading) {
      return;
    }

    // If protected route and not logged in, redirect *within the effect*
    if (isProtectedRoute && !isLoggedIn) {
      console.log('AuthWrapper Effect: User not logged in, redirecting to /signup.');
      router.replace('/signup');
    }
  }, [pathname, router, isLoggedIn, isLoading]); // Effect runs when these change

  // Render logic: only show children if loading is done AND
  // (it's not a protected route OR the user is logged in)
  if (isLoading) {
     return null; // Show nothing while loading
  }

  const protectedRoutes = ['/dashboard', '/settings', '/onboarding', '/admin'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If it's protected and user is not logged in (after loading), render nothing
  // The redirect will have been initiated by the useEffect above.
  if (isProtectedRoute && !isLoggedIn) {
      return null;
  }

  // Otherwise, user is authorized OR it's not a protected route
  return <>{children}</>;
} 