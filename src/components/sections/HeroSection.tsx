"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineBookOpen, HiOutlineUserGroup } from "react-icons/hi2";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { FaStar } from "react-icons/fa";

const STATS = [
  { icon: HiOutlineBookOpen, value: "500+", label: "Courses" },
  { icon: HiOutlineUserGroup, value: "10K+", label: "Students" },
  { icon: PiChalkboardTeacherLight, value: "200+", label: "Instructors" },
];

// Framer Motion Variants for Text Content (Stagger effect)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Floating Animation for SVG Icons
const floatAnimation = (delay: number = 0) => ({
  y: ["0px", "-10px", "0px"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
    delay: delay,
  },
});

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[62vh] max-w-7xl flex-col items-center gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-16 overflow-hidden">
      {/* Left: text content with Reveal Stagger Animation */}
      <motion.div
        className="flex w-full flex-col items-start lg:w-1/2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span 
          variants={itemVariants}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#6C5CE7]/10 px-4 py-1.5 text-sm font-medium text-[#6C5CE7]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#6C5CE7]" />
          Start learning today
        </motion.span>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl"
        >
          Discover. Learn.
          <br />
          <span className="text-[#6C5CE7]">Succeed.</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="mt-5 max-w-md text-base text-gray-600"
        >
          Explore top quality courses from expert instructors and take your
          skills to the next level.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/courses"
            className="group flex items-center gap-2 rounded-lg bg-[#6C5CE7] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#5b4bd6] hover:shadow-lg hover:shadow-[#6C5CE7]/20"
          >
            Explore courses
            <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-800 transition-all hover:bg-gray-50 hover:border-gray-300"
          >
            How it works
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div 
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center gap-8"
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6C5CE7]/10 text-[#6C5CE7]">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-lg font-bold leading-none text-gray-900">
                  {value}
                </p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF7A59]/10 text-[#FF7A59]">
              <FaStar size={16} />
            </span>
            <div>
              <p className="text-lg font-bold leading-none text-gray-900">
                4.8/5
              </p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right: Illustration with Interactive & Floating Animations */}
      <motion.div 
        className="flex w-full items-center justify-center lg:w-1/2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <svg
          viewBox="0 0 480 420"
          className="w-full max-w-md drop-shadow-xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* background blob */}
          <circle cx="260" cy="200" r="170" fill="#6C5CE7" opacity="0.08" />

          {/* laptop / screen */}
          <rect x="140" y="70" width="180" height="120" rx="10" fill="#F3F2FD" />
          <rect x="152" y="82" width="156" height="96" rx="4" fill="#6C5CE7" />
          <circle cx="230" cy="130" r="18" fill="#FFFFFF" opacity="0.9" />
          <path d="M225 122 L242 130 L225 138 Z" fill="#6C5CE7" />

          {/* books stack */}
          <rect x="150" y="300" width="220" height="24" rx="4" fill="#0F1629" />
          <rect x="160" y="278" width="200" height="24" rx="4" fill="#FF7A59" />
          <rect x="170" y="256" width="180" height="24" rx="4" fill="#6C5CE7" />

          {/* person - simplified seated figure */}
          <g>
            <circle cx="255" cy="205" r="26" fill="#2C2C2A" />
            <rect
              x="225"
              y="228"
              width="60"
              height="70"
              rx="20"
              fill="#6C5CE7"
            />
            <rect
              x="205"
              y="250"
              width="30"
              height="16"
              rx="8"
              fill="#6C5CE7"
            />
            <rect
              x="275"
              y="250"
              width="30"
              height="16"
              rx="8"
              fill="#6C5CE7"
            />
            {/* legs crossed */}
            <ellipse cx="255" cy="300" rx="45" ry="14" fill="#0F1629" />
          </g>

          {/* floating icon: chart (Animated) */}
          <motion.g 
            transform="translate(370,110)"
            animate={floatAnimation(0)}
          >
            <circle r="24" fill="#FFFFFF" stroke="#EEF0F4" strokeWidth="2" />
            <path
              d="M-9 6 L-3 -2 L3 3 L9 -8"
              stroke="#FF7A59"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* floating icon: bulb (Animated) */}
          <motion.g 
            transform="translate(120,150)"
            animate={floatAnimation(0.5)} // offset delay to look natural
          >
            <circle r="20" fill="#FFFFFF" stroke="#EEF0F4" strokeWidth="2" />
            <circle cy="-3" r="8" fill="#6C5CE7" opacity="0.85" />
            <rect x="-4" y="4" width="8" height="6" rx="1.5" fill="#6C5CE7" />
          </motion.g>

          {/* floating background dots (Subtle movement) */}
          <motion.circle cx="100" cy="90" r="4" fill="#6C5CE7" opacity="0.4" animate={floatAnimation(0.2)} />
          <motion.circle cx="380" cy="260" r="5" fill="#FF7A59" opacity="0.4" animate={floatAnimation(0.7)} />
          <motion.circle cx="200" cy="60" r="3" fill="#6C5CE7" opacity="0.3" animate={floatAnimation(0.4)} />
        </svg>
      </motion.div>
    </section>
  );
}