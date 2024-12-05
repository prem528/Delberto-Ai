"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Library,
  Users,
  ShoppingCart,
  Palette,
  GraduationCap,
  CreditCard,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Create",
    icon: LayoutDashboard,
    href: "/create",
    variant: "default",
  },
  {
    title: "Templates",
    icon: Library,
    href: "/templates",
    badge: "New",
  },
  {
    title: "Avatars",
    icon: Users,
    href: "/avatars",
    badge: "New",
  },
  {
    title: "Projects",
    icon: ShoppingCart,
    href: "/projects",
  },
  {
    title: "Products",
    icon: ShoppingCart,
    href: "/products",
  },
  {
    title: "Brand Kit",
    icon: Palette,
    href: "/brand-kit",
    badge: "Team",
  },
  {
    title: "Learning Center",
    icon: GraduationCap,
    href: "/learning",
  },
  {
    title: "Credits",
    icon: CreditCard,
    href: "/credits",
    badge: "2",
  },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className="fixed top-16 left-0 z-10 h-[calc(100vh-4rem)] w-64 flex-col border-r bg-gray-100 overflow-y-auto">
      <div className="flex-1 space-y-4 p-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-300 ${
              pathname === item.href
                ? "bg-gray-800 text-blue-400"
                : "text-gray-700 font-semibold"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
            {item.badge && (
              <span
                className={`ml-auto rounded-full px-2 py-0.5 text-xs ${
                  item.badge === "New"
                    ? "bg-blue-500 text-blue-200"
                    : item.badge === "Team"
                    ? "bg-purple-900 text-purple-200"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
      <div className="p-4 mb-10 mt-7">
        <div className="rounded-lg bg-yellow-900 p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-yellow-100">Black Friday Sale!</h4>
              <p className="text-sm text-yellow-200">Up to 50% OFF!</p>
            </div>
          </div>
          <button className="mt-4 w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded transition-colors">
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}
