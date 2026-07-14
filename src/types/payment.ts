export interface Course {
  _id: string;
  title: string;
  instructorName: string;
  price: number;
  thumbnail: string;
  duration?: string;
  lessons?: number;
}

export interface MyListedCourse extends Course {
  category?: string;
  status?: "published" | "draft";
  createdAt?: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
}

export interface InitiatePaymentResponse {
  success: boolean;
  transactionId: string;
  amount: number;
  courseTitle: string;
  message?: string;
}

export interface ConfirmPaymentResponse {
  success: boolean;
  message: string;
  transactionId?: string;
}

export interface EnrolledCourse {
  _id: string;
  enrolledAt: string;
  course: Course;
}