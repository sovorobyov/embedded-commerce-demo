"use client"; // Needed for useUser hook

import Link from 'next/link';
import { useUser } from '@/context/UserContext'; // Import useUser hook

export function Header() {
  const { user, isLoading } = useUser(); // Get user data

  return (
    <header className="sticky top-0 z-30 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      {/* Flex container to space out title and user name */}
      <div className="flex items-center justify-between w-full">
        {/* Existing Title */}
        <h1 className="text-xl font-semibold">YourBrand</h1> {/* Placeholder */}

        {/* User Name Display */}
        <div>
          {!isLoading && user && (
            <span className="text-sm font-medium">
              {user.firstName} {user.lastName}
            </span>
          )}
          {/* Add User Menu/Dropdown later if needed */}
        </div>
      </div>
    </header>
  );
} 