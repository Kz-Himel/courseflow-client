export function CourseDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 md:px-8 lg:py-10 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-3 w-12 bg-gray-200 rounded"></div>
          <span className="text-gray-300">/</span>
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
          <span className="text-gray-300">/</span>
          <div className="h-3 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT SIDE: Active Info Content */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm space-y-6">
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Skeleton */}
              <div className="w-full md:w-64 h-44 rounded-xl bg-gray-200 flex-shrink-0 shadow-inner"></div>

              {/* Course Info text */}
              <div className="flex flex-col justify-center flex-1 space-y-3">
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded"></div>
                  <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                </div>

                {/* Instructor Meta */}
                <div className="flex items-center gap-2.5 mt-2">
                  <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    <div className="h-2.5 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specs Meta Matrix Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-5 bg-gray-50 rounded-xl border border-gray-100">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2 flex flex-col items-center sm:items-start">
                  <div className="h-2.5 w-12 bg-gray-200 rounded"></div>
                  <div className="h-3.5 w-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Tabs Headers Skeleton */}
            <div className="border-b border-gray-100 pb-2 flex gap-6">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
            
            {/* Tabs Content Area */}
            <div className="space-y-3">
              <div className="h-3.5 w-full bg-gray-200 rounded"></div>
              <div className="h-3.5 w-full bg-gray-200 rounded"></div>
              <div className="h-3.5 w-2/3 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* RIGHT SIDE: Dynamic Enroll Widget Card Skeleton */}
          <div className="lg:col-span-1 space-y-4 bg-white rounded-2xl border border-gray-200 p-5">
            {/* Price section */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>

            {/* Enroll Button Skeleton */}
            <div className="w-full h-11 bg-gray-200 rounded-lg"></div>

            {/* Wishlist Button Skeleton */}
            <div className="w-full h-10 bg-gray-200 rounded-lg"></div>

            {/* Meta Grid inside Card */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  <div className="space-y-1">
                    <div className="h-2 w-10 bg-gray-200 rounded"></div>
                    <div className="h-2.5 w-14 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bullet list Skeleton */}
            <div className="space-y-3 pt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                  <div className="h-3 w-40 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}