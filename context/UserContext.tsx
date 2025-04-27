"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of the user data
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

// Define the shape of the context value
interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean; // Added to handle initial load
  login: (userData: User) => void;
  logout: (clearStorage?: boolean) => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the props for the provider
interface UserProviderProps {
  children: ReactNode;
}

// Create the provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start as loading

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem('userData');
      const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

      if (storedIsLoggedIn === 'true' && storedUserData) {
        const parsedUser = JSON.parse(storedUserData) as Partial<User>; // Assume partial data initially
        // Ensure all fields are present, defaulting to empty strings if not
        setUser({
          firstName: parsedUser.firstName || '',
          lastName: parsedUser.lastName || '', // Will be empty initially based on signup
          email: parsedUser.email || ''
        });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Failed to load user state from localStorage:", error);
      // Clear potentially corrupted storage
      localStorage.removeItem('userData');
      localStorage.removeItem('isLoggedIn');
    } finally {
        setIsLoading(false); // Finished loading
    }
  }, []);

  // Login function
  const login = (userData: User) => {
    console.log("[UserContext] Attempting login with:", userData);
    try {
      const dataToStore = { firstName: userData.firstName, lastName: userData.lastName, email: userData.email };
      
      console.log("[UserContext] Setting userData in localStorage...");
      localStorage.setItem('userData', JSON.stringify(dataToStore));
      console.log("[UserContext] userData set. Setting isLoggedIn=true in localStorage...");
      localStorage.setItem('isLoggedIn', 'true');
      console.log("[UserContext] isLoggedIn set in localStorage.");

      setUser(userData);
      setIsLoggedIn(true);
      console.log("[UserContext] State updated. User logged in.");

    } catch (error) {
      console.error("[UserContext] Error during login process:", error);
    }
  };

  // Update Logout function to conditionally clear storage
  const logout = (clearStorage: boolean = true) => {
    try {
      // Always clear the logged-in flag
      localStorage.removeItem('isLoggedIn');
      // Conditionally clear user data
      if (clearStorage) {
        localStorage.removeItem('userData');
        console.log("User logged out and user data cleared.");
      } else {
        console.log("User logged out (state only, user data preserved).");
      }
      // Reset state
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Failed to clear user state on logout:", error);
    }
  };

  // Update profile function
  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return; // Should not happen if called from settings

    try {
      const newUser = { ...user, ...updatedData };
      const dataToStore = { firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email };
      localStorage.setItem('userData', JSON.stringify(dataToStore));
      setUser(newUser);
      console.log("User profile updated:", newUser);
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };

  // Provide the context value
  const value = {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    updateProfile,
  };

  if (isLoading) {
    return null;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 