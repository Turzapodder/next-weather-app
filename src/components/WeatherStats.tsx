'use client';

import { WeatherData } from '@/lib/services/weatherApi';

interface WeatherStatsProps {
  data: WeatherData;
}

export default function WeatherStats({ data }: WeatherStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center">
        <span className="text-sm mb-1">Feels Like</span>
        <span className="text-2xl font-bold">{Math.round(data.main.feels_like)}°C</span>
      </div>
      
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center">
        <span className="text-sm mb-1">Humidity</span>
        <span className="text-2xl font-bold">{data.main.humidity}%</span>
      </div>
      
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center">
        <span className="text-sm mb-1">Wind Speed</span>
        <span className="text-2xl font-bold">{data.wind.speed} m/s</span>
      </div>
      
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center">
        <span className="text-sm mb-1">Pressure</span>
        <span className="text-2xl font-bold">{data.main.pressure} hPa</span>
      </div>
    </div>
  );
}