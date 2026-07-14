"use client";

import { useState, useEffect } from "react";
import { FaRegHeart, FaRegClock, FaSignal } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { IoIosGlobe } from "react-icons/io";
import type { Course } from "@/types/course";
import { authClient } from "@/lib/auth-client";
import EnrollButton from "./EnrollButton";
import { toast } from "react-toastify";

export default function EnrollCard({ course }: { course: Course }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  const discountPercent = course.originalPrice
    ? Math.round(
        ((course.originalPrice - course.price) / course.originalPrice) * 100
      )
    : 0;

  // Check if this course is already in wishlist
  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;

        if (!token) {
          setChecking(false);
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          const exists = data.data?.some(
            (item: { courseId: string }) => item.courseId === course._id
          );
          setWishlisted(!!exists);
        }
      } catch (err) {
        // console.error("Failed to check wishlist status", err);
        toast.error("Failed to check wishlist status");
      } finally {
        setChecking(false);
      }
    };

    checkWishlistStatus();
  }, [course._id]);

  const handleWishlistClick = async () => {
    if (wishlisted || pending) return;
    setError("");
    setPending(true);

    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        setError("Please log in to use wishlist");
        toast.error("Please log in to use wishlist");
        setPending(false);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: course._id }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Failed to add to wishlist");
        toast.error(data.message || "Failed to add to wishlist");
        setPending(false);
        return;
      }

      setWishlisted(true);
      toast.success("Successfully added to wishlist!"); 
    } catch (err) {
      setError("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  };

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

      {/* Enroll Button */}
      <EnrollButton courseId={course._id}/>

      <button
        onClick={handleWishlistClick}
        disabled={wishlisted || pending || checking}
        className={`w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg border transition-colors mb-2 ${
          wishlisted
            ? "border-red-200 bg-red-50 text-red-500 cursor-default"
            : "border-gray-200 text-gray-600 hover:bg-gray-50"
        } disabled:opacity-70`}
      >
        <FaRegHeart
          className={`w-4 h-4 ${
            wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
        {pending
          ? "Adding..."
          : wishlisted
          ? "Added to Wishlist"
          : "Add to Wishlist"}
      </button>

      {error && (
        <p className="text-xs text-red-500 mb-3 text-center">{error}</p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-gray-100 mt-3">
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