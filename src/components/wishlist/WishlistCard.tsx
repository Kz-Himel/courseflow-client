"use client";

import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import type { WishlistEntry } from "@/types/wishlist";
import { DeleteWishlistItem } from "../wishlist/DeleteWishListItem"; 

interface WishlistCardProps {
  entry: WishlistEntry;
  onRemove: (id: string) => void; // 💡 এখানে onRefresh-এর বদলে মেইন পেজের পাঠানো onRemove যুক্ত করা হলো
}

// ইউটিউব লিংক থেকে ইমেজ বের করার হেল্পার ফাংশন
const getYouTubeThumbnail = (url: string) => {
  if (!url) return null;
  const videoId = url.split("v=")[1]?.split("&")[0];
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : url;
};

export default function WishlistCard({ entry, onRemove }: WishlistCardProps) { // 💡 এখানেও onRemove রিসিভ করা হলো
  // ইউটিউব লিংক নাকি সাধারণ ছবির লিংক তা চেক করা
  const displayThumbnail = entry.course?.thumbnailUrl?.includes("youtube.com")
    ? getYouTubeThumbnail(entry.course.thumbnailUrl)
    : entry.course?.thumbnailUrl;

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-full h-40 bg-violet-700 flex items-center justify-center">
        {displayThumbnail ? (
          <Image
            src={displayThumbnail}
            alt={entry.course?.title || "Course Image"}
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-sm font-semibold text-white opacity-80">
            {entry.course?.category}
          </span>
        )}

        {/* ─── এখানে onSuccess-এর ভেতর ডিলিট হওয়া আইটেমের আইডি সহ onRemove কল করা হলো ─── */}
        <div className="absolute top-3 right-3 z-10">
          <DeleteWishlistItem 
            wishlistId={entry._id} 
            onSuccess={() => onRemove(entry._id)} // 💡 আইডিটি পাস করা অত্যন্ত জরুরি
          />
        </div>
        {/* ───────────────────────────────────────────────────────────────────────── */}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <span className="text-xs font-medium text-violet-600 mb-1">
          {entry.course?.category}
        </span>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
          {entry.course?.title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {entry.course?.instructorName}
        </p>

        <div className="flex items-center gap-1 mb-3">
          <FaStar className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-xs font-medium text-gray-700">
            {entry.course?.rating?.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">
            ({entry.course?.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-sm font-bold text-gray-900">
            ${entry.course?.price?.toFixed(2)}
          </span>
          <Link
            href={`/courses/${entry.course?._id}`}
            className="text-xs font-semibold text-violet-600 hover:text-violet-700"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}