"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
 

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-10 w-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
      >
        <Image
          src="/assets/user1.png"
          alt="User"
          width={40}
          height={32}
          className="rounded "
        />
      </button>
      {isOpen && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-500">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="px-4 py-2 text-sm text-gray-700">
              <p className="font-medium">User</p>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>
            <hr className="border-gray-200" />
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem">Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem">Billing</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem">Settings</a>
            <hr className="border-gray-200" />
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem">Log out</a>
          </div>
        </div>
      )}
    </div>
  )
}

