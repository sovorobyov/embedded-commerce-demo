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
            *   The ID of the container element (e.g., `containerId: 'paypal-onboarding-container'`).
            *   Static configuration like `partnerId` (from config/env) and `environment='sandbox'`.
            *   Placeholder values for dynamic credentials (`accessToken: null`, `referralId: null`), which will be fetched in Phase 7.
    *   Add basic loading states (e.g., showing "Loading SDK...") while waiting for the script and error handling if the script fails to load or initialization fails.
*   **Outcome:** The Onboarding page loads the external Payments SDK script. Once loaded, the SDK initializes and renders its UI within the designated container `div`, likely showing an initial state or an error due to missing credentials, but confirming successful script loading and initialization via `window.PayPal.onboard`.

## Phase 7: Implement Backend Credential Generation for SDK

*   **Goal:** Dynamically generate the required access token and partner referral ID on the backend and provide them to the frontend SDK component.
*   **Tasks:**
    *   Create a new backend API route (e.g., `/api/payments/onboarding-credentials`).
    *   Implement logic within the API route to:
        *   Simulate authentication/authorization if necessary.
        *   Simulate calling the required YourBrand API to generate a partner referral ID.
        *   Simulate calling the required YourBrand API to generate a short-lived access token for the SDK.
        *   Return the generated `referralId` and `accessToken` in the API response.
    *   Modify the Onboarding page component (`app/(dashboard)/onboarding/page.tsx`):
        *   Use `useEffect` and `useState` to manage the fetching of credentials.
        *   Fetch the `referralId` and `accessToken` from the `/api/payments/onboarding-credentials` route when the component mounts.
        *   Update the state with the fetched credentials.
        *   Pass the fetched `referralId` and `accessToken` as props to the rendered `PaymentsOnboarding` SDK component.
*   **Outcome:** The Payments SDK component on the Onboarding page successfully initializes using dynamically generated (simulated) credentials fetched from the backend, proceeding to the next step in its internal onboarding flow.
