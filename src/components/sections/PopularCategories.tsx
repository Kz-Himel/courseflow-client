// components/home/PopularCategories.tsx
import Link from "next/link";
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
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Popular categories
        </h2>
        <Link
          href="/courses"
          className="flex items-center gap-1 text-sm font-medium text-[#6C5CE7] hover:text-[#5b4bd6]"
        >
          View all
          <FiArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map(({ label, href, count, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-6 text-center transition-colors hover:border-[#6C5CE7]/30 hover:bg-[#6C5CE7]/5"
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
    </section>
  );
}