export interface Course {
  _id: string;
  title: string;
  instructorName: string;
  instructorTitle?: string;
  instructorBio?: string;
  category?: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessons?: number;
  language?: string;
  price: number;
  originalPrice?: number;
  thumbnailUrl?: string;
  shortDescription: string;
  fullDescription: string;
  whatYouWillLearn?: string[];
  curriculum?: CurriculumSection[];
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  studentsCount?: number;
  status: "Published" | "Draft";
  createdAt: string;
}

export interface CurriculumSection {
  title: string;
  lessonsCount: number;
  duration: string;
}

export interface Review {
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CoursesApiResponse {
  success: boolean;
  data: Course[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CourseDetailApiResponse {
  success: boolean;
  data: Course;
}

export interface RelatedCoursesApiResponse {
  success: boolean;
  data: Course[];
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

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
}