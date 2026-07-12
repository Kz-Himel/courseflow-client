export interface Course {
  _id: string;
  title: string;
  instructorName: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  price: number;
  thumbnailUrl: string;
  shortDescription: string;
  fullDescription: string;
  rating: number;
  reviewCount: number;
  status: "Published" | "Draft";
  createdAt: string;
}

export interface CoursesApiResponse {
  success: boolean;
  data: Course[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CourseFormData {
  title: string;
  instructorName: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "";
  duration: string;
  price: string;
  thumbnailUrl: string;
  shortDescription: string;
  fullDescription: string;
}

export interface CourseApiResponse {
  success: boolean;
  message: string;
  insertedId?: string;
}