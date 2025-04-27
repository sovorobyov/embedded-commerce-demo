"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getThemeById } from "@/lib/brandingThemes"; // Import the helper

// Define the structure for branding packages
interface BrandingPackage {
  id: string;
  name: string;
  description: string;
  // Add logoUrl or color theme later if needed
}

// Define the available branding packages
const brandingPackages: BrandingPackage[] = [
  {
    id: "bigcommerce",
    name: "BigCommerce",
    description: "Robust platform for large-scale e-commerce."
  },
  {
    id: "miva",
    name: "Miva",
    description: "Flexible solution for complex B2B/B2C needs."
  },
  {
    id: "shopware",
    name: "Shopware",
    description: "Open-source platform with strong community support."
  },
];

const LOCAL_STORAGE_KEY = 'selectedBranding';

export default function AdminPage() {
  // State can be string (brand id) or null (default theme)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Load selected brand from localStorage on initial render
  useEffect(() => {
    const storedBrand = localStorage.getItem(LOCAL_STORAGE_KEY);
    // If a valid brand ID is stored, use it. Otherwise, selectedBrand remains null (default).
    if (storedBrand && brandingPackages.some(p => p.id === storedBrand)) {
        setSelectedBrand(storedBrand);
    } else {
        setSelectedBrand(null); // Explicitly set to null if not found or invalid
    }
  }, []);

  // Handle brand selection (accepts null for default)
  const handleSelectBrand = (brandId: string | null) => {
    setSelectedBrand(brandId);
    if (brandId === null) {
      // If default is selected, remove the key from localStorage
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      console.log("Selected brand: Default");
    } else {
      // Otherwise, save the selected brand ID
      localStorage.setItem(LOCAL_STORAGE_KEY, brandId);
      console.log(`Selected brand: ${brandId}`);
    }
    // Optionally add a toast notification here too
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Branding</h2>
        <p className="text-muted-foreground mb-6">Select the branding package to apply across the site.</p>

        {/* Updated grid to include Default */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Default Theme Card */}
          <Card
            onClick={() => handleSelectBrand(null)} // Pass null for default
            className={cn(
              "cursor-pointer transition-all hover:shadow-lg", // Base
              selectedBrand === null
                ? "border-4 border-border ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg" // Selected: thicker border, primary ring
                : "border-2 border-border" // Not selected: normal border
            )}
          >
            <CardHeader>
              <CardTitle>Default</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>The standard site appearance.</CardDescription>
            </CardContent>
          </Card>

          {/* Specific Branding Package Cards */}
          {brandingPackages.map((pkg) => {
            const isSelected = selectedBrand === pkg.id;
            const themeConfig = getThemeById(pkg.id); // Get the specific theme for this card
            const previewColor = themeConfig.variables['--primary']; // Get HSL string

            // Define the style object with explicit type assertion
            const cardStyle = {
              borderColor: `hsl(${previewColor})`,
            } as React.CSSProperties & { '--tw-ring-color'?: string }; // Type assertion

            if (isSelected) {
               cardStyle['--tw-ring-color'] = `hsl(${previewColor})`;
            }

            return (
              <Card
                key={pkg.id}
                onClick={() => handleSelectBrand(pkg.id)}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg", // Base
                  isSelected
                    ? "border-4 ring-2 ring-offset-2 ring-offset-background shadow-lg" // Selected: thicker border, theme-specific ring (via style)
                    : "border-2" // Not selected: normal border width (color from style)
                )}
                style={cardStyle} // Apply border color always, ring color when selected
              >
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  {/* Add logo or icon here later if needed */}
                </CardHeader>
                <CardContent>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Add other admin sections later as needed */} 

    </div>
  );
} 