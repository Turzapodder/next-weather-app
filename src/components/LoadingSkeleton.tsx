'use client';

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-[48px] mt-8 lg:mt-20">
      {/* Left Column */}
      <div className="w-full lg:w-[800px] space-y-6 lg:space-y-8">
        {/* Current Weather Skeleton */}
        <div className="bg-neutral-800 backdrop-blur-md rounded-xl p-4 sm:p-6 animate-pulse">
          <div className="h-5 sm:h-6 bg-gray-600 rounded w-24 sm:w-32 mb-3 sm:mb-4"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full"></div>
              <div>
                <div className="h-8 sm:h-12 bg-gray-600 rounded w-20 sm:w-24 mb-2"></div>
                <div className="h-3 sm:h-4 bg-gray-600 rounded w-16 sm:w-20"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-12 sm:h-16 bg-gray-600 rounded w-24 sm:w-32 mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-600 rounded w-20 sm:w-24"></div>
            </div>
          </div>
        </div>

        {/* Weather Stats Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-neutral-800 backdrop-blur-md rounded-xl p-3 sm:p-4 animate-pulse">
              <div className="h-3 sm:h-4 bg-gray-600 rounded w-12 sm:w-16 mb-2 sm:mb-3"></div>
              <div className="h-6 sm:h-8 bg-gray-600 rounded w-10 sm:w-12"></div>
            </div>
          ))}
        </div>

        {/* Daily Forecast Skeleton */}
        <div className="bg-neutral-800 backdrop-blur-md rounded-xl p-4 sm:p-6 animate-pulse">
          <div className="h-5 sm:h-6 bg-gray-600 rounded w-24 sm:w-32 mb-3 sm:mb-4"></div>
          <div className="grid grid-cols-2 sm:flex sm:gap-3 lg:gap-4 gap-2 sm:overflow-x-auto sm:pb-2">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="bg-[#302F4A] rounded-lg p-3 sm:p-4 flex flex-col items-center space-y-2 sm:space-y-3 min-w-[80px] sm:min-w-[90px] lg:min-w-[100px] sm:flex-shrink-0">
                <div className="h-3 sm:h-4 bg-gray-600 rounded w-10 sm:w-12"></div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded-full"></div>
                <div className="h-3 sm:h-4 bg-gray-600 rounded w-6 sm:w-8"></div>
                <div className="h-2 sm:h-3 bg-gray-600 rounded w-4 sm:w-6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Hourly Forecast Skeleton */}
      <div className="bg-neutral-800 backdrop-blur-md rounded-xl p-4 sm:p-6 min-w-0 w-full animate-pulse">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="h-5 sm:h-6 bg-gray-600 rounded w-24 sm:w-32"></div>
          <div className="h-6 sm:h-8 bg-gray-600 rounded w-16 sm:w-20"></div>
        </div>
        <div className="flex flex-col space-y-3 sm:space-y-[16px]">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex items-center justify-between w-full bg-[#302F4A] py-2 sm:py-[10px] px-3 sm:px-[16px] rounded-lg">
              <div className="flex gap-1 sm:gap-2 items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded-full"></div>
                <div className="h-4 sm:h-5 bg-gray-600 rounded w-12 sm:w-16"></div>
              </div>
              <div className="h-4 sm:h-5 bg-gray-600 rounded w-10 sm:w-12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}