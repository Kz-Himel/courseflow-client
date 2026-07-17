"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus, FaBookOpen } from "react-icons/fa";
import { MyListedCourse } from "@/types/payment";
import EditCourseModal from "@/components/dasboard/EditCourseModal";

export default function MyListingsPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<MyListedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<MyListedCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMyListings = async () => {
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        toast.error("Please log in to view your listings");
        router.push("/auth/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/my-listings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        toast.error("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      const data = await res.json();
      setCourses(data.data || []);
    } catch (error) {
      toast.error("Failed to load your courses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const handleDelete = async (courseId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;

    setDeletingId(courseId);
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Course deleted");
        setCourses((prev) => prev.filter((c) => c._id !== courseId));
      } else {
        toast.error(data.message || "Failed to delete course");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
istings            <p className="text-sm text-gray-500 mt-1">Courses you&apos;ve added to CourseFlow</p>
          </div>
          <Link
            href="/dashboard/add-course"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors text-sm"
          >
            <FaPlus className="w-3.5 h-3.5" />
            Add New Course
          </Link>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 animate-pulse"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/5" />
                </div>
                <div className="h-3 bg-gray-200 rounded w-12" />
                <div className="h-6 bg-gray-200 rounded-full w-16" />
                <div className="h-6 bg-gray-200 rounded w-12" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && courses.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <FaBookOpen className="w-12 h-12 text-violet-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              You haven&apos;t added any course yet
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Start sharing your knowledge by adding your first course.
            </p>
            <Link
              href="/dashboard/add-course"
              className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
            >
              Add New Course
            </Link>
          </div>
        )}

        {/* Table — desktop */}
        {!isLoading && courses.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500">
                  <th className="p-4 font-medium">Course</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course._id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-violet-100 overflow-hidden shrink-0 flex items-center justify-center">
                          {course.thumbnail ? (
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-violet-500 text-xs font-bold">C</span>
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{course.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{course.category || "—"}</td>
                    <td className="p-4 font-semibold text-gray-900">${course.price}</td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${course.status === "draft"
                            ? "bg-gray-100 text-gray-500"
                            : "bg-emerald-50 text-emerald-600"
                          }`}
                      >
                        {course.status === "draft" ? "Draft" : "Published"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedCourse(course);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-gray-500 hover:text-purple-600 hover:bg-violet-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          disabled={deletingId === course._id}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Card layout — mobile */}
        {!isLoading && courses.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3"
              >
                <div className="w-14 h-14 rounded-lg bg-violet-100 overflow-hidden shrink-0 flex items-center justify-center">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-violet-500 text-xs font-bold">C</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{course.title}</p>
                  <p className="text-xs text-gray-500">
                    {course.category || "—"} • ${course.price}
                  </p>
                  <span
                    className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${course.status === "draft"
                        ? "bg-gray-100 text-gray-500"
                        : "bg-emerald-50 text-emerald-600"
                      }`}
                  >
                    {course.status === "draft" ? "Draft" : "Published"}
                  </span>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    disabled={deletingId === course._id}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <EditCourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdated={(updated) => {
          setCourses((prev) =>
            prev.map((c) => (c._id === updated._id ? updated : c))
          );
        }}
      />
    </div>
  );
}