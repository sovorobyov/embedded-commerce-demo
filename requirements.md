# Overview

Build a fictional e-commerce website similar to BigCommerce (https://www.bigcommerce.com/), Miva (https://www.miva.com/) and Shopware (https://www.shopware.com/en/). The website should emphasize the power and ease of paying via the brands own Payments platform.

The website should consist of the following pages:
- Landing
- Sign up
- Dashboard
- Settings
- Onboarding
- Admin

# Tech Stack
- TypeScript
- Next.js
- React
- Shadcn components
- Local Storage on Browser for storing data

# Non-Functional requirements
The branding and logo of the website should be easily configurable and we should build the website with a styling package for BigCommerce, Miva and Shopware. I should be able to set the branding package via an Admin page. See the Admin page description for more details.

# Purpose of each page
## Landing
Entice the user to "Get Started" and sign up on our e-commerce website.

## Sign up
Should only ask for the basics - First Name, Last Name, Email, Password.

## Dashboard
Shall contain a Sidebar navigation with Home and Settings menu options. Clicking on Home will take the user to the Dashboard page. Clicking on Settings will take the user to the Settings page. The dashboard will also have a top header with the brands logo on the top left.

### Settings
This page will contain some fake user profile settings as well as a Payment Methods section which will offer our own brand's Payments platform. There should be some enticing value add verbiage and an overview about all the payment types offered. There should be a prominent Get Started CTA button which takes the user to the Onboarding page.

### Onboarding
This page will just have a centered static text saying we look forward to onboarding you.

## Admin
The admin page should be formatted in a top-down with different sections. We will have a Branding section which will allow for updating the branding package that the website currently represents. The packages should be selectable cards and the current selected branding package should be visibly highlighted to show it's selected.