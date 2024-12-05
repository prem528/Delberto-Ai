"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <p className="text-sm font-semibold text-gray-900">Delberto</p>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={handleSidebarToggle}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Toggle Sidebar</span>
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            <Link href="#" className="text-sm font-semibold text-gray-900">
              Features
            </Link>
            <Link href="#" className="text-sm font-semibold text-gray-900">
              Marketplace
            </Link>
            <Link href="#" className="text-sm font-semibold text-gray-900">
              Company
            </Link>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="#" className="text-sm font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-25 lg:hidden"
          onClick={handleSidebarToggle}
        ></div>
      )}
    </>
  );
};

export default Navbar;
