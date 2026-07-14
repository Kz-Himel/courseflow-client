"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import CourseCard from "@/components/courses/CourseCard";
import { Course } from "@/types/payment";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function FeaturedCoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/featured`);
        const data = await res.json();
        setCourses(data.data || []);
      } catch (error) {
        console.error("Failed to load featured courses", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="w-full py-16 bg-white">
      {/* w-full দিয়ে নিশ্চিত করা হলো এটা পুরো স্ক্রিন জুড়েই থাকবে */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* হেডারটিকেও টেস্টমোনিয়ালের মতো একদম text-center এবং ফুল উইডথ করা হলো */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
            Featured Courses
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            Handpicked for You
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Explore our top-rated courses carefully selected to boost your professional skills
          </p>
        </motion.div>

        {/* Skeleton loader — w-full নিশ্চিত করা হয়েছে */}
        {isLoading && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse w-full"
              >
                <div className="h-36 bg-gray-200 w-full" />
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
        {!isLoading && courses.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-10 w-full">
            No featured courses available right now.
          </p>
        )}

        {/* Course grid — w-full দিয়ে পুরো ৭xl উইডথ জুড়ে গ্রিড ছড়াবে */}
        {!isLoading && courses.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {courses.map((course) => (
              <motion.div 
                key={course._id} 
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="w-full" // প্রতিটি কার্ডের র‍্যাপার ফুল উইডথ পাবে
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All বাটনটি এখন নিচে সুন্দর করে সেন্টারে বসানো হয়েছে, যা দেখতে প্রফেশনাল লাগবে */}
        <div className="text-center mt-10">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-5 py-2.5 rounded-xl transition-all duration-200"
          >
            View all courses <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </section>
  );
}