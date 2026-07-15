"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import type { WishlistEntry, WishlistListResponse } from "@/types/wishlist";
import WishlistCard from "@/components/wishlist/WishlistCard"; 

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        setWishlist([]);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setWishlist([]);
        return;
      }

      const data: WishlistListResponse = await res.json();
      setWishlist(data.success ? data.data : []);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // call after delete child component
  const handleRemove = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item._id.toString() !== id.toString()));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading
              ? "Loading your wishlist..."
              : wishlist.length > 0
              ? `${wishlist.length} course${wishlist.length > 1 ? "s" : ""} saved for later`
              : "Courses you save will show up here"}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 bg-white rounded-2xl border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-14 h-14 rounded-full bg-violet-50 flex items-center justify-center mb-4">
              <FaRegHeart className="w-6 h-6 text-violet-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Your wishlist is empty</h3>
            <p className="text-sm text-gray-500 mb-5">Browse courses and tap "Add to Wishlist" to save them here.</p>
            <Link href="/courses" className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 transition-colors">
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wishlist.map((entry) => (
              <WishlistCard
                key={entry._id.toString()}
                entry={entry}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}