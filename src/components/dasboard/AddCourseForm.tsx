"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import type { CourseFormData, CourseApiResponse } from "@/types/course.js";

const initialForm: CourseFormData = {
  title: "",
  instructorName: "",
  category: "",
  level: "",
  duration: "",
  price: "",
  thumbnailUrl: "",
  shortDescription: "",
  fullDescription: "",
};

const categories = [
  "Development",
  "Design",
  "Business",
  "Marketing",
  "Data Science",
  "Personal Development",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function AddCourseForm() {
  const [form, setForm] = useState<CourseFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 1. Fetch the active session dynamically from your auth client
  const { data: session } = authClient.useSession();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setForm(initialForm);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (
    !form.title ||
    !form.instructorName ||
    !form.category ||
    !form.level ||
    !form.duration ||
    !form.price
  ) {
    setError("Please fill in all required fields.");
    return;
  }

  setLoading(true);

  try {
    const tokenRes = await authClient.token?.();
    const token = tokenRes?.data?.token;

    if (!session || !token) {
      setError("You must be logged in to add a course.");
      return; 
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        rating: 0,
        reviewCount: 0,
        status: "Published",
      }),
    });

    const data: CourseApiResponse = await res.json();

    if (!res.ok || !data.success) {
      setError(data.message || "Failed to add course");
      return; // setLoading(false) finally তে চলে যাবে
    }

    setSuccess("Course published successfully!");
    setForm(initialForm);
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  } finally {
    // এখানে কোনো কন্ডিশন ছাড়াই সরাসরি setLoading(false) দিন
    setLoading(false);
  }
};

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Add Course</h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter course title"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Instructor Name
            </label>
            <input
              type="text"
              name="instructorName"
              value={form.instructorName}
              onChange={handleChange}
              placeholder="Enter instructor name"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Level
            </label>
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="">Select level</option>
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Duration (e.g. 10 Hours)
            </label>
            <input
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="e.g. 10 Hours"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Price (e.g. 49.99)
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 49.99"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Thumbnail URL
          </label>
          <input
            type="text"
            name="thumbnailUrl"
            value={form.thumbnailUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            rows={2}
            placeholder="One or two lines shown on the course card"
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Description
          </label>
          <textarea
            name="fullDescription"
            value={form.fullDescription}
            onChange={handleChange}
            rows={6}
            placeholder="Detailed course description shown on the details page"
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Publishing..." : "Publish Course"}
          </button>
        </div>
      </form>
    </div>
  );
}