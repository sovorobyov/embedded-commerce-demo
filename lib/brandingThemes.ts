export interface ThemeConfig {
  id: string | null; // null represents the default theme
  name: string;
  logoUrl: string; // Use URL for logos
  logoText?: string; // Fallback or alternative text
  // logoUrl?: string; // Can add image URLs later
  variables: {
    [key: string]: string; // e.g., '--primary': 'hsl(222.2 47.4% 11.2%)'
    // Ensure font variable is expected
    '--font-sans': string;
  };
}

// Helper function to ensure all required keys are present
function defineThemeVariables(vars: Partial<ThemeConfig['variables']>): ThemeConfig['variables'] {
  const defaults = {
    '--background': '0 0% 100%',
    '--foreground': '222.2 84% 4.9%',
    '--card': '0 0% 100%',
    '--card-foreground': '222.2 84% 4.9%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '222.2 84% 4.9%',
    '--primary': '222.2 47.4% 11.2%',
    '--primary-foreground': '210 40% 98%',
    '--secondary': '210 40% 96.1%',
    '--secondary-foreground': '222.2 47.4% 11.2%',
    '--muted': '210 40% 96.1%',
    '--muted-foreground': '215.4 16.3% 46.9%',
    '--accent': '210 40% 96.1%',
    '--accent-foreground': '222.2 47.4% 11.2%',
    '--destructive': '0 84.2% 60.2%',
    '--destructive-foreground': '210 40% 98%',
    '--border': '214.3 31.8% 91.4%',
    '--input': '214.3 31.8% 91.4%',
    '--ring': '222.2 84% 4.9%', // Default ring matches primary
    '--radius': '0.5rem',
    // Default font variable value (references the loaded font variable)
    '--font-sans': 'var(--font-manrope)'
  };
  // Ensure ring color defaults to primary color if not explicitly set
  const finalVars = { ...defaults, ...vars };
  if (!vars['--ring']) {
    finalVars['--ring'] = finalVars['--primary'];
  }
  // Ensure --font-sans is always defined, defaulting to manrope
  if (!vars['--font-sans']) {
     finalVars['--font-sans'] = defaults['--font-sans'];
  }
  return finalVars as ThemeConfig['variables']; // Assert type
}

export const defaultTheme: ThemeConfig = {
  id: null,
  name: "Default",
  logoText: "FluxCart", // New default name
  logoUrl: "/logos/fluxcart-logo.svg", // Placeholder - Needs creation
  variables: defineThemeVariables({
    // Modern, clean default with violet primary
    '--background': '0 0% 100%', // White
    '--foreground': '240 10% 3.9%', // Near black
    '--card': '0 0% 100%',
    '--card-foreground': '240 10% 3.9%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '240 10% 3.9%',
    '--primary': '254 78% 56%', // Vibrant Violet
    '--primary-foreground': '0 0% 100%', // White text on primary
    '--secondary': '240 4.8% 95.9%', // Light gray
    '--secondary-foreground': '240 5.9% 10%', // Dark gray
    '--muted': '240 4.8% 95.9%',
    '--muted-foreground': '240 3.8% 46.1%', // Lighter gray
    '--accent': '240 4.8% 95.9%',
    '--accent-foreground': '240 5.9% 10%',
    '--destructive': '0 84.2% 60.2%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '240 5.9% 90%', // Soft gray border
    '--input': '240 5.9% 90%',
    '--ring': '254 78% 56%', // Ring matches primary
    // Default uses Manrope
    '--font-sans': 'var(--font-manrope)',
  })
};

export const bigCommerceTheme: ThemeConfig = {
  id: "bigcommerce",
  name: "BigCommerce",
  logoUrl: "https://dam.bigcommerce.com/m/179d5d0a14041025/original/BC_Wordmark_Black.svg",
  logoText: "BigCommerce",
  variables: defineThemeVariables({
    '--background': '0 0% 100%',
    '--foreground': '215 28% 17%',
    '--card': '0 0% 100%',
    '--card-foreground': '215 28% 17%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '215 28% 17%',
    '--primary': '223 100% 52.5%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '210 40% 96.1%',
    '--secondary-foreground': '215 28% 17%',
    '--muted': '210 40% 96.1%',
    '--muted-foreground': '215.4 16.3% 46.9%',
    '--accent': '210 40% 96.1%',
    '--accent-foreground': '215 28% 17%',
    '--destructive': '0 84.2% 60.2%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '214.3 31.8% 91.4%',
    '--input': '214.3 31.8% 91.4%',
    '--font-sans': 'var(--font-inter)',
  })
};

export const mivaTheme: ThemeConfig = {
  id: "miva",
  name: "Miva",
  logoText: "Miva",
  logoUrl: "https://www.miva.com/images/logos/miva-type-red.svg",
  variables: defineThemeVariables({
    // Darker theme with orange accents
    '--background': '220 13% 11%', // Very dark blue/gray
    '--foreground': '210 40% 98%', // Light gray / White
    '--card': '220 13% 18%', // Slightly lighter dark
    '--card-foreground': '210 40% 98%',
    '--popover': '220 13% 11%',
    '--popover-foreground': '210 40% 98%',
    '--primary': '25 95% 53%', // Miva Orange
    '--primary-foreground': '0 0% 100%', // White text
    '--secondary': '217 33% 25%', // Darker secondary
    '--secondary-foreground': '210 40% 98%',
    '--muted': '217 33% 25%',
    '--muted-foreground': '215 20% 65%', // Lighter gray for muted
    '--accent': '25 95% 53%', // Orange accent
    '--accent-foreground': '0 0% 100%',
    '--destructive': '0 63% 31%', // Darker red
    '--destructive-foreground': '210 40% 98%',
    '--border': '217 33% 28%', // Dark border
    '--input': '217 33% 28%',
    '--font-sans': 'var(--font-montserrat)',
  })
};

export const shopwareTheme: ThemeConfig = {
  id: "shopware",
  name: "Shopware",
  // Update Shopware logoUrl
  logoUrl: "https://assets.shopware.com/media/logos/shopware_logo_blue.svg",
  logoText: "Shopware",
  variables: defineThemeVariables({
    // Blue/Greenish theme
    '--background': '0 0% 100%',
    '--foreground': '205 50% 25%', // Dark Blue/Green
    '--card': '0 0% 100%',
    '--card-foreground': '205 50% 25%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '205 50% 25%',
    '--primary': '190 80% 40%', // Shopware Blue/Green
    '--primary-foreground': '0 0% 100%',
    '--secondary': '210 40% 96.1%',
    '--secondary-foreground': '205 50% 25%',
    '--muted': '210 40% 96.1%',
    '--muted-foreground': '215.4 16.3% 46.9%',
    '--accent': '190 80% 40%', // Accent matches primary
    '--accent-foreground': '0 0% 100%',
    '--destructive': '0 84.2% 60.2%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '214.3 31.8% 91.4%',
    '--input': '214.3 31.8% 91.4%',
    '--font-sans': 'var(--font-inter)',
  })
};

export const themes: Record<string, ThemeConfig> = {
  bigcommerce: bigCommerceTheme,
  miva: mivaTheme,
  shopware: shopwareTheme,
};

// Helper to get theme by ID
export function getThemeById(id: string | null): ThemeConfig {
  return themes[id ?? ''] || defaultTheme;
} 