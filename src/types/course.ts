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