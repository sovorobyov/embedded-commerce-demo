"use client"; // Needed for using usePathname hook

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils"; // Utility for conditional classes
import { useUser } from "@/context/UserContext"; // Import useUser
import { Button } from "@/components/ui/button"; // Import Button

// Define navigation items
const navItems = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Settings', href: '/settings' },
  // Add other items here later if needed
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useUser(); // Get logout function

  return (
    <aside className="hidden w-56 flex-col border-r bg-background sm:flex">
      <div className="flex flex-col flex-grow p-4">
        <nav className="flex flex-col items-start gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary w-full",
                pathname === item.href && "bg-muted text-primary" // Highlight active link
              )}
            >
              {/* Add icons here later if desired */}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => logout()} // Call context logout (clears storage by default)
          >
            {/* Add icon later if desired e.g., <LogOut className="mr-2 h-4 w-4" /> */}
            Log out
          </Button>
        </div>
      </div>
    </aside>
  );
} 