"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Library, Users, ShoppingCart, Palette, GraduationCap, CreditCard } from 'lucide-react'

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
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-white">
      <div className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100 ${
              pathname === item.href ? "bg-gray-100 text-blue-600" : "text-gray-700"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
            {item.badge && (
              <span className={`ml-auto rounded-full px-2 py-0.5 text-xs ${
                item.badge === "New" ? "bg-blue-100 text-blue-600" :
                item.badge === "Team" ? "bg-purple-100 text-purple-600" :
                "bg-gray-100 text-gray-600"
              }`}>
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
      <div className="p-4">
        <div className="rounded-lg bg-yellow-50 p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h4 className="font-semibold">Black Friday Sale!</h4>
              <p className="text-sm text-yellow-900">Up to 50% OFF!</p>
            </div>
          </div>
          <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition-colors">
            Start Now
          </button>
        </div>
      </div>
    </div>
  )
}

