export interface WishlistEntry {
  _id: string;
  courseId: string;
  userEmail: string;
  addedAt: string;
  course: {
    _id: string;
    title: string;
    instructorName: string;
    category: string;
    thumbnailUrl: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    level: string;
  };
}

export interface WishlistListResponse {
  success: boolean;
  data: WishlistEntry[];
}

export interface WishlistMutationResponse {
  success: boolean;
  message: string;
  insertedId?: string;
}