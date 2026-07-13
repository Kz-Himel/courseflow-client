"use client";

import { useState } from "react";
import { FaRegHeart, FaRegClock, FaSignal } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { IoIosGlobe } from "react-icons/io";
import type { Course } from "@/types/course";

export default function EnrollCard({ course }: { course: Course }) {
  const [wishlisted, setWishlisted] = useState(false);

  const discountPercent = course.originalPrice
    ? Math.round(
        ((course.originalPrice - course.price) / course.originalPrice) * 100
      )
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl font-bold text-gray-900">
          ${course.price.toFixed(2)}
        </span>
        {course.originalPrice && (
          <>
            <span className="text-sm text-gray-400 line-through">
              ${course.originalPrice.toFixed(2)}
            </span>
            <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
              {discountPercent}% OFF
            </span>
          </>
        )}
      </div>

      <button className="w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold py-3 rounded-lg transition-colors mb-2">
        Enroll Now
      </button>
      <button
        onClick={() => setWishlisted((w) => !w)}
        className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-600 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors mb-5"
      >
        <FaRegHeart
          className={`w-4 h-4 ${
            wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
        Add to Wishlist
      </button>

      <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <FaSignal className="w-4 h-4 text-violet-500" />
          <div>
            <p className="text-[11px] text-gray-400">Level</p>
            <p className="text-xs font-medium text-gray-800">
              {course.level}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaRegClock className="w-4 h-4 text-violet-500" />
          <div>
            <p className="text-[11px] text-gray-400">Duration</p>
            <p className="text-xs font-medium text-gray-800">
              {course.duration}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FiBookOpen className="w-4 h-4 text-violet-500" />
          <div>
            <p className="text-[11px] text-gray-400">Lessons</p>
            <p className="text-xs font-medium text-gray-800">
              {course.lessons || "—"} Lessons
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IoIosGlobe className="w-4 h-4 text-violet-500" />
          <div>
            <p className="text-[11px] text-gray-400">Language</p>
            <p className="text-xs font-medium text-gray-800">
              {course.language || "English"}
            </p>
          </div>
        </div>
      </div>

      <ul className="space-y-2.5">
        {[
          `${course.duration} On-Demand Video`,
          "Full Lifetime Access",
          "Access on Mobile and TV",
          "Certificate of Completion",
        ].map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}