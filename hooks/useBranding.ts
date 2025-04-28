import { useState, useEffect } from 'react';
import { themes, defaultTheme, ThemeConfig, getThemeById } from '@/lib/brandingThemes';

const THEME_STORAGE_KEY = 'selectedBrandingThemeId';

export function useBranding() {
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig>(defaultTheme);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Effect to load theme from local storage on initial mount
  useEffect(() => {
    try {
      const storedThemeId = localStorage.getItem(THEME_STORAGE_KEY);
      const initialTheme = getThemeById(storedThemeId);
      setSelectedThemeId(storedThemeId);
      setSelectedTheme(initialTheme);
    } catch (error) {
      console.error("Error loading theme from local storage:", error);
      // Fallback to default theme if error occurs
      setSelectedTheme(defaultTheme);
    }
    setIsThemeLoaded(true);
  }, []);

  // Function to update the theme
  const updateTheme = (themeId: string | null) => {
    try {
      const newTheme = getThemeById(themeId);
      if (themeId === null) {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, themeId);
      }
      setSelectedThemeId(themeId);
      setSelectedTheme(newTheme);

      // Apply CSS variables to the :root element
      const root = document.documentElement;
      Object.entries(newTheme.variables).forEach(([key, value]) => {
        // Convert HSL string "H S% L%" to "H S L" for CSS variable
        const formattedValue = value.replace(/%\s*/g, ' ').trim();
        root.style.setProperty(key, formattedValue);
      });

      // Apply font class change if necessary (more robust font handling needed)
      // This simple example assumes font variables directly control font families
      // A better approach might involve adding/removing body classes
      const fontVariable = newTheme.variables['--font-sans'] || defaultTheme.variables['--font-sans'];
      // Example: Set a data attribute, or apply a class based on the font variable
      // document.body.dataset.font = fontVariable.includes('inter') ? 'inter' : fontVariable.includes('montserrat') ? 'montserrat' : 'manrope';


    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  return { selectedTheme, selectedThemeId, updateTheme, isThemeLoaded };
} 