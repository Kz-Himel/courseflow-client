"use client";

import { motion } from "framer-motion";
import { FaStar, FaLinkedin, FaTwitter, FaUsers, FaBookOpen } from "react-icons/fa";

interface Instructor {
  id: number;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  students: string;
  courses: number;
}

const instructors: Instructor[] = [
  {
    id: 1,
    name: "John Smith",
    title: "Senior Frontend Developer, ex-Meta",
    avatar: "https://i.pravatar.cc/200?img=15",
    rating: 4.8,
    students: "12.4K",
    courses: 6,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Backend Architect, Node.js Core Contributor",
    avatar: "https://i.pravatar.cc/200?img=45",
    rating: 4.7,
    students: "9.1K",
    courses: 4,
  },
  {
    id: 3,
    name: "Michael Brown",
    title: "TypeScript Instructor & Author",
    avatar: "https://i.pravatar.cc/200?img=60",
    rating: 4.9,
    students: "15.7K",
    courses: 8,
  },
  {
    id: 4,
    name: "Emily Davis",
    title: "Lead Product Designer, ex-Airbnb",
    avatar: "https://i.pravatar.cc/200?img=48",
    rating: 4.6,
    students: "7.3K",
    courses: 5,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function InstructorsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
            Our Mentors
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            Learn from Industry Experts
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Instructors who've shipped real products at top companies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor, i) => (
            <motion.div
              key={instructor.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -6 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-violet-50">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-semibold text-gray-900 text-sm">{instructor.name}</h3>
              <p className="text-xs text-gray-500 mt-1 mb-3 leading-relaxed">
                {instructor.title}
              </p>

              <div className="flex items-center gap-1 text-xs text-gray-700 mb-4">
                <FaStar className="w-3.5 h-3.5 text-orange-400" />
                <span className="font-semibold">{instructor.rating}</span>
                <span className="text-gray-400">Rating</span>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-4 w-full">
                <span className="flex items-center gap-1">
                  <FaUsers className="w-3 h-3" />
                  {instructor.students}
                </span>
                <span className="flex items-center gap-1">
                  <FaBookOpen className="w-3 h-3" />
                  {instructor.courses} Courses
                </span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button
                  aria-label={`${instructor.name} LinkedIn`}
                  className="text-gray-400 hover:text-violet-600 transition-colors"
                >
                  <FaLinkedin className="w-4 h-4" />
                </button>
                <button
                  aria-label={`${instructor.name} Twitter`}
                  className="text-gray-400 hover:text-violet-600 transition-colors"
                >
                  <FaTwitter className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}