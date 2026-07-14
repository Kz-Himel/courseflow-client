"use client";

import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rafiul Ahsan",
    role: "Frontend Developer at Pathao",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    quote:
      "CourseFlow completely changed how I learn. The React course took me from confused beginner to landing my first dev job in 4 months.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "UI/UX Designer",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
    quote:
      "The instructors actually respond to questions and the project-based lessons made everything click. Best investment I've made in my career.",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    role: "Backend Engineer at Chaldal",
    avatar: "https://i.pravatar.cc/100?img=51",
    rating: 4,
    quote:
      "Solid course structure and the Node.js masterclass is genuinely production-grade content, not just theory.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? "text-orange-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            Loved by 10,000+ Students
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Real stories from learners who leveled up their careers with CourseFlow
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col h-full"
            >
              <FaQuoteLeft className="w-5 h-5 text-violet-200 mb-3" />
              <StarRating rating={t.rating} />
              <p className="text-sm text-gray-700 mt-3 mb-5 flex-1 leading-relaxed">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}