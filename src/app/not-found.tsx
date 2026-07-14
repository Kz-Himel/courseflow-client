// src/app/not-found.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineExclamationCircle, HiArrowLeft } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6 selection:bg-[#5B21B6] selection:text-white">
      <motion.div
        className="text-center max-w-xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Error Icon */}
        <motion.div 
          variants={itemVariants} 
          className="w-24 h-24 rounded-2xl bg-purple-50 flex items-center justify-center text-[#5B21B6] mb-6 shadow-sm"
        >
          <HiOutlineExclamationCircle className="w-14 h-14" />
        </motion.div>

        {/* 404 Text */}
        <motion.h1 
          variants={itemVariants} 
          className="text-8xl font-black tracking-tight text-[#111827]"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2 
          variants={itemVariants} 
          className="text-2xl font-bold text-[#111827] mt-2"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p 
          variants={itemVariants} 
          className="text-[#6B7280] text-base mt-3 max-w-md leading-relaxed"
        >
          The page you are looking for doesn't exist or has been moved. Let's get you back on track with your learning.
        </motion.p>

        {/* Search Bar matching CourseFlow design */}
        <motion.div 
          variants={itemVariants} 
          className="w-full max-w-md mt-8 relative"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for courses..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B21B6] focus:border-transparent shadow-sm transition-all"
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full"
        >
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl font-medium text-sm transition-all shadow-sm">
              <HiArrowLeft className="w-4 h-4" />
              Go Back Home
            </button>
          </Link>

          <Link href="/courses" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-[#111827] hover:bg-gray-50 rounded-xl font-medium text-sm transition-all shadow-sm">
              Explore Courses
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}