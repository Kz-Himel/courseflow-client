"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const trx = searchParams.get("trx");

  const [courseTitle, setCourseTitle] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      if (!trx) {
        router.push("/courses");
        return;
      }
      try {
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/${trx}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        setCourseTitle(data.payment?.course?.title || "");
        setAmount(data.payment?.amount ?? null);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayment();
  }, [trx, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          {isLoading ? (
            <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
          ) : (
            <FaCheckCircle className="w-16 h-16 text-emerald-500" />
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isLoading ? "Confirming Payment..." : "Payment Successful!"}
        </h1>

        <p className="text-sm text-gray-500 mb-4">
          {isLoading
            ? "Please wait while we confirm your enrollment."
            : `You're now enrolled in "${courseTitle}". It has been added to My Courses.`}
        </p>

        {!isLoading && amount !== null && (
          <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-3 mb-6 text-sm">
            <span className="text-gray-500">Amount Paid</span>
            <span className="font-bold text-gray-900">${amount}</span>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard/my-courses"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-xl transition-colors inline-block"
          >
            Go to My Courses
          </Link>
          <Link
            href="/"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-md w-full text-center flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading Payment Details...</h1>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}