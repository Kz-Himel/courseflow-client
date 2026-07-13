"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { authClient } from "@/lib/auth-client";
import type {
  WishlistEntry,
  WishlistListResponse,
  WishlistMutationResponse,
} from "@/types/wishlist";

interface WishlistContextType {
  wishlist: WishlistEntry[];
  loading: boolean;
  isWishlisted: (courseId: string) => boolean;
  addToWishlist: (courseId: string) => Promise<{ success: boolean; message: string }>;
  removeFromWishlist: (wishlistId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

async function getAuthToken() {
  const tokenRes = await authClient.token?.();
  return tokenRes?.data?.token;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshWishlist = useCallback(async () => {
    setLoading(true);
    try {
      const { data: session } = await authClient.getSession();
      if (!session) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      const token = await getAuthToken();
      if (!token) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      const data: WishlistListResponse = await res.json();
      setWishlist(data.success ? data.data : []);
    } catch (err) {
      console.error("Failed to load wishlist", err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const isWishlisted = (courseId: string) =>
    wishlist.some((entry) => entry.courseId === courseId);

  const addToWishlist = async (
    courseId: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const token = await getAuthToken();
      if (!token) {
        return { success: false, message: "Please log in to use wishlist" };
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      const data: WishlistMutationResponse = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Failed to add" };
      }

      await refreshWishlist();
      return { success: true, message: data.message };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Something went wrong" };
    }
  };

  const removeFromWishlist = async (wishlistId: string) => {
    try {
      const token = await getAuthToken();
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlists/${wishlistId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setWishlist((prev) => prev.filter((item) => item._id !== wishlistId));
      }
    } catch (err) {
      console.error("Failed to remove wishlist item", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        isWishlisted,
        addToWishlist,
        removeFromWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}