// components/shared/Footer.tsx
import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi2";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const CATEGORIES = [
  { label: "Development", href: "/courses?category=development" },
  { label: "Design", href: "/courses?category=design" },
  { label: "Business", href: "/courses?category=business" },
  { label: "Marketing", href: "/courses?category=marketing" },
  { label: "Data Science", href: "/courses?category=data-science" },
];

const SUPPORT_LINKS = [
  { label: "Help center", href: "/help" },
  { label: "Terms of service", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Refund policy", href: "/refund" },
];

const SOCIALS = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6C5CE7] text-white">
                <HiOutlineBookOpen size={18} />
              </span>
              <span className="text-lg font-bold text-gray-900">
                CourseFlow
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Your journey to learning starts here.
            </p>

            <div className="mt-5 space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FiMail size={14} />
                <span>support@courseflow.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone size={14} />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin size={14} />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#6C5CE7] hover:text-white"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Quick links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-[#6C5CE7]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-[#6C5CE7]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Support</h3>
            <ul className="mt-4 space-y-2.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-[#6C5CE7]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-gray-500">
              Stay updated with our latest courses.
            </p>
            <form className="mt-4 flex items-center gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#6C5CE7]"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#6C5CE7] text-white transition-colors hover:bg-purple-600"
              >
                <FiArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 sm:flex-row">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} CourseFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <Link href="/terms" className="hover:text-gray-600">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-gray-600">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}