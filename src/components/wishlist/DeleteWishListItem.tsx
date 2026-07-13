"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { ObjectId } from "bson"; // যদি ফ্রন্টএন্ডে আইডি চেক করতে চান, নয়তো বাদ দিতে পারেন
import { FaRegTrashCan } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

interface DeleteWishlistItemProps {
  wishlistId: string;
  onSuccess?: () => void; // ডিলিট হওয়ার পর লিস্ট রিফ্রেশ করার জন্য ফনকশন
}

export function DeleteWishlistItem({ wishlistId, onSuccess }: DeleteWishlistItemProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // ১. আপনার দেওয়া নিয়ম অনুযায়ী টোকেন নেওয়া হলো
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        toast.error("Authentication token missing. Please log in again.");
        setIsLoading(false);
        return;
      }

      // ২. এক্সপ্রেস ডিলিট API কল করা হলো
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists/${wishlistId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // টোকেনটি হেডারে পাঠানো হলো
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Course removed from wishlist!");
        if (onSuccess) onSuccess(); // সাকসেস হলে প্যারেন্ট কম্পোনেন্টকে জানানো
      } else {
        toast.error(data.message || "Failed to remove item.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      {/* ট্রিগার বাটন */}
      <Button variant="danger" className="bg-transparent border border-red-500 text-red-500 rounded-full px-3">
        <FaRegTrashCan />
      </Button>
      
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-black font-bold">Remove from Wishlist?</AlertDialog.Heading>
            </AlertDialog.Header>
            
            <AlertDialog.Body>
              <p>
                Are you sure you want to remove this course from your wishlist? 
                This action cannot be undone.
              </p>
            </AlertDialog.Body>
            
            <AlertDialog.Footer>
              {/* ক্যানসেল বাটন */}
              <Button className="text-gray-800" slot="close" variant="tertiary" disabled={isLoading}>
                Cancel
              </Button>
              
              {/* ডিলিট কনফার্মেশন বাটন */}
              <Button 
                slot={isLoading ? undefined : "close"} // লোডিং থাকা অবস্থায় ডায়ালগ যেন বন্ধ না হয়ে যায়
                variant="danger" 
                onClick={handleDelete}
                isLoading={isLoading} // হিরোইউআই বাটনের লোডিং স্পিনার
              >
                {isLoading ? "Removing..." : "Yes, Remove"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}