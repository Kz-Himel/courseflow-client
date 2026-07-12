import Link from "next/link";
import Image from "next/image";
import { FaRegStar  } from "react-icons/fa";
import type { Course } from "@/types/course";

const categoryColors: Record<string, string> = {
  Development: "bg-blue-950 text-blue-300",
  Design: "bg-orange-500 text-white",
  Business: "bg-emerald-900 text-emerald-300",
  Marketing: "bg-violet-700 text-white",
  "Data Science": "bg-slate-900 text-white",
  "Personal Development": "bg-indigo-900 text-indigo-200",
};

export default function CourseCard({ course }: { course: Course }) {
  const badgeClass =
    categoryColors[course.category] || "bg-violet-700 text-white";

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className={`relative w-full h-40 flex items-center justify-center ${badgeClass}`}>
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-sm font-semibold opacity-80">
            {course.category}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <span className="text-xs font-medium text-violet-600 mb-1">
          {course.category}
        </span>

        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
          {course.title}
        </h3>

        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
          {course.shortDescription}
        </p>

        <p className="text-xs text-gray-500 mb-3">{course.instructorName}</p>

        <div className="flex items-center gap-1 mb-3">
          <FaRegStar className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
          <span className="text-xs font-medium text-gray-700">
            {course.rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">
            ({course.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-sm font-bold text-gray-900">
            ${course.price.toFixed(2)}
          </span>
          <Link
            href={`/courses/${course._id}`}
            className="text-xs font-semibold text-violet-600 hover:text-violet-700"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}