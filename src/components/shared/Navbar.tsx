// components/shared/Navbar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiPlusCircle,
  FiGrid,
  FiLogOut,
} from "react-icons/fi";
import { HiOutlineBookOpen } from "react-icons/hi2";

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({
  isLoggedIn = false,
  userName,
  onLogout,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6C5CE7] text-white">
            <HiOutlineBookOpen size={19} />
          </span>
          <span className="text-lg font-bold text-gray-900">CourseFlow</span>
        </Link>

        {/* Desktop nav links (Visible only on lg screens and up) */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-[#6C5CE7]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search bar (desktop - Visible on lg screens and up) */}
        <div className="hidden flex-1 max-w-xs items-center lg:flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-3 pr-9 text-sm text-gray-700 outline-none focus:border-[#6C5CE7]"
            />
            <FiSearch
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Right side actions (desktop - Visible on lg screens and up) */}
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          {isLoggedIn ? (
            <>
              <button
                aria-label="Cart"
                className="text-gray-500 hover:text-gray-800"
              >
                <FiShoppingCart size={20} />
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center gap-1"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6C5CE7] text-white">
                    <FiUser size={16} />
                  </span>
                  <FiChevronDown
                    size={14}
                    className={`text-gray-500 transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-12 w-48 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                    {userName && (
                      <div className="border-b border-gray-100 px-4 py-2 text-sm font-medium text-gray-900">
                        {userName}
                      </div>
                    )}
                    <Link
                      href="/add-course"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FiPlusCircle size={15} />
                      Add Course
                    </Link>
                    <Link
                      href="/my-courses"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FiGrid size={15} />
                      My Courses
                    </Link>
                    <button
                      onClick={() => {
                        onLogout?.();
                        setShowDropdown(false);
                      }}
                      className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50"
                    >
                      <FiLogOut size={15} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-[#6C5CE7] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5b4bd6]"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle (Visible on both `sm` and `md` devices now!) */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-800 lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile & Tablet panel (Handles both small and medium devices smoothly) */}
      <div
        className={`overflow-hidden border-t border-gray-100 transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-3 px-4 py-4">
          {/* Search bar for mobile/tablet */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-3 pr-9 text-sm text-gray-700 outline-none focus:border-[#6C5CE7]"
            />
            <FiSearch
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Navigation Links for mobile/tablet */}
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(link.href)
                    ? "bg-[#6C5CE7]/10 text-[#6C5CE7]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Logged in paths inside mobile drawer */}
            {isLoggedIn && (
              <>
                <Link
                  href="/add-course"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <FiPlusCircle size={15} />
                  Add Course
                </Link>
                <Link
                  href="/my-courses"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <FiGrid size={15} />
                  My Courses
                </Link>
              </>
            )}
          </nav>

          {/* User actions / Auth buttons inside mobile drawer */}
          <div className="mt-1 border-t border-gray-100 pt-3">
            {isLoggedIn ? (
              <div className="flex flex-col gap-1">
                {userName && (
                  <div className="px-3 py-2 text-sm font-semibold text-gray-900">
                    Signed in as: <span className="text-[#6C5CE7]">{userName}</span>
                  </div>
                )}
                <button
                  onClick={() => {
                    onLogout?.();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-gray-50"
                >
                  <FiLogOut size={15} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-[#6C5CE7] px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#5b4bd6]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}