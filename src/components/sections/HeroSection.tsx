"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineBookOpen, HiOutlineUserGroup } from "react-icons/hi2";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

const STATS = [
  { icon: HiOutlineBookOpen, value: "500+", label: "Courses" },
  { icon: HiOutlineUserGroup, value: "10K+", label: "Students" },
  { icon: PiChalkboardTeacherLight, value: "200+", label: "Instructors" },
];

const SLIDER_COURSES = [
  "⚡ Next.js 16 Masterclass",
  "🎨 Ultimate UI/UX Design BootCamp",
  "🤖 AI & Machine Learning for Beginners",
  "🚀 Full-Stack Web Development",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

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
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_COURSES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight * 0.7,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full min-h-screen lg:min-h-[65vh] lg:max-h-[75vh] flex items-center bg-white overflow-hidden py-10 sm:py-14 lg:py-0">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-12">
        
        {/* Left: Text Content & CTAs */}
        <motion.div
          className="flex w-full flex-col items-center text-center lg:items-start lg:text-left lg:w-[48%] z-10 order-1 lg:order-none"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            variants={itemVariants}
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#6C5CE7]/10 px-3.5 py-1 text-xs sm:text-sm font-medium text-[#6C5CE7]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#6C5CE7]" />
            Start learning today
          </motion.span>

          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl sm:leading-tight"
          >
            Discover. Learn.
            <br />
            <span className="text-[#6C5CE7]">Succeed.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="mt-3 max-w-md text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed px-2 sm:px-0"
          >
            Explore top quality courses from expert instructors and take your
            skills to the next level.
          </motion.p>

          {/* Interactive Call To Actions */}
          <motion.div 
            variants={itemVariants}
            className="mt-5 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3 w-full sm:w-auto"
          >
            <Link
              href="/courses"
              className="group flex items-center gap-2 rounded-xl bg-[#6C5CE7] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:bg-[#5b4bd6] hover:shadow-lg hover:shadow-[#6C5CE7]/20 active:scale-95"
            >
              Explore courses
              <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 active:scale-95"
            >
              How it works
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 sm:mt-8 grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-x-8 gap-y-4 w-full sm:w-auto text-left border-t border-gray-100 pt-5 sm:pt-6 lg:border-none lg:pt-0"
          >
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6C5CE7]/10 text-[#6C5CE7]">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-sm sm:text-base font-bold leading-none text-gray-900">{value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FF7A59]/10 text-[#FF7A59]">
                <FaStar size={14} />
              </span>
              <div>
                <p className="text-sm sm:text-base font-bold leading-none text-gray-900">4.8/5</p>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Rating</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: SVG + Smart Slider */}
        <div className="flex w-full flex-col items-center justify-center lg:w-[48%] gap-5 order-2 lg:order-none">
          <motion.div 
            className="w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            <svg
              viewBox="0 0 480 420"
              className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md max-h-[30vh] md:max-h-[38vh] lg:max-h-[42vh] drop-shadow-xl transition-transform duration-500 hover:scale-[1.01]"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* background blob */}
              <circle cx="260" cy="200" r="175" fill="#6C5CE7" opacity="0.09" />

              {/* laptop / screen */}
              <rect x="130" y="60" width="200" height="135" rx="12" fill="#F3F2FD" />
              <rect x="143" y="73" width="174" height="108" rx="6" fill="#6C5CE7" />
              <circle cx="230" cy="127" r="20" fill="#FFFFFF" opacity="0.9" />
              <path d="M224 118 L242 127 L224 136 Z" fill="#6C5CE7" />

              {/* books stack */}
              <rect x="140" y="310" width="240" height="26" rx="4" fill="#0F1629" />
              <rect x="150" y="286" width="220" height="26" rx="4" fill="#FF7A59" />
              <rect x="160" y="262" width="200" height="26" rx="4" fill="#6C5CE7" />

              {/* person */}
              <g>
                <circle cx="255" cy="205" r="28" fill="#2C2C2A" />
                <rect x="222" y="230" width="66" height="75" rx="22" fill="#6C5CE7" />
                <rect x="200" y="252" width="32" height="18" rx="8" fill="#6C5CE7" />
                <rect x="278" y="252" width="32" height="18" rx="8" fill="#6C5CE7" />
                <ellipse cx="255" cy="308" rx="50" ry="15" fill="#0F1629" />
              </g>

              {/* floating icons */}
              <motion.g transform="translate(390,100)" animate={floatAnimation(0)}>
                <circle r="26" fill="#FFFFFF" stroke="#EEF0F4" strokeWidth="2" />
                <path d="M-9 6 L-3 -2 L3 3 L9 -8" stroke="#FF7A59" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>

              <motion.g transform="translate(100,140)" animate={floatAnimation(0.4)}>
                <circle r="22" fill="#FFFFFF" stroke="#EEF0F4" strokeWidth="2" />
                <circle cy="-3" r="9" fill="#6C5CE7" opacity="0.85" />
                <rect x="-4" y="4" width="8" height="6" rx="1.5" fill="#6C5CE7" />
              </motion.g>

              {/* dots */}
              <motion.circle cx="90" cy="80" r="5" fill="#6C5CE7" opacity="0.4" animate={floatAnimation(0.2)} />
              <motion.circle cx="410" cy="260" r="6" fill="#FF7A59" opacity="0.4" animate={floatAnimation(0.6)} />
              <motion.circle cx="190" cy="40" r="4" fill="#6C5CE7" opacity="0.3" animate={floatAnimation(0.3)} />
            </svg>
          </motion.div>

          {/* Smart Slider */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm bg-gray-50 border border-gray-100 rounded-xl p-2.5 flex items-center justify-center gap-3 shadow-sm overflow-hidden h-10"
          >
            <div className="flex items-center gap-1.5 shrink-0 border-r border-gray-200 pr-2.5">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500"></span>
              </span>
              <span className="text-[10px] font-bold text-gray-400 tracking-wide uppercase">Trending</span>
            </div>
            
            <div className="relative flex-1 h-full flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap truncate w-full"
                >
                  {SLIDER_COURSES[currentSlide]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Visual Flow Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:block">
        <button 
          onClick={scrollToNextSection}
          className="text-gray-400 hover:text-[#6C5CE7] transition-colors p-2"
          aria-label="Scroll to next section"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <HiOutlineChevronDoubleDown size={20} />
          </motion.div>
        </button>
      </div>
    </section>
  );
}