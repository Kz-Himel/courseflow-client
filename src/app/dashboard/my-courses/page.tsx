"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaStar, FaClock, FaBookOpen } from "react-icons/fa";
import { EnrolledCourse } from "@/types/payment";

const getYouTubeThumbnail = (url: string) => {
  if (!url) return null;
  const videoId = url.split("v=")[1]?.split("&")[0];
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : url;
};

export default function MyCoursesPage() {
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;

        if (!token) {
          toast.error("Please log in to view your courses");
          router.push("/auth/login");
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          toast.error("Session expired. Please log in again.");
          router.push("/auth/login");
          return;
        }

        const data = await res.json();
        setEnrolledCourses(data.courses || []);
      } catch (error) {
        toast.error("Failed to load your courses");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyCourses();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-sm text-gray-500 mt-1">
            All the courses you&apos;ve enrolled in, in one place.
          </p>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="aspect-video w-full bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded-xl w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && enrolledCourses.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <FaBookOpen className="w-12 h-12 text-violet-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              You haven&apos;t enrolled in any course yet
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Explore our courses and start learning something new today.
            </p>
            <Link
              href="/courses"
              className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        )}

        {/* Course grid */}
        {!isLoading && enrolledCourses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {enrolledCourses.map((item) => {
              // ২. CourseCard এর মতই চেক করে ইউটিউব বা ডিরেক্ট ইমেজ URL নির্ধারণ
              // line 110 পরিবর্তন করে এটা লিখুন:
              const rawThumbnail = (item.course as any)?.thumbnailUrl || item.course?.thumbnail;
              const displayThumbnail = rawThumbnail?.includes("youtube.com")
                ? getYouTubeThumbnail(rawThumbnail)
                : rawThumbnail;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
                >
                  {/* Thumbnail Wrapper */}
                  <div className="relative aspect-video w-full bg-violet-100 flex items-center justify-center overflow-hidden border-b border-gray-100">
                    {displayThumbnail ? (
                      <img
                        src={displayThumbnail}
                        alt={item.course?.title || "Course thumbnail"}
                        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.fallback-placeholder');
                          if (fallback) fallback.classList.remove('hidden');
                        }}
                      />
                    ) : null}

                    {/* Fallback Placeholder (যদি ইমেজ না থাকে বা ক্র্যাশ করে) */}
                    <div className={`fallback-placeholder absolute inset-0 flex flex-col items-center justify-center bg-violet-50 px-4 text-center ${displayThumbnail ? 'hidden' : ''}`}>
                      <FaBookOpen className="w-6 h-6 text-violet-400 mb-1.5" />
                      <span className="text-violet-600 font-semibold text-xs tracking-wide">
                        {(item.course as any)?.category || "Course"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-xs font-medium text-violet-600 bg-violet-50 w-fit px-2 py-0.5 rounded-full mb-2">
                      Enrolled
                    </span>

                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 min-h-[40px]">
                      {item.course?.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">{item.course?.instructorName}</p>

                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                      {item.course?.duration && (
                        <span className="flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          {item.course.duration}
                        </span>
                      )}
                      {item.course?.lessons && (
                        <span className="flex items-center gap-1">
                          <FaStar className="w-3 h-3" />
                          {item.course.lessons} Lessons
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/courses/${item.course?._id}`}
                      className="mt-auto w-full text-center bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}