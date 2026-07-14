"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/courses/CourseCard";
import CourseCardSkeleton from "../../components/courses/CoursesCardSkeleton";
import FilterSidebar from "../../components/courses/FilterSidebar";
import { Course, CoursesApiResponse } from "../../types/course";
import { Button, Drawer } from "@heroui/react";

const PAGE_LIMIT = 12;

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter State
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState("newest");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // API call function
  const loadData = async (
    currentSearch = search,
    currentCategory = category,
    currentLevel = level,
    currentMaxPrice = maxPrice,
    currentSort = sortBy,
    currentPage = page
  ) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (currentSearch.trim()) params.set("search", currentSearch.trim());
      if (currentCategory) params.set("category", currentCategory);
      if (currentLevel) params.set("level", currentLevel);
      params.set("maxPrice", String(currentMaxPrice));
      params.set("sort", currentSort);
      params.set("page", String(currentPage));
      params.set("limit", String(PAGE_LIMIT));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses?${params.toString()}`
      );
      const data: CoursesApiResponse = await res.json();

      if (!data.success) throw new Error("Failed to load courses");

      setCourses(data.data || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("API Fetch Error: ", err);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Page change tracker
  useEffect(() => {
    loadData(search, category, level, maxPrice, sortBy, page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Sort dropdown
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setPage(1);
    loadData(search, category, level, maxPrice, newSort, 1);
  };

  // Filter apply click
  const handleApplyFilters = () => {
    setPage(1);
    loadData(search, category, level, maxPrice, sortBy, 1);
    setIsDrawerOpen(false);
  };

  // Reset clean logic
  const handleReset = () => {
    setSearch("");
    setCategory("");
    setLevel("");
    setMaxPrice(200);
    setSortBy("newest");
    setPage(1);
    loadData("", "", "", 200, "newest", 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* MAIN CONTENT WRAPPER - PERFECTLY ALIGNED WITH THE NAVBAR WIDTH */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            Explore Here
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Explore Our Exclusive Courses
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* DESKTOP SIDEBAR */}
          <div className="hidden lg:block">
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
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-5 gap-4">
              <div className="flex items-center gap-3">
                {/* MOBILE FILTER BUTTON */}
                <Button 
                  variant="secondary" 
                  className="lg:hidden text-sm px-4 py-2 bg-white border border-gray-200"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  Filters
                </Button>
                
                <p className="text-sm text-gray-500 hidden sm:block">
                  {loading
                    ? "Loading courses..."
                    : `Showing ${courses.length ? (page - 1) * PAGE_LIMIT + 1 : 0}-${
                        (page - 1) * PAGE_LIMIT + courses.length
                      } of ${total} courses`}
                </p>
              </div>

              {/* SORTING DROPDOWN */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500 whitespace-nowrap">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
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

            {/* PAGINATION */}
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
      </main>

      {/* MOBILE DRAWER */}
      <Drawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="h-full bg-white max-w-xs w-full flex flex-col">
              <Drawer.Header className="border-b border-gray-100 px-5 py-4 flex justify-between items-center">
                <Drawer.Heading className="text-base font-semibold text-gray-900">Filters</Drawer.Heading>
                <Button 
                  slot="close" 
                  variant="secondary" 
                  className="p-1 h-auto min-w-0 bg-transparent text-gray-400 hover:text-gray-700 text-sm"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  ✕
                </Button>
              </Drawer.Header>
              
              <Drawer.Body className="overflow-y-auto p-5 flex-1">
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
                  isMobileContainer={true}
                />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
}