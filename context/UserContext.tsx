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
  logout: () => void;
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
    try {
      const dataToStore = { firstName: userData.firstName, lastName: userData.lastName, email: userData.email };
      localStorage.setItem('userData', JSON.stringify(dataToStore));
      localStorage.setItem('isLoggedIn', 'true');
      setUser(userData);
      setIsLoggedIn(true);
      console.log("User logged in and state updated:", userData);
    } catch (error) {
      console.error("Failed to save user state on login:", error);
    }
  };

  // Logout function
  const logout = () => {
    try {
      localStorage.removeItem('userData');
      localStorage.removeItem('isLoggedIn');
      setUser(null);
      setIsLoggedIn(false);
      console.log("User logged out.");
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