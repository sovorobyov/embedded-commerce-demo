"use client"; // Required for hooks and localStorage interaction

import Link from "next/link";
import { useState, useEffect } from "react"; // Import hooks
import { useUser } from "@/context/UserContext"; // Import useUser
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // Import toast from sonner

// Settings page content
export default function SettingsPage() {
  // Get user data and functions from context
  const { user, updateProfile, isLoading } = useUser();

  // Local state for form fields, initialized from context user data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Effect to update local form state when context user data loads/changes
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
    }
  }, [user]); // Rerun effect if user object changes

  // Handler for updating profile - uses context function
  const handleUpdateProfile = () => {
    try {
      updateProfile({
        firstName,
        lastName,
        email,
      });
      // Use sonner toast for success
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile via context", error);
      // Use sonner toast for error
      toast.error("Failed to update profile.");
    }
  };

  // Display loading state
  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  // Display message if user data isn't available (shouldn't happen if logged in)
  if (!user) {
      return <div>User data not available. Please try logging in again.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* User Profile Section - Now uses Context */}
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Manage your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="firstName">First Name</Label>
               <Input
                 id="firstName"
                 placeholder="Your First Name"
                 value={firstName} // Bind to local state
                 onChange={(e) => setFirstName(e.target.value)}
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="lastName">Last Name</Label>
               <Input
                 id="lastName"
                 placeholder="Your Last Name"
                 value={lastName} // Bind to local state
                 onChange={(e) => setLastName(e.target.value)}
               />
             </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email} // Bind to local state
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
           <Button variant="outline" onClick={handleUpdateProfile}>Update Profile</Button>
        </CardContent>
      </Card>

      {/* Payment Methods Section */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Seamlessly integrate with YourBrand Payments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Unlock powerful, integrated payment processing designed for growth.
            Accept all major credit cards, digital wallets, and more with transparent pricing and top-tier security.
            Our platform makes managing transactions effortless.
          </p>
          {/* Add more payment type details/icons if needed */}
          <Link href="/onboarding" passHref>
            <Button>Get Started with Payments</Button>
          </Link>
        </CardContent>
      </Card>

    </div>
  );
} 