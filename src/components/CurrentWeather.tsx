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
    month: "long",
    day: "numeric",
  });


  return (
    <div
      className="relative backdrop-blur-md rounded-xl p-6 bg-cover bg-center min-h-[285px] flex justify-between items-center"
      style={{ backgroundImage: "url('/assets/Desktop - Hero bg.svg')" }}
    >
      <div className="flex justify-between items-center w-full">
        <div>
          <h2 className="text-4xl font-bold mb-2">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-lg ">{formattedDate}</p>
        </div>

        <div className="text-[96px] italic font-bold mb-2 flex gap-2 items-center">
          <Image
               src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
              width={96}
              height={96}
            />
          {Math.round(data.main.temp)}°
        </div>
      </div>
    </div>
  );
}
