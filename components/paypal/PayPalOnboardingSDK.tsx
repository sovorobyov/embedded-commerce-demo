'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useBranding } from '@/hooks/useBranding';
import { defaultTheme } from '@/lib/brandingThemes';
import { mapThemeToPayPalStyle } from '@/lib/paypalStyleMapper';

type PayPalOnboardConfig = {
  // ... configuration properties based on PayPal documentation ...
};

type PayPalRenderableInstance = {
  render: (element: string) => void;
};

interface PayPalOnboardingSDKProps {
  accessToken: string | null;
  actionUrl: string | null;
  error?: string | null;
}

export default function PayPalOnboardingSDK({
  accessToken,
  actionUrl,
  error: serverError
}: PayPalOnboardingSDKProps) {
  const [isLoadingSDK, setIsLoadingSDK] = useState(true);
  const [sdkError, setSdkError] = useState<string | null>(serverError || null);
  const { selectedTheme } = useBranding();

  const initializeAndRenderSDK = useCallback(() => {
    if (sdkError) {
      setIsLoadingSDK(false);
      return;
    }
    
    if (!accessToken || !actionUrl) {
       console.error('Missing accessToken or actionUrl for SDK initialization.');
       setSdkError('Configuration error: Missing required credentials.');
       setIsLoadingSDK(false);
       return;
    }
    
    const currentTheme = selectedTheme || defaultTheme;
    const sdkStyle = mapThemeToPayPalStyle(currentTheme);

    // Runtime check for window.Paypal and its properties
    if (typeof window !== 'undefined' && window.Paypal && typeof window.Paypal.onboard?.initialize === 'function') {
      try {
        console.log('Attempting to initialize PayPal Onboarding SDK with credentials and style:', { accessToken, actionUrl, sdkStyle });
        // Assuming initialize returns an object with a render method
        const instance = window.Paypal.onboard.initialize({
          accessToken: accessToken,
          actionUrl: actionUrl,
          // TODO: Fix implementation of style
        //   style: Object.keys(sdkStyle).length > 0 ? sdkStyle : undefined,
        });
        
        if (instance && typeof instance.render === 'function') {
             instance.render('paypal-onboarding-container');
             setIsLoadingSDK(false);
             setSdkError(null);
             console.log('PayPal onboarding rendering initiated.');
        } else {
            throw new Error('SDK initialize method did not return a valid renderable instance.');
        }

      } catch (error) {
        console.error('Client-side error initializing PayPal onboarding:', error);
        setSdkError('Failed to initialize the payments SDK on the client.');
        setIsLoadingSDK(false);
      }
    } else {
      console.error('initializeAndRenderSDK called but window.Paypal.onboard.initialize not found.');
      setSdkError('Payments SDK script not available or structured as expected. It might have failed to load.');
      setIsLoadingSDK(false);
    }
  }, [selectedTheme, accessToken, actionUrl, sdkError]);

  useEffect(() => {
    if (sdkError || !accessToken || !actionUrl) {
       setIsLoadingSDK(false);
       return; 
    }

    let attempts = 0;
    const maxAttempts = 10;
    const interval = 500;

    const checkAndInit = () => {
      // Runtime check before initialization
      if (typeof window !== 'undefined' && window.Paypal && typeof window.Paypal.onboard?.initialize === 'function') {
        console.log('PayPal SDK script found. Initializing...');
        initializeAndRenderSDK();
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          console.log(`PayPal SDK script not found, attempt ${attempts}/${maxAttempts}. Retrying in ${interval}ms...`);
          setTimeout(checkAndInit, interval);
        } else {
          console.error(`PayPal SDK script not found after ${maxAttempts} attempts.`);
          setSdkError('Payments SDK script failed to load in time. Please refresh the page.');
          setIsLoadingSDK(false);
        }
      }
    };

    checkAndInit();

  }, [initializeAndRenderSDK, accessToken, actionUrl, sdkError]);

  return (
    <div id="paypal-onboarding-container" className="min-h-[400px] border rounded-md p-4 bg-background shadow-sm"></div>
  );
} 