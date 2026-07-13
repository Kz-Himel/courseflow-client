"use client";

import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import type { Course } from "@/types/course";

const tabs = ["Overview", "Curriculum", "Instructor", "Reviews"] as const;
type Tab = (typeof tabs)[number];

export default function CourseTabs({ course }: { course: Course }) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? "text-violet-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            {tab === "Reviews" && (
              <span className="ml-1 text-xs text-gray-400">
                ({course.reviewCount})
              </span>
            )}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {course.fullDescription}
          </p>

          {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
            <>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                You will learn:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.whatYouWillLearn.map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <FaRegCheckCircle className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{point}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "Curriculum" && (
        <div className="space-y-3">
          {course.curriculum && course.curriculum.length > 0 ? (
            course.curriculum.map((section, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {section.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {section.lessonsCount} lessons
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {section.duration}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Curriculum details coming soon.
            </p>
          )}
        </div>
      )}

      {activeTab === "Instructor" && (
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-semibold text-lg flex-shrink-0">
            {course.instructorName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {course.instructorName}
            </p>
            <p className="text-xs text-gray-500 mb-2">
              {course.instructorTitle || "Instructor"}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {course.instructorBio ||
                "This instructor has years of industry experience and has helped thousands of students achieve their learning goals."}
            </p>
          </div>
        </div>
      )}

      {activeTab === "Reviews" && (
        <div className="space-y-5">
          {course.reviews && course.reviews.length > 0 ? (
            course.reviews.map((review, i) => (
              <div
                key={i}
                className="pb-5 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-gray-900">
                    {review.userName}
                  </p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={
                          idx < review.rating
                            ? "text-orange-400"
                            : "text-gray-200"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No reviews yet.</p>
          )}
        </div>
      )}
    </div>
  );
}