"use client";

import { useEffect, useState, useCallback } from "react";
import CourseCard from "@/components/courses/CourseCard";
import CourseCardSkeleton from "../../components/courses/CoursesCardSkeleton";
import FilterSidebar from "../../components/courses/FilterSidebar";
import { Course, CoursesApiResponse } from "../../types/course.js";

const PAGE_LIMIT = 12;

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState("newest");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      if (level) params.set("level", level);
      if (maxPrice) params.set("maxPrice", String(maxPrice));
      params.set("sort", sortBy);
      params.set("page", String(page));
      params.set("limit", String(PAGE_LIMIT));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses?${params.toString()}`
      );
      const data: CoursesApiResponse = await res.json();

      if (!data.success) throw new Error("Failed to load courses");

      setCourses(data.data);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, category, level, maxPrice, sortBy, page]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleApplyFilters = () => {
    setPage(1);
    fetchCourses();
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setLevel("");
    setMaxPrice(200);
    setSortBy("newest");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <FilterSidebar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          level={level}
          onLevelChange={setLevel}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          onApply={handleApplyFilters}
          onReset={handleReset}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">
              {loading
                ? "Loading courses..."
                : `Showing ${courses.length ? (page - 1) * PAGE_LIMIT + 1 : 0}-${
                    (page - 1) * PAGE_LIMIT + courses.length
                  } of ${total} courses`}
            </p>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {loading
              ? Array.from({ length: PAGE_LIMIT }).map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))
              : courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
          </div>

          {!loading && courses.length === 0 && (
            <div className="text-center py-16 text-gray-500 text-sm">
              No courses found matching your filters.
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-sm text-gray-500 disabled:opacity-40"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    page === i + 1
                      ? "bg-violet-600 text-white"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-sm text-gray-500 disabled:opacity-40"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}