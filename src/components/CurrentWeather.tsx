'use client';

import { WeatherData } from '@/lib/services/weatherApi';

interface CurrentWeatherProps {
  data: WeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
      <h2 className="text-4xl font-bold mb-2">{data.name}, {data.sys.country}</h2>
      <p className="text-lg mb-6">{formattedDate}</p>
      
      <div className="flex justify-center items-center mb-4">
        <img 
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-24 h-24"
        />
      </div>
      
      <div className="text-6xl font-bold mb-2">{Math.round(data.main.temp)}°C</div>
      <p className="text-xl capitalize">{data.weather[0].description}</p>
    </div>
  );
}