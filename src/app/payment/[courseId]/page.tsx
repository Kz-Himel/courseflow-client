"use client";

import { useEffect, useState, useRef } from "react"; // useRef যোগ করা হয়েছে
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaLock, FaCreditCard, FaMobileAlt } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Course } from "@/types/payment";
import StripeCardForm from "@/components/payment/StripeCardForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card (Stripe)", icon: FaCreditCard },
  { id: "bkash", label: "bKash", icon: FaMobileAlt },
  { id: "nagad", label: "Nagad", icon: FaMobileAlt },
];

export default function PaymentPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  // ডাবল টোস্ট আটকানোর জন্য রিফ
  const hasToasted = useRef(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;

        if (!token) {
          if (!hasToasted.current) {
            toast.error("Please log in to continue");
            hasToasted.current = true; // ফ্ল্যাগ ট্রু করে দেওয়া হলো
          }
          router.push("/auth/login");
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          if (!hasToasted.current) {
            toast.error("Session expired. Please log in again.");
            hasToasted.current = true;
          }
          router.push("/auth/login");
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

  // Card select korle Stripe PaymentIntent create hobe
  useEffect(() => {
    if (selectedMethod !== "card" || !course) return;

    const createIntent = async () => {
      try {
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;

        // এখানেও যদি টোকেন না থাকে তবে রিকোয়েস্ট পাঠানোর দরকার নেই
        if (!token) return; 

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ courseId }),
          }
        );
        const data = await res.json();

        if (data.success) {
          setClientSecret(data.clientSecret);
          setTransactionId(data.transactionId);
        } else {
          toast.error(data.message || "Failed to start payment");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    createIntent();
  }, [selectedMethod, course, courseId]);

  const handleStripeSuccess = async (trx: string) => {
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      const confirmRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ transactionId: trx }),
      });
      const confirmData = await confirmRes.json();

      if (confirmData.success) {
        router.push(`/payment?trx=${trx}`);
      } else {
        toast.error(confirmData.message || "Payment confirmation failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleMockPay = async () => {
    setIsProcessing(true);
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

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

      await new Promise((resolve) => setTimeout(resolve, 1500));

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
        <div className="flex items-center gap-2 mb-1">
          <FaLock className="text-violet-600 w-4 h-4" />
          <h1 className="text-xl font-bold text-gray-900">Secure Checkout</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">Complete your payment to enroll</p>

        {/* Order Summary */}
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-violet-100 flex items-center justify-center shrink-0">
            {course.thumbnail ? (
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-violet-600 font-bold text-xs">Course</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{course.title}</p>
            <p className="text-xs text-gray-500">{course.instructorName}</p>
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
                  onChange={(e) => {
                    setSelectedMethod(e.target.value);
                    setClientSecret(null);
                  }}
                  className="accent-violet-600"
                />
                <Icon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-800">{method.label}</span>
              </label>
            );
          })}
        </div>

        <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-6">
          <span className="text-sm text-gray-500">Total Amount</span>
          <span className="text-lg font-bold text-gray-900">${course.price}</span>
        </div>

        {/* Card => Stripe Elements form, others => mock pay button */}
        {selectedMethod === "card" ? (
          clientSecret && transactionId ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeCardForm
                clientSecret={clientSecret}
                transactionId={transactionId}
                onSuccess={handleStripeSuccess}
              />
            </Elements>
          ) : (
            <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
          )
        ) : (
          <button
            onClick={handleMockPay}
            disabled={isProcessing}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:bg-violet-400"
          >
            {isProcessing ? "Processing Payment..." : `Pay $${course.price}`}
          </button>
        )}
      </div>
    </div>
  );
}