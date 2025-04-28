import axios from 'axios';

// Helper function to get PayPal Partner Access Token (server-side)
export async function getPayPalPartnerToken(): Promise<string | null> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token'; // Use Sandbox URL

  if (!clientId || !clientSecret) {
    console.error('PayPal Client ID or Secret not configured in environment variables.');
    return null;
  }

  try {
    const response = await axios.post(
      url,
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching PayPal Partner Token:', error instanceof Error ? error.message : error);
    if (axios.isAxiosError(error) && error.response) {
        console.error('PayPal API Error Response:', error.response.data);
    }
    return null;
  }
}

// Helper function to call Partner Referrals API (server-side)
export async function getPartnerReferralActionUrl(partnerToken: string): Promise<string | null> {
  const bnCode = process.env.PAYPAL_BN_CODE;
  const url = 'https://api-m.sandbox.paypal.com/v2/customer/partner-referrals'; // Use Sandbox URL
  const trackingId = `user_${Date.now()}`; // Example tracking ID - replace with actual user identifier

  if (!bnCode) {
      console.warn('PayPal BN Code not configured. Attribution might be affected.');
  }

  const requestBody = {
    tracking_id: trackingId,
    operations: [{
        operation: "API_INTEGRATION",
        api_integration_preference: {
            rest_api_integration: {
                integration_method: "SDK",
                integration_type: "THIRD_PARTY",
                third_party_details: {
                  "signup_mode": "VERIFY_WITH_PAYPAL",
                  "organization": "us"
                }
            }
        }
    }],
    legal_country_code: "US",
    products: ["PPCP"], // Using PPCP as per example
    legal_consents: [{ type: "SHARE_DATA_CONSENT", granted: true }]
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        'Authorization': `Bearer ${partnerToken}`,
        'Content-Type': 'application/json',
        // Include BN Code if available
        ...(bnCode && { 'PayPal-Partner-Attribution-Id': bnCode }),
      },
    });

    // Find the action_url link
    const actionUrlLink = response.data.links?.find((link: { rel: string }) => link.rel === 'action_url');
    return actionUrlLink?.href || null;
  } catch (error) {
    console.error('Error calling Partner Referrals API:', error instanceof Error ? error.message : error);
     if (axios.isAxiosError(error) && error.response) {
        console.error('PayPal API Error Response:', error.response.data);
    }
    return null;
  }
}

// Helper function to simulate SDK Access Token generation (server-side)
// NOTE: Replace this with actual SDK token generation logic if required by the SDK
export async function generateSdkAccessToken(): Promise<string | null> {
    console.warn('Simulating SDK Access Token generation. Replace with actual logic.');
    // In a real scenario, this might involve another API call or different credentials.
    // For now, return a hardcoded sandbox token (replace if you have a real one for SDK)
    return 'A21AAKJ2bGmi6xPKIjCDxs24KcE-MGTxxMfCo8JC5FUcmE6F2cHDGNsSgzjkn8KIA7BChjiZ0QIX7BzicxTK4246dj28OTmYA'; 
} 