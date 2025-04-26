"use client"; // Needed for using usePathname hook

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils"; // Utility for conditional classes

// Define navigation items
const navItems = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Settings', href: '/settings' },
  // Add other items here later if needed
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-start gap-2 px-4 py-4">
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
    </aside>
  );
} 