// types/paypal.d.ts

import { OnboardingSDKStyle } from '@/types/onboarding-sdk-style'; // Import the full style type

// Extend the Window interface
declare global {
  interface Window {
    Paypal?: {
      onboard?: {
        initialize: (config: PayPalOnboardConfig) => PayPalRenderableInstance;
      };
    };
  }
}

// Config for the initialize method
export interface PayPalOnboardConfig {
  accessToken: string;
  actionUrl: string;
  style?: Partial<OnboardingSDKStyle>; // Use Partial of the full type
  // Add other configuration properties
}

// Instance returned by initialize
export interface PayPalRenderableInstance {
  render: (containerSelector: string) => void;
}

// Export an empty object to make this file a module
// export {}; // <-- No longer needed if interfaces are exported 