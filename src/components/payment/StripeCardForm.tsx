"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa";

interface StripeCardFormProps {
  clientSecret: string;
  transactionId: string;
  onSuccess: (transactionId: string) => void;
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: "14px",
      color: "#1f2937",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      color: "#ef4444",
    },
  },
};

export default function StripeCardForm({
  clientSecret,
  transactionId,
  onSuccess,
}: StripeCardFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);
    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        toast.error(error.message || "Payment failed");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        onSuccess(transactionId);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="border border-gray-200 rounded-xl p-3 mb-4 focus-within:border-violet-600 transition-colors">
        <CardElement options={cardElementOptions} />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!stripe || isProcessing}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:bg-violet-400 flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </button>

      <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
        <FaLock className="w-3 h-3" /> Payments are secure via Stripe
      </p>
    </div>
  );
}