import { ThemeConfig } from './brandingThemes';
import { OnboardingSDKStyle } from '@/types/onboarding-sdk-style'; 

/**
 * Maps theme variables from a ThemeConfig object to a style
 * object compatible with the PayPal Onboarding SDK, using the full type definition.
 * 
 * @param theme The ThemeConfig object containing CSS variables.
 * @returns A Partial<OnboardingSDKStyle> object for the SDK.
 */
export function mapThemeToPayPalStyle(theme: ThemeConfig): Partial<OnboardingSDKStyle> {
  // Initialize as a partial object. We will only add properties that are mapped.
  const sdkStyle: Partial<OnboardingSDKStyle> = {};

  // Helper to safely initialize nested properties
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function ensurePath(obj: any, path: string[]) {
    let current = obj;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
    return current;
  }

  // --- Color Mappings --- 
  const colorMappings: Record<string, string[]> = {
    '--background': ['color', 'background', 'main'],
    '--primary': ['color', 'primary', 'main'],
    '--secondary': ['color', 'secondary', 'main'],
    // Mapping foreground is ambiguous. Let's map it to the contrast color for the primary background.
    // This assumes text generally appears over the primary color background in the SDK.
    // Alternatively, map to `color.background.contrast` or a general text color if the SDK supports it.
    '--foreground': ['color', 'primary', 'contrast'], 
    '--accent': ['color', 'accent1', 'main'], // Mapping to accent1 as an example
    '--border': ['color', 'structure', 'borderLowContrast'], // Mapping to low contrast border
  };

  for (const [variable, path] of Object.entries(colorMappings)) {
    const hslValue = theme.variables[variable];
    if (hslValue) {
      const parent = ensurePath(sdkStyle, path);
      const finalKey = path[path.length - 1];
      parent[finalKey] = hslValue;
      console.log(`Mapping ${variable} HSL: ${hslValue} to ${path.join('.')}`);
    } else {
        console.warn(`Theme variable ${variable} not found for SDK style mapping.`);
    }
  }

  // --- Border Mappings --- 
  const radius = theme.variables['--radius'];
  if (radius) {
    const path = ['border', 'radius', 'md']; // Using 'md' as the general radius
    const parent = ensurePath(sdkStyle, path);
    const finalKey = path[path.length - 1];
    parent[finalKey] = radius;
    console.log(`Mapping --radius: ${radius} to ${path.join('.')}`);
  } else {
    console.warn(`Theme variable --radius not found for SDK style mapping.`);
  }

  // --- Typography Mappings --- 
  const fontFamily = theme.variables['--font-sans'];
  if (fontFamily) {
    const path = ['typography', 'body', 'family']; // Mapping to body family
    const parent = ensurePath(sdkStyle, path);
    const finalKey = path[path.length - 1];
    // The theme variable typically holds CSS like 'var(--font-some-name)'
    // The SDK likely expects a font family name string like "PayPalPlain-Regular"
    // This mapping needs adjustment based on how fonts are handled.
    // For now, we just log it might not directly work.
    parent[finalKey] = fontFamily;
    console.log(`Mapping --font-sans: ${fontFamily} potentially to ${path.join('.')} (requires SDK check)`);
  }

  return sdkStyle;
} 