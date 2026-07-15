"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { FaRegTrashCan } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

interface DeleteWishlistItemProps {
  wishlistId: string;
  onSuccess?: () => void; //
}

export function DeleteWishlistItem({ wishlistId, onSuccess }: DeleteWishlistItemProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      //
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        toast.error("Authentication token missing. Please log in again.");
        setIsLoading(false);
        return;
      }

      // 
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists/${wishlistId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
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
              {/* */}
              <Button 
                className="text-gray-800" 
                slot={isLoading ? undefined : "close"} 
                variant="tertiary"
                onClick={(e) => {
                  if (isLoading) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                Cancel
              </Button>
              
              <Button 
                slot={isLoading ? undefined : "close"} 
                variant="danger" 
                onClick={(e) => {
                  if (isLoading) {
                    e.preventDefault();
                    return;
                  }
                  handleDelete();
                }}
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