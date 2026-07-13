import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import type {
  Course,
  CourseDetailApiResponse,
  RelatedCoursesApiResponse,
} from "@/types/course";

// YouTube link theke ID extract korar safe utility function (Handles both youtube.com and youtu.be)
const getYouTubeThumbnail = (url: string) => {
  if (!url) return null;
  
  // Regular expression jeta simple split('v=') er cheyeo safe ebong shob dhoroner YouTube link support kore
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    const videoId = match[2];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  return url; // YouTube link na hole default url return korbe
};

async function getCourse(id: string): Promise<Course | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data: CourseDetailApiResponse = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

async function getRelatedCourses(
  category: string,
  excludeId: string
): Promise<Course[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses?category=${encodeURIComponent(
        category
      )}&limit=4&exclude=${excludeId}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data: RelatedCoursesApiResponse = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) notFound();

  // Related courses call kora hocche background e
  const relatedCourses = await getRelatedCourses(course.category, course._id);

  // Tomar rule unujayi link YouTube kina check kore thumbnail dynamic kora holo
  const displayThumbnail = 
    course.thumbnailUrl?.includes("youtube.com") || course.thumbnailUrl?.includes("youtu.be")
      ? getYouTubeThumbnail(course.thumbnailUrl)
      : course.thumbnailUrl;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-violet-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-violet-600">
            Courses
          </Link>
          <span>/</span>
          <span className="text-gray-600">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-5">
                
                {/* Image Wrap Container */}
                <div className="relative w-full sm:w-48 h-40 rounded-xl overflow-hidden bg-violet-700 flex-shrink-0">
                  {displayThumbnail && (
                    <Image
                      src={displayThumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                      priority // Details page er top banner image tai render performance-er jonno priority flag add kora holo
                    />
                  )}
                </div>

                <div className="flex-1">
                  <span className="text-xs font-medium text-violet-600">
                    {course.category}
                  </span>
                  <h1 className="text-xl font-bold text-gray-900 mt-1 mb-2">
                    {course.title}
                  </h1>
                  <p className="text-sm text-gray-500 mb-4">
                    {course.shortDescription}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-semibold">
                        {course.instructorName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800">
                          {course.instructorName}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {course.instructorTitle || "Instructor"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <FaRegStar className="w-4 h-4 fill-orange-400 text-orange-400" />
                      <span className="text-xs font-medium text-gray-700">
                        {course.rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({course.reviewCount} reviewed)
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <FaRegUser className="w-4 h-4" />
                      {course.studentsCount || 0} students
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <CourseTabs course={course} /> */}
          </div>

          <div className="lg:col-span-1">
            {/* <EnrollCard course={course} /> */}
          </div>
        </div>

        {/* <RelatedCourses courses={relatedCourses} /> */}
      </div>
    </div>
  );
}