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
import { MdFormatListBulletedAdd, MdOutlinePlaylistAddCheckCircle } from "react-icons/md";
// Import your auth client here (adjust the path to match your actual auth-client file structure)
import { authClient } from "@/lib/auth-client";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Get data directly from your auth client
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const userName = session?.user?.name || session?.user?.email?.split("@")[0];

  const handleLogout = async () => {
    await authClient.signOut();
    setShowDropdown(false);
    setIsOpen(false);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100/80 bg-white backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6C5CE7] text-white shadow-sm shadow-[#6C5CE7]/20 transition-transform group-hover:scale-105 duration-200">
            <HiOutlineBookOpen size={20} />
          </span>
          <span className="text-lg font-bold tracking-tight text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            CourseFlow
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 text-sm font-medium transition-colors duration-200 ${isActive(link.href)
                ? "text-[#6C5CE7]"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#6C5CE7]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Search Bar */}
        <div className="hidden flex-1 max-w-xs items-center lg:flex">
          <div className="relative w-full group">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50/60 py-2 pl-3 pr-9 text-sm text-gray-700 transition-all duration-200 outline-none focus:border-[#6C5CE7] focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/10"
            />
            <FiSearch
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6C5CE7] transition-colors"
            />
          </div>
        </div>

        {/* Right Side Actions (Desktop) */}
        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          {!isPending && isLoggedIn ? (
            <>
              <button
                aria-label="Cart"
                className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <FiShoppingCart size={20} />
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6C5CE7]/10 text-[#6C5CE7] font-semibold text-sm border border-[#6C5CE7]/20">
                    {userName ? userName.charAt(0).toUpperCase() : <FiUser size={16} />}
                  </span>
                  <FiChevronDown
                    size={14}
                    className={`text-gray-500 transition-transform duration-200 ${showDropdown ? "rotate-180 text-gray-800" : ""
                      }`}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-12 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                    {userName && (
                      <div className="px-3 py-2.5 mb-1 text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-50">
                        Signed in as
                        <div className="text-sm font-semibold text-gray-900 truncate normal-case mt-0.5">{userName}</div>
                      </div>
                    )}
                    <Link
                      href="/dashboard/add-course"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FiPlusCircle size={16} className="text-gray-400" />
                      Add Course
                    </Link>
                    <Link
                      href="/dashboard/my-listings"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <MdOutlinePlaylistAddCheckCircle size={16} className="text-gray-400" />
                      My Listings
                    </Link>
                    <Link
                      href="/dashboard/my-courses"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FiGrid size={16} className="text-gray-400" />
                      My Courses
                    </Link>
                    <Link
                      href="/dashboard/my-wishlist"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <MdFormatListBulletedAdd size={16} className="text-gray-400" />
                      My Wishlist
                    </Link>
                    <div className="my-1 border-t border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50/60 transition-colors"
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : !isPending ? (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded-xl bg-[#6C5CE7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#6C5CE7]/10 transition-all hover:bg-[#5b4bd6] hover:shadow-md active:scale-[0.98]"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="h-9 w-9 animate-pulse rounded-full bg-gray-100" />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-800 hover:bg-gray-50 transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile & Tablet Panel (হাইট ইস্যু ফিক্স করা হয়েছে এখানে) */}
      <div
        className={`overflow-y-auto transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-[85vh] opacity-100 border-t border-gray-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4 px-4 py-4 bg-white">
          {/* Search bar for mobile/tablet */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-3 pr-9 text-sm text-gray-700 outline-none focus:border-[#6C5CE7] focus:bg-white"
            />
            <FiSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Navigation Links for mobile/tablet */}
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive(link.href)
                  ? "bg-[#6C5CE7]/10 text-[#6C5CE7]"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn && (
              <>
                <Link
                  href="/dashboard/add-course"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <FiPlusCircle size={16} className="text-gray-400" />
                  Add Course
                </Link>
                <Link
                  href="/dashboard/my-listings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <MdOutlinePlaylistAddCheckCircle size={16} className="text-gray-400" />
                  My Listings
                </Link>
                <Link
                  href="/dashboard/my-courses"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <FiGrid size={16} className="text-gray-400" />
                  My Courses
                </Link>
                <Link
                  href="/dashboard/my-wishlist"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <MdFormatListBulletedAdd size={16} className="text-gray-400" />
                  My Wishlist
                </Link>
              </>
            )}
          </nav>

          {/* User actions / Auth buttons inside mobile drawer */}
          <div className="mt-1 border-t border-gray-100 pt-4">
            {isLoggedIn ? (
              <div className="flex flex-col gap-1">
                {userName && (
                  <div className="px-3 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Signed in as: <span className="text-gray-900 font-semibold normal-case block text-sm mt-0.5">{userName}</span>
                  </div>
                )}
                {/* সরাসরি Signed in as এর নিচে লগআউট বাটন */}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50/60 transition-colors mt-2"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl bg-[#6C5CE7] px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#5b4bd6] transition-colors"
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