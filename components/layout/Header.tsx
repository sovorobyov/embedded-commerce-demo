"use client"; // Needed for useUser hook

import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname
import { useUser } from '@/context/UserContext'; // Import useUser hook
import { useBranding } from '@/context/BrandingContext'; // Import useBranding hook
import { Button } from "@/components/ui/button"; // Import Button

export function Header() {
  const router = useRouter(); // Initialize router
  const pathname = usePathname(); // Get current pathname
  const { user, isLoggedIn, isLoading: userLoading, login } = useUser(); // Get user, isLoggedIn flag, and login function
  const { activeTheme } = useBranding(); // Get active theme

  // Determine logo dimensions based on active theme
  let logoWidth = 40; // Default width
  const logoHeight = 40; // Increased height

  if (activeTheme.id === 'bigcommerce') {
    logoWidth = 150;
  } else if (activeTheme.id === 'miva') {
    logoWidth = 90;
  } else if (activeTheme.id === 'shopware') {
    logoWidth = 130;
  } else if (activeTheme.id === null) { // Default/FluxCart
     logoWidth = 40; // Keep default width for assumed square logo
  }

  // Handle simulated login click with detailed logging
  const handleLoginClick = () => {
    console.log("[Header] handleLoginClick triggered.");
    try {
      const storedUserData = localStorage.getItem('userData');
      console.log("[Header] storedUserData:", storedUserData);
      if (storedUserData) {
        console.log("[Header] Found storedUserData, parsing...");
        const userData = JSON.parse(storedUserData);
        console.log("[Header] Parsed userData:", userData);
        const loginData = {
            firstName: userData.firstName || 'Demo',
            lastName: userData.lastName || 'User',
            email: userData.email || 'demo@example.com'
        };
        console.log("[Header] Calling login function with:", loginData);
        login(loginData);
        router.push('/dashboard');
      } else {
        console.warn("[Header] No storedUserData found. Logging in default user.");
        login({ firstName: 'Demo', lastName: 'User', email: 'demo@example.com' });
        router.push('/dashboard');
      }
    } catch (error) {
        console.error("[Header] Error in handleLoginClick:", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-[57px] items-center gap-4 border-b bg-background px-4">
      {/* Main container for logo and user info */}
      <div className="flex items-center justify-between w-full">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          {activeTheme.logoUrl ? (
            <Image
              src={activeTheme.logoUrl}
              alt={`${activeTheme.name} Logo`}
              width={logoWidth}  // Use dynamic width
              height={logoHeight} // Use increased height
              className="object-contain max-h-[40px]" // Keep object-contain and constrain max height just in case
              priority // Prioritize loading the logo
            />
          ) : (
            // Fallback text maintains consistent vertical alignment
            <span className="text-xl font-semibold flex items-center" style={{ height: `${logoHeight}px` }}>
                {activeTheme.logoText || 'App'}
            </span>
          )}
        </div>

        {/* Right side: Conditional based on pathname and login state */}
        <div className="flex items-center gap-2">
          {userLoading ? (
            <span className="text-sm text-muted-foreground">Loading...</span>
          // Show buttons if on landing page OR if not logged in on other pages
          ) : pathname === '/' || !isLoggedIn ? (
            <>
              <Button variant="outline" size="sm" onClick={handleLoginClick}>
                Log In
              </Button>
              <Link href="/signup" passHref>
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          // Otherwise (logged in and not on landing page), show user name
          ) : user ? (
            <span className="text-sm font-medium">
              {user.firstName} {user.lastName}
            </span>
          ) : null /* Should not happen if isLoggedIn is true, but provides fallback */}
        </div>
      </div>
    </header>
  );
} 