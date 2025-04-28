'use client';

// Note: Script tag is now loaded in layout.tsx
import { useEffect, useState, useCallback } from 'react';
import { useBranding } from '@/hooks/useBranding'; // Import branding hook
import { defaultTheme } from '@/lib/brandingThemes'; // Import default theme for fallback
// import { OnboardingSDKStyle } from '@/types/onboarding-sdk-style'; // No longer needed
// import { hslToHex } from '@/lib/utils'; // Not needed
// Import the specific override type
// import { PayPalStyleOverride } from '@/types/paypal';
import { mapThemeToPayPalStyle } from '@/lib/paypalStyleMapper'; // Import the mapper function

// Onboarding page content
export default function OnboardingPage() {
  const [isLoadingSDK, setIsLoadingSDK] = useState(true); // Start loading until we confirm SDK presence
  const [sdkError, setSdkError] = useState<string | null>(null);
  const { selectedTheme } = useBranding(); // Get selected theme from hook

  // Encapsulated function to initialize and render the PayPal SDK
  const initializeAndRenderSDK = useCallback(() => {
    const currentTheme = selectedTheme || defaultTheme;
    
    // Generate the SDK style object using the mapper function
    const sdkStyle = mapThemeToPayPalStyle(currentTheme);

    // // Mapping logic is now in mapThemeToPayPalStyle
    // const backgroundHsl = currentTheme.variables['--background'];
    // if (backgroundHsl) { ... }
    // const primaryHsl = currentTheme.variables['--primary'];
    // if (primaryHsl) { ... }

    if (window.Paypal && window.Paypal.onboard) {
      try {
        console.log('Attempting to initialize and render PayPal Onboarding SDK with style:', sdkStyle);
        window.Paypal.onboard.initialize({
          accessToken: 'A21AAKJ2bGmi6xPKIjCDxs24KcE-MGTxxMfCo8JC5FUcmE6F2cHDGNsSgzjkn8KIA7BChjiZ0QIX7BzicxTK4246dj28OTmYA',
          actionUrl: 'https://www.sandbox.paypal.com/bizsignup/partner/entry?referralToken=YTUxYmRiOGEtMDFiYy00ZDRmLWJkMWQtY2M0Yjc4Y2EwMzBhMXRLZ3Z2V2s4V3hmSmIyQ0ZMam0vMUNvemxHU3UxdGh3YVNTbE9Xd1laND12Mg==',
          // Pass the generated style object (only if it has keys)
          // style: Object.keys(sdkStyle).length > 0 ? sdkStyle : undefined,
        }).render('paypal-onboarding-container');

        setIsLoadingSDK(false);
        setSdkError(null);
        console.log('PayPal onboarding rendering initiated.');

      } catch (error) {
        console.error('Error initializing PayPal onboarding:', error);
        setSdkError('Failed to initialize the payments SDK.');
        setIsLoadingSDK(false);
      }
    } else {
      console.error('initializeAndRenderSDK called but window.Paypal.onboard not found.');
      setSdkError('Payments SDK is not available. It might have failed to load.');
      setIsLoadingSDK(false);
    }
  }, [selectedTheme]);

  // Effect to check for the SDK and initialize it
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 3;
    const interval = 500;

    const checkAndInit = () => {
      if (window.Paypal && window.Paypal.onboard) {
        console.log('PayPal SDK found. Initializing...');
        initializeAndRenderSDK();
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          console.log(`PayPal SDK not found, attempt ${attempts}/${maxAttempts}. Retrying in ${interval}ms...`);
          setTimeout(checkAndInit, interval);
        } else {
          console.error(`PayPal SDK not found after ${maxAttempts} attempts.`);
          setSdkError('Payments SDK failed to load in time. Please refresh the page.');
          setIsLoadingSDK(false);
        }
      }
    };

    checkAndInit();

  }, [initializeAndRenderSDK]);

  return (
    <div id="paypal-onboarding-container"></div>
  );
} 