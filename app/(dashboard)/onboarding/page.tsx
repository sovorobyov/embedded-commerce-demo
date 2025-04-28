import PayPalOnboardingSDK from '@/components/paypal/PayPalOnboardingSDK';

// Import server-side helper functions
import {
  getPayPalPartnerToken,
  getPartnerReferralActionUrl,
  generateSdkAccessToken
} from '@/lib/server/paypal';

// Default export - Server Component fetching data
export default async function OnboardingPage() {
  let actionUrl: string | null = null;
  let sdkAccessToken: string | null = null;
  let serverError: string | null = null;

  const partnerToken = await getPayPalPartnerToken();

  if (partnerToken) {
    actionUrl = await getPartnerReferralActionUrl(partnerToken);
    if (!actionUrl) {
        serverError = "Failed to generate the PayPal onboarding link. Please try again later.";
    }
    // Generate SDK token (currently simulated)
    sdkAccessToken = await generateSdkAccessToken();
     if (!sdkAccessToken && !serverError) { // Only set error if no previous error
        serverError = "Failed to generate necessary credentials for SDK. Please try again later.";
     }

  } else {
    serverError = "Failed to authenticate with PayPal services. Please try again later.";
  }

  // Render the client component, passing the fetched data (or nulls/error)
  return (
    <div className="p-4 md:p-6">
      <PayPalOnboardingSDK 
        accessToken={partnerToken}
        actionUrl={actionUrl}
        error={serverError}
      />
    </div>
  );
} 