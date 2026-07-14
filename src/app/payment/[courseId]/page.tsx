"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaLock, FaCreditCard, FaMobileAlt } from "react-icons/fa";
import { Course } from "@/types/payment";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: FaCreditCard },
  { id: "bkash", label: "bKash", icon: FaMobileAlt },
  { id: "nagad", label: "Nagad", icon: FaMobileAlt },
];

export default function PaymentPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Guard clause: Exit early if parameters haven't hydrated yet
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;

        if (!token) {
          toast.error("Please log in to continue");
          router.push("/login");
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          toast.error("Session expired. Please log in again.");
          router.push("/login");
          return;
        }

        const data = await res.json();
        setCourse(data.course || data.data);
      } catch (error) {
        toast.error("Failed to load course");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, router]);

  const handlePay = async () => {
    if (!courseId) return;
    setIsProcessing(true);
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        toast.error("Please log in to continue");
        router.push("/login");
        return;
      }

      // Step 1: initiate payment
      const initiateRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });
      const initiateData = await initiateRes.json();

      if (!initiateData.success) {
        toast.error(initiateData.message || "Payment initiation failed");
        return;
      }

      // Mock processing delay — real gateway page redirect would go here
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 2: confirm payment
      const confirmRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ transactionId: initiateData.transactionId }),
      });
      const confirmData = await confirmRes.json();

      if (confirmData.success) {
        router.push(`/payment/success?trx=${initiateData.transactionId}`);
      } else {
        toast.error(confirmData.message || "Payment confirmation failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-6 animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-2/3" />
          <div className="h-20 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <FaLock className="text-violet-600 w-4 h-4" />
          <h1 className="text-xl font-bold text-gray-900">Secure Checkout</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">Complete your payment to enroll</p>

        {/* Order Summary */}
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-violet-100 flex items-center justify-center shrink-0">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-violet-600 font-bold text-xs">Course</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{course.title}</p>
            <p className="text-xs text-gray-500">{course.instructorName}</p>
            {course.duration && (
              <p className="text-xs text-gray-400 mt-0.5">
                {course.duration} • {course.lessons} Lessons
              </p>
            )}
          </div>
          <p className="font-bold text-violet-600 shrink-0">${course.price}</p>
        </div>

        {/* Payment Method */}
        <p className="text-sm font-semibold text-gray-700 mb-2">Select Payment Method</p>
        <div className="space-y-2 mb-6">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <label
                key={method.id}
                className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition-colors ${
                  selectedMethod === method.id
                    ? "border-violet-600 bg-violet-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="accent-violet-600"
                />
                <Icon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-800">{method.label}</span>
              </label>
            );
          })}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-6">
          <span className="text-sm text-gray-500">Total Amount</span>
          <span className="text-lg font-bold text-gray-900">${course.price}</span>
        </div>

        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:bg-violet-400 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Processing Payment...
            </>
          ) : (
            `Pay $${course.price}`
          )}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
          <FaLock className="w-3 h-3" /> Payments are secure and encrypted
        </p>
      </div>
    </div>
  );
}