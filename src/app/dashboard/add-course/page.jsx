import AddCourseForm from "../../../components/dasboard/AddCourseForm";

export default function AddCoursePage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Course</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to publish a new course
          </p>
        </div>
        <AddCourseForm />
      </div>
    </div>
  );
}