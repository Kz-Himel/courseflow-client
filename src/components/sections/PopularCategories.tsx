// components/home/PopularCategories.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCode,
  FiPenTool,
  FiBriefcase,
  FiTrendingUp,
  FiBarChart2,
  FiTarget,
  FiArrowRight,
} from "react-icons/fi";

interface Category {
  label: string;
  href: string;
  count: string;
  icon: typeof FiCode;
}

const CATEGORIES: Category[] = [
  { label: "Development", href: "/courses?category=development", count: "120+ Courses", icon: FiCode },
  { label: "Design", href: "/courses?category=design", count: "80+ Courses", icon: FiPenTool },
  { label: "Business", href: "/courses?category=business", count: "70+ Courses", icon: FiBriefcase },
  { label: "Marketing", href: "/courses?category=marketing", count: "60+ Courses", icon: FiTrendingUp },
  { label: "Data Science", href: "/courses?category=data-science", count: "90+ Courses", icon: FiBarChart2 },
  { label: "Personal Development", href: "/courses?category=personal-development", count: "50+ Courses", icon: FiTarget },
];

export default function PopularCategories() {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
            Categories
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            Popular Categories
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Pick a topic that excites you and start building your future today
          </p>
        </motion.div>

        {/* */}
        <div className="w-full grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map(({ label, href, count, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#6C5CE7]/30 hover:bg-[#6C5CE7]/5 hover:shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#6C5CE7]/10 text-[#6C5CE7] transition-colors group-hover:bg-[#6C5CE7] group-hover:text-white">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="mt-0.5 text-xs text-gray-500">{count}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* 'View all' */}
        <div className="text-center mt-10">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-5 py-2.5 rounded-xl transition-all duration-200"
          >
            View all categories <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}