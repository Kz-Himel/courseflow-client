"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "How do I get access to a course after purchasing?",
    answer:
      "As soon as your payment is confirmed, the course is instantly added to your My Courses page. You get lifetime access and can start learning right away, on any device.",
  },
  {
    id: 2,
    question: "Do I get a certificate after completing a course?",
    answer:
      "Yes. Every course on CourseFlow includes a certificate of completion once you finish all the lessons, which you can download and share on LinkedIn.",
  },
  {
    id: 3,
    question: "Can I get a refund if the course isn't what I expected?",
    answer:
      "We offer a 7-day refund window from the date of purchase, no questions asked, as long as you haven't completed more than 20% of the course.",
  },
  {
    id: 4,
    question: "Are the courses beginner-friendly?",
    answer:
      "Each course clearly shows its level (Beginner, Intermediate, or Advanced) on the course card, so you can pick exactly where to start based on your experience.",
  },
  {
    id: 5,
    question: "Can I become an instructor on CourseFlow?",
    answer:
      "Absolutely. Once logged in, you can use the Add Course feature to publish your own course, manage it from My Listings, and track enrollments.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    // w-full py-16 দিয়ে পুরো স্ক্রিন কভার করা হলো
    <section className="w-full py-16 bg-white">
      {/* max-w-3xl থেকে বাড়িয়ে বাকি সেকশনগুলোর মতো max-w-7xl করা হলো */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* হেডার ডিজাইন বাকিগুলোর সাথে ১০০% ম্যাচ করা হলো */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12" // mb-10 থেকে বাড়িয়ে mb-12 করা হয়েছে
        >
          <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
            FAQ
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Everything you need to know before you get started
          </p>
        </motion.div>

        {/* FAQ items-এর কন্টেইনারটিকেও w-full করা হয়েছে যেন এটি পুরো ৭xl জায়গা জুড়ে ছড়ায় */}
        <div className="w-full space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`w-full border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-violet-300 bg-violet-50/40 shadow-sm" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-sm font-semibold text-gray-900 sm:text-base">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      isOpen ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <FaChevronDown className="w-3 h-3" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}