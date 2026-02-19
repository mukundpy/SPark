'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Camera, Calendar, Users, Home } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/members", label: "Members", icon: Users },
    { href: "/gallery", label: "Gallery", icon: Camera },
    { href: "/contact", label: "Contact", icon: null },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.jpg"
              alt="SPark"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover"
              priority
            />
            <span className="font-heading font-bold text-xl text-slate-900 dark:text-slate-100">
              SPark
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium flex items-center space-x-1 dark:text-slate-300"
              >
                {link.icon && <link.icon size={18} />}
                <span>{link.label}</span>
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-primary transition-colors dark:text-slate-200"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-100 rounded-md transition-colors dark:text-slate-300 dark:hover:bg-slate-900/60"
              >
                <div className="flex items-center space-x-2">
                  {link.icon && <link.icon size={18} />}
                  <span>{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
