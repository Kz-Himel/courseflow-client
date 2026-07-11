"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await authClient.signUp.email(
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
        {
          onSuccess: () => {
            toast.success("Account created successfully! Please login.");
            router.push("/login");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Registration failed. Try again.");
            setIsSubmitting(false);
          },
        }
      );
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Main Container Split-Screen */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="flex w-full min-h-[calc(100vh-160px)] overflow-hidden rounded-2xl border border-gray-100 shadow-md">
          
          {/* Left branding panel */}
          <div className="relative hidden w-1/2 flex-col justify-between bg-[#6C5CE7] p-12 text-white lg:flex">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                <HiOutlineBookOpen size={19} />
              </span>
              <span className="text-lg font-bold">CourseFlow</span>
            </div>

            <div>
              <h2 className="text-3xl font-bold leading-tight">
                Start your learning journey today.
              </h2>
              <p className="mt-4 max-w-sm text-sm text-white/80">
                Join thousands of students learning new skills from expert
                instructors across the world.
              </p>
            </div>

            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} CourseFlow. All rights reserved.
            </p>
          </div>

          {/* Right form panel */}
          <div className="flex w-full items-center justify-center bg-white px-4 py-12 sm:px-8 lg:w-1/2">
            <div className="w-full max-w-sm">
              <div className="mb-8 flex items-center gap-2 lg:hidden">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6C5CE7] text-white">
                  <HiOutlineBookOpen size={18} />
                </span>
                <span className="text-lg font-bold text-gray-900">
                  CourseFlow
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900">
                Create an account
              </h1>
              <p className="mt-1.5 text-sm text-gray-500">
                Sign up to start exploring courses.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <div className="relative">
                    <FiUser
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your name"
                      className={`w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#6C5CE7] ${
                        errors.name ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="relative">
                    <FiMail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Enter your email"
                      className={`w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#6C5CE7] ${
                        errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      placeholder="Create a password"
                      className={`w-full rounded-lg border py-2.5 pl-9 pr-9 text-sm outline-none transition-colors focus:border-[#6C5CE7] ${
                        errors.password ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Confirm password
                  </label>
                  <div className="relative">
                    <FiLock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      placeholder="Re-enter your password"
                      className={`w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#6C5CE7] ${
                        errors.confirmPassword
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-lg bg-[#6C5CE7] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5b4bd6] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Creating account..." : "Register"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[#6C5CE7] hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}