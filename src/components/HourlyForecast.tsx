'use client';

import { ForecastData } from '@/lib/services/weatherApi';

interface HourlyForecastProps {
  data: ForecastData;
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  // Get the next 8 hours of forecast data
  const hourlyForecast = data.list.slice(0, 8);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Hourly Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {hourlyForecast.map((hour, index) => {
          const time = new Date(hour.dt * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
          
          return (
            <div key={index} className="flex flex-col items-center">
              <span className="font-medium">{time}</span>
              <img 
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
                className="w-12 h-12"
              />
              <span className="font-bold">{Math.round(hour.main.temp)}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}