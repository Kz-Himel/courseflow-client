"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface EnrollButtonProps {
  courseId: string;
}

export default function EnrollButton({ courseId }: EnrollButtonProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  const handleEnroll = async () => {
    setIsChecking(true);
    try {
      if (!courseId) {
        toast.error("Invalid course");
        return;
      }

      // sudhu payment page e pathiye dicche, actual payment initiate call
      // hobe payment page e Pay Now click korle
      router.push(`/payment/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={isChecking}
      className="w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold py-3 rounded-lg transition-colors mb-2"
    >
      {isChecking ? "Please wait..." : "Enroll Now"}
    </button>
  );
}