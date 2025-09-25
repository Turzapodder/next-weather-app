'use client';

export default function LoadingSkeleton() {
  return (
    <div className="flex gap-[48px] mt-20">
      {/* Left Column */}
      <div className="w-[800px] space-y-8">
        {/* Current Weather Skeleton */}
        <div className="bg-neutral-800 backdrop-blur-md rounded-xl p-6 animate-pulse">
          <div className="h-6 bg-gray-600 rounded w-32 mb-4"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
              <div>
                <div className="h-12 bg-gray-600 rounded w-24 mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-20"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-16 bg-gray-600 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-600 rounded w-24"></div>
            </div>
          </div>
        </div>

        {/* Weather Stats Skeleton */}
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-neutral-800 backdrop-blur-md rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-gray-600 rounded w-16 mb-3"></div>
              <div className="h-8 bg-gray-600 rounded w-12"></div>
            </div>
          ))}
        </div>

        {/* Daily Forecast Skeleton */}
        <div className="bg-neutral-800 backdrop-blur-md rounded-xl p-6 animate-pulse">
          <div className="h-6 bg-gray-600 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-7 gap-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="bg-[#302F4A] rounded-lg p-4 flex flex-col items-center space-y-3">
                <div className="h-4 bg-gray-600 rounded w-12"></div>
                <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                <div className="h-4 bg-gray-600 rounded w-8"></div>
                <div className="h-3 bg-gray-600 rounded w-6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Hourly Forecast Skeleton */}
      <div className="bg-neutral-800 backdrop-blur-md rounded-xl p-6 min-w-[432px] animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-600 rounded w-32"></div>
          <div className="h-8 bg-gray-600 rounded w-20"></div>
        </div>
        <div className="flex flex-col space-y-[16px]">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex items-center justify-between w-[384px] bg-[#302F4A] py-[10px] px-[16px] rounded-lg">
              <div className="flex gap-1 items-center">
                <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                <div className="h-5 bg-gray-600 rounded w-16"></div>
              </div>
              <div className="h-5 bg-gray-600 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}