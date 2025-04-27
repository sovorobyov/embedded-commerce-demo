"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { ThemeConfig, getThemeById, defaultTheme } from '@/lib/brandingThemes';

const LOCAL_STORAGE_KEY = 'selectedBranding';

interface BrandingContextType {
  activeTheme: ThemeConfig;
  // No need to expose a setter here as the Admin page manages writing to localStorage
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

interface BrandingProviderProps {
  children: ReactNode;
}

export const BrandingProvider: React.FC<BrandingProviderProps> = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(defaultTheme);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Function to apply theme attribute to HTML element
  const applyTheme = useCallback((themeId: string | null) => {
    const theme = getThemeById(themeId);
    setActiveTheme(theme);
    // Set the data-theme attribute on the root element
    if (theme.id) {
      document.documentElement.setAttribute('data-theme', theme.id);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    console.log('Applied theme:', theme.name);
  }, []);

  // Effect for initial load from localStorage
  useEffect(() => {
    const storedBrand = localStorage.getItem(LOCAL_STORAGE_KEY);
    applyTheme(storedBrand);
    setIsInitialLoad(false);
  }, [applyTheme]);

  // Effect to listen for changes in localStorage (e.g., from Admin page)
  useEffect(() => {
    if (isInitialLoad) return; // Don't run listener on initial load

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_KEY) {
        console.log('Storage change detected for:', event.key);
        applyTheme(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isInitialLoad, applyTheme]);

  const value = {
    activeTheme,
  };

  // Prevent rendering children until theme is loaded to avoid flash of default theme
  if (isInitialLoad) {
      return null; // Or a loading spinner
  }

  return <BrandingContext.Provider value={value}>{children}</BrandingContext.Provider>;
};

// Custom hook to use the BrandingContext
export const useBranding = (): BrandingContextType => {
  const context = useContext(BrandingContext);
  if (context === undefined) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
}; 