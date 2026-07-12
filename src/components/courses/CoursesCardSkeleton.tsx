export default function CourseCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-gray-200" />
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="h-3 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 rounded" />
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}