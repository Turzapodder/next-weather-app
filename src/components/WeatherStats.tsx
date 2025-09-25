'use client';

import { WeatherData } from '@/lib/services/weatherApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface WeatherStatsProps {
  data: WeatherData;
}

export default function WeatherStats({ data }: WeatherStatsProps) {
  const units = useSelector((state: RootState) => state.units.system);

  const getTemperatureSymbol = () => {
    return units === 'metric' ? '°C' : '°F';
  };

  const getWindSpeedUnit = () => {
    return units === 'metric' ? 'm/s' : 'mph';
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-[30px]">
      <div className="bg-neutral-800 backdrop-blur-md rounded-xl p-4 flex flex-col items-start min-w-[182px] gap-[24px]">
        <span className="text-lg mb-1">Feels Like</span>
        <span className="text-3xl font-extralight">{Math.round(data.main.feels_like)}{getTemperatureSymbol()}</span>
      </div>
      
      <div className="bg-neutral-800 backdrop-blur-md rounded-xl p-4 flex flex-col items-start min-w-[182px] gap-[24px]">
        <span className="text-lg mb-1">Humidity</span>
        <span className="text-3xl font-extralight">{data.main.humidity}%</span>
      </div>
      
      <div className="bg-neutral-800 backdrop-blur-md rounded-xl p-4 flex flex-col items-start min-w-[182px] gap-[24px]">
        <span className="text-lg mb-1">Wind Speed</span>
        <span className="text-3xl font-extralight">{data.wind.speed} {getWindSpeedUnit()}</span>
      </div>
      
      <div className="bg-neutral-800 backdrop-blur-md rounded-xl p-4 flex flex-col items-start min-w-[182px] gap-[24px]">
        <span className="text-lg mb-1">Pressure</span>
        <span className="text-3xl font-light">{data.main.pressure} hPa</span>
      </div>
    </div>
  );
}