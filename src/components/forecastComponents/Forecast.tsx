'use client';

import { ForecastData } from '@/lib/services/weatherApi';
import Image from 'next/image';

interface ForecastProps {
  data: ForecastData;
}

export default function Forecast({ data }: ForecastProps) {

  // Group forecast data by day
  const dailyData = data.list.reduce((acc: Record<string, { date: string; icon: string; description: string; temp_max: number; temp_min: number }>, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });

    if (!acc[date]) {
      acc[date] = {
        date,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
      };
    } else {
      acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
      acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);
    }

    return acc;
  }, {});
  // Convert to array and take first 7 days
  const forecast = Object.values(dailyData).slice(0, 7);

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Daily Forecast</h3>
      <div className="grid grid-cols-3 sm:flex sm:gap-3 lg:gap-[18px] gap-2 sm:overflow-x-auto sm:pb-2">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between bg-neutral-800 backdrop-blur-md rounded-xl py-3 sm:py-[16px] px-2 sm:px-[10px] min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] min-w-[80px] sm:min-w-[90px] lg:min-w-[100px] sm:flex-shrink-0"
          >
            <span className="font-medium text-sm sm:text-base">{day.date}</span>
            <Image
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              width={60}
              height={60}
              className="rounded-xl w-10 h-10 sm:w-12 sm:h-12 lg:w-[60px] lg:h-[60px]"
            />
            <div className="flex gap-1 sm:gap-2 w-full justify-between">
              <span className="text-white/70 text-sm sm:text-base">{Math.round(day.temp_max)}°</span>
              <span className="text-white/70 text-sm sm:text-base">{Math.round(day.temp_min)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
