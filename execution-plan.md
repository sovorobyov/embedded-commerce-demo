# Execution Plan

## Phase 1: Project Setup & Landing Page

*   **Goal:** Establish the project structure and create the initial user entry point.
*   **Tasks:**
    *   Initialize a new Next.js project with TypeScript.
    *   Set up Shadcn components according to their documentation.
    *   Create the basic file structure for pages (`/pages` or `/app` depending on Next.js version).
    *   Build the Landing Page UI (`/`) as described in `requirements.md`.
        *   Include enticing text/imagery.
        *   Add a prominent "Get Started" button/link.
    *   Configure routing for the Landing Page.
    *   Link the "Get Started" button to navigate to the (yet to be created) Sign Up page (`/signup`).
*   **Outcome:** A running Next.js application displaying the Landing Page, with a functional link to the Sign Up page route.

## Phase 2: User Sign Up & Basic Authentication

*   **Goal:** Implement user registration and basic access control.
*   **Tasks:**
    *   Build the Sign Up page UI (`/signup`) with fields for First Name, Last Name, Email, and Password.
    *   Implement sign-up logic:
        *   On submission, capture user input.
        *   Store user data (e.g., email and a mock "logged-in" status) in Local Storage.
        *   Redirect the user to the Dashboard page (`/dashboard`) upon successful sign-up.
    *   Create a basic mechanism to check Local Storage for the "logged-in" status to protect dashboard routes (this is a simplification for demo purposes). Redirect to Landing or Sign Up if not "logged in".
*   **Outcome:** A functional Sign Up page that saves user information to Local Storage and redirects to the Dashboard. Basic route protection is in place for the dashboard area.

## Phase 3: Dashboard Shell & Core Pages (Settings, Onboarding)

*   **Goal:** Build the main authenticated user interface structure and key informational pages.
*   **Tasks:**
    *   Build the Dashboard page layout (`/dashboard`):
        *   Implement the Sidebar navigation with "Home" and "Settings" links.
        *   Implement the Top Header (placeholder for logo for now).
        *   Ensure the "Home" link points to `/dashboard` and "Settings" points to `/settings`.
    *   Build the Settings page UI (`/settings`) within the Dashboard layout:
        *   Add placeholder user profile settings components.
        *   Add the Payment Methods section with descriptive text and branding for the platform's payments.
        *   Add the "Get Started" CTA button.
    *   Build the Onboarding page UI (`/onboarding`) with the specified static text.
    *   Link the "Get Started" button on the Settings page to navigate to `/onboarding`.
    *   Ensure routing between Dashboard, Settings, and Onboarding works correctly.
*   **Outcome:** A functional Dashboard layout with navigation. Users can access the Settings page and navigate to the static Onboarding page via the CTA.

## Phase 4: Admin Page & Branding Selection UI

*   **Goal:** Create the administrative interface for managing website branding.
*   **Tasks:**
    *   Build the Admin page UI (`/admin`).
    *   Implement the top-down layout structure.
    *   Create the "Branding" section.
    *   Implement selectable Card components for each branding package (BigCommerce, Miva, Shopware).
        *   Display relevant info/logo preview on each card.
    *   Implement logic for selecting a branding package:
        *   On card click, update the selected package identifier in Local Storage.
        *   Visually highlight the currently selected card based on the value in Local Storage.
*   **Outcome:** A functional Admin page where an administrator can view and select one of the three branding packages. The selection is persisted in Local Storage.

## Phase 5: Dynamic Branding Implementation

*   **Goal:** Make the website's visual theme dynamically configurable based on the Admin selection.
*   **Tasks:**
    *   Define basic styling configurations (e.g., color variables, logo URLs) for each branding package (BigCommerce, Miva, Shopware). This could be CSS variables, theme objects, etc.
    *   Create a mechanism (e.g., a context provider, a top-level layout component) to read the selected branding package from Local Storage.
    *   Apply the corresponding styles dynamically throughout the application:
        *   Update the logo in the Dashboard header.
        *   Adjust color schemes, fonts, etc., on all pages (Landing, Sign Up, Dashboard, Settings, Onboarding, Admin) based on the selected theme.
    *   Ensure the default theme is applied if no selection is found in Local Storage.
    *   Add a default theme card to the admin page, when the application loads and there's no currently selected theme in the localStorage then have this card be highlighted. When there is a theme saved and we select the default theme card, then it should remove the theme selection from the storage.
*   **Outcome:** The entire website's branding (logo, colors) changes dynamically based on the package selected in the Admin page, providing a configurable look and feel.

## Phase 6: Integrate Payments SDK (Client-Side via Script)

*   **Goal:** Integrate the YourBrand Payments Onboarding SDK into the existing Onboarding page using the provided script loading method.
*   **Tasks:**
    *   Convert the Onboarding page (`app/(dashboard)/onboarding/page.tsx`) to a Client Component (`"use client"`).
    *   Add the YourBrand Payments SDK `<script>` tag to the application. This should likely be done using the Next.js `Script` component (`next/script`) within the Onboarding page or a relevant layout file for deferred loading. Identify the correct script URL from the integration guide.
    *   Modify the Onboarding page UI:
        *   Add a dedicated `div` element that will serve as the container for the SDK's UI. Ensure it has a unique ID (e.g., `id="paypal-onboarding-container"`).
    *   Implement logic within the Onboarding page component using `useEffect` and `useState`:
        *   Wait for the SDK script to load (check if `window.PayPal.onboard` is defined).
        *   Once loaded, call `window.PayPal.onboard()` to initialize the SDK.
        *   Pass the necessary configuration object to the `onboard()` function:
            *   Call `.render()` after initialization to mount the SDK UI into a container element (e.g., `render('#paypal-onboarding-container')`).
            *   Static configuration like `partnerId` (from config/env) and `environment='sandbox'`.
            *   Placeholder values for dynamic credentials (`accessToken: null`, `referralId: null`), which will be fetched in Phase 7.
    *   Add basic loading states (e.g., showing "Loading SDK...") while waiting for the script and error handling if the script fails to load or initialization fails.
*   **Outcome:** The Onboarding page loads the external Payments SDK script. Once loaded, the SDK initializes and renders its UI within the designated container `div`, likely showing an initial state or an error due to missing credentials, but confirming successful script loading and initialization via `window.PayPal.onboard`.

## Phase 7: Server-Side SDK Credential/URL Generation (Partner Referrals API)

*   **Goal:** Dynamically generate the required SDK `accessToken` and the seller onboarding `actionUrl` on the server using the PayPal Partner Referrals API during page load, passing them directly to the Onboarding component.
*   **Tasks:**
    *   **Install `axios`:** Add `axios` for making server-side HTTP requests (`pnpm add axios`).
    *   **Configure Server Environment:** Ensure PayPal Partner Client ID, Secret, and BN Code are securely available as environment variables (e.g., in `.env.local`).
    *   **Modify the `OnboardingPage` component (`app/(dashboard)/onboarding/page.tsx`):**
        *   Confirm it remains a Client Component (`"use client"`).
        *   Ensure its signature accepts `accessToken` (for the SDK) and `actionUrl` as props.
    *   **Implement Server Component Logic (`app/(dashboard)/onboarding/page.tsx` - Server Wrapper):**
        *   Rename the existing client component (e.g., to `OnboardingClientComponent`).
        *   Create a new default `async` function component in `page.tsx`. This Server Component will:
            *   **Generate Partner Access Token:**
                *   Make a `POST` request to the PayPal OAuth2 token endpoint (`https://api-m.sandbox.paypal.com/v1/oauth2/token`) using `axios`.
                *   Use Basic Authentication with the Partner Client ID and Secret.
                *   Request `grant_type=client_credentials`.
                *   Extract the `access_token` (Partner Token) from the response.
            *   **Call Partner Referrals API:**
                *   Make a `POST` request to `https://api-m.sandbox.paypal.com/v2/customer/partner-referrals` using `axios`.
                *   Include the generated Partner Token in the `Authorization: Bearer` header.
                *   Include the Partner BN Code (from env vars).
                *   Construct the request body, including:
                    *   `tracking_id`: A unique ID for the seller (e.g., the logged-in user's ID).
                    *   `operations`: Define `API_INTEGRATION` preference with `PAYPAL`, `THIRD_PARTY`, and features like `PAYMENT`, `REFUND`.
                    *   `products`: Specify desired products (e.g., `["EXPRESS_CHECKOUT"]` or `["PPCP"]`).
                    *   `legal_consents`: Grant `SHARE_DATA_CONSENT`.
                    *   *(Optional)* `partner_config_override`: Include `return_url` pointing back to the onboarding page or a success step.
                *   Extract the `action_url` from the `links` array in the API response.
            *   **Generate SDK Access Token:**
                *   *(Simulation/Placeholder)* Simulate calling the necessary API (details potentially differ from Partner Referrals API) to generate the short-lived `accessToken` specifically required by the SDK's `initialize` method. *This step might need refinement based on further SDK documentation for token generation specific to the JS SDK initialization.*
            *   **Render Client Component:** Render the `<OnboardingClientComponent>` passing the generated `accessToken` (SDK token) and `actionUrl` as props.
    *   **Refactor `OnboardingClientComponent`:**
        *   Ensure the `initializeAndRenderSDK` function uses the `accessToken` and `actionUrl` received via props when calling `window.Paypal.onboard.initialize`.
*   **Outcome:** The onboarding page fetches Partner credentials server-side via `axios`, calls the Partner Referrals API to get the `actionUrl`, generates the SDK `accessToken`, and passes these directly to the client component as props. The SDK initializes using live (sandbox) data obtained server-side, streamlining the onboarding start process.
