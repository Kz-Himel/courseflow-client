"use client";

import { useEffect, useState, useCallback, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import { MdOutlinePlayCircle, MdLockReset, MdOutlinePhonelinkSetup, MdWorkspacePremium } from "react-icons/md";
import type { Course } from "@/types/course";
import { WishlistProvider } from "@/context/WishlistContext";

// Tab active component components local dynamic data structure
import CourseTabs from "@/components/courses/CourseTabs";
import EnrollCard from "@/components/courses/EnrollCard";
import RelatedCourses from "@/components/courses/RelatedCourses";
import { toast } from "react-toastify";
import { CourseDetailsSkeleton } from "@/components/courses/CourseDetailsSkeleton";

const getYouTubeThumbnail = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
  }
  return url;
};

export default function CourseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [course, setCourse] = useState<Course | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourseFullData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // 1. Fetch main course data
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
        method: "GET",
        headers: headers,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Failed to fetch course data");
        toast.error("Failed to fetch course data")
        return;
      }

      setCourse(data.data);

      // 2. Fetch related courses using the loaded category
      if (data.data?.category) {
        const relatedRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses?category=${encodeURIComponent(
            data.data.category
          )}&limit=4&exclude=${data.data._id}`,
          { method: "GET" }
        );
        const relatedData = await relatedRes.json();
        if (relatedData.success) {
          setRelatedCourses(relatedData.data);
        }
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading full details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCourseFullData();
    }
  }, [id, fetchCourseFullData]);

  if (loading) {
    return (
      <CourseDetailsSkeleton />
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-3">
          <p className="text-sm text-red-500 font-medium">{error || "Course not found"}</p>
          <Link href="/courses" className="text-xs text-violet-600 underline block">Back to Courses</Link>
        </div>
      </div>
    );
  }

  const displayThumbnail =
    course.thumbnailUrl?.includes("youtube.com") || course.thumbnailUrl?.includes("youtu.be")
      ? getYouTubeThumbnail(course.thumbnailUrl)
      : course.thumbnailUrl;

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 md:px-8 lg:py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-violet-600 transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-gray-600 truncate max-w-[200px] sm:max-w-none">{course.title}</span>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* LEFT SIDE: Active Info Content */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm space-y-6">
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-64 h-44 rounded-xl overflow-hidden bg-violet-50 border border-gray-100 flex-shrink-0 shadow-inner">
                  {displayThumbnail && (
                    <Image
                      src={displayThumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </div>

                <div className="flex flex-col justify-center flex-1">
                  <span className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-1">
                    {course.category}
                  </span>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                    {course.title}
                  </h1>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    {course.shortDescription}
                  </p>

                  <div className="flex items-center gap-2.5 mt-4">
                    <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm border border-violet-200">
                      {course.instructorName ? course.instructorName.charAt(0) : "I"}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-800">{course.instructorName}</h4>
                      <p className="text-[11px] text-gray-400">{course.instructorTitle || "Senior Developer"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs Meta Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-5 bg-gray-50 rounded-xl border border-gray-100 text-center sm:text-left">
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase font-medium tracking-wider">Level</span>
                  <span className="text-xs font-semibold text-gray-700">{course.level || "All Levels"}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase font-medium tracking-wider">Duration</span>
                  <span className="text-xs font-semibold text-gray-700">{course.duration || "30 Hours"}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase font-medium tracking-wider">Lessons</span>
                  <span className="text-xs font-semibold text-gray-700">45 Lessons</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase font-medium tracking-wider">Language</span>
                  <span className="text-xs font-semibold text-gray-700">English</span>
                </div>
              </div>

              {/* Dynamic Tabs Component Active */}
              <CourseTabs course={course} />
            </div>

            {/* RIGHT SIDE: Dynamic Enroll Widget Card Active */}
            <div className="lg:col-span-1 sticky top-6">
              <WishlistProvider>
                <EnrollCard course={course} />
              </WishlistProvider>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: Related Courses Grid Activated */}
        <div className="pt-4">
          <RelatedCourses courses={relatedCourses} />
        </div>

      </div>
    </div>
  );
}