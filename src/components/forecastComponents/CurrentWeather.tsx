"use client";

import { WeatherData } from "@/lib/services/weatherApi";
import Image from 'next/image';

interface CurrentWeatherProps {
  data: WeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });


  return (
    <div
      className="relative backdrop-blur-md rounded-xl p-4 sm:p-6 bg-cover bg-center min-h-[200px] sm:min-h-[285px] flex justify-between items-center"
      style={{ backgroundImage: "url('/assets/Desktop - Hero bg.svg')" }}
    >
      <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between sm:items-center w-full gap-4 sm:gap-0">
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg">{formattedDate}</p>
        </div>

        <div className="text-[48px] sm:text-[72px] lg:text-[96px] italic font-bold mb-2 flex justify-between items-center w-full sm:w-auto gap-2">
          <Image
               src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
              width={96}
              height={96}
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24"
            />
          {Math.round(data.main.temp)}°
        </div>
      </div>
    </div>
  );
}
