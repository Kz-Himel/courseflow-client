import CourseCard from "@/components/courses/CourseCard";
import type { Course } from "@/types/course";

export default function RelatedCourses({ courses }: { courses: Course[] }) {
  if (!courses || courses.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">
        Related Courses
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}