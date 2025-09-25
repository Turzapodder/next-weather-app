'use client';

import { ForecastData } from '@/lib/services/weatherApi';

interface ForecastProps {
  data: ForecastData;
}

export default function Forecast({ data }: ForecastProps) {
  // Group forecast data by day
  const dailyData = data.list.reduce((acc: any, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
    
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
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">7-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
        {forecast.map((day: any, index: number) => (
          <div key={index} className="flex flex-col items-center">
            <span className="font-medium">{day.date}</span>
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              className="w-12 h-12"
            />
            <div className="flex gap-2">
              <span className="font-bold">{Math.round(day.temp_max)}°</span>
              <span className="text-white/70">{Math.round(day.temp_min)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}