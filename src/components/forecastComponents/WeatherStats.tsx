'use client';

import { WeatherData } from '@/lib/services/weatherApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface WeatherStatsProps {
  data: WeatherData;
}

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
}

function StatCard({ label, value, unit }: StatCardProps) {
  return (
    <div className="bg-neutral-800 backdrop-blur-md border-[#3f3e58] rounded-xl p-3 sm:p-4 flex flex-col items-start min-w-0 gap-3 sm:gap-[24px]">
      <span className="text-sm sm:text-base lg:text-lg mb-1">{label}</span>
      <span className="text-xl sm:text-2xl lg:text-3xl font-extralight">
        {value}
        {unit && ` ${unit}`}
      </span>
    </div>
  );
}

export default function WeatherStats({ data }: WeatherStatsProps) {
  const units = useSelector((state: RootState) => state.units.system);

  const temperatureSymbol = units === 'metric' ? '°C' : '°F';
  const windSpeedUnit = units === 'metric' ? 'm/s' : 'mph';
  const precipitationUnit = units === 'metric' ? 'mm' : 'in';
  // Get precipitation data (rain in last hour, or 0 if no rain)
  const precipitationValue = data.rain?.['1h'] || 0;
  // Convert from mm to inches if using imperial units
  const convertedPrecipitation = units === 'imperial' 
    ? (precipitationValue / 25.4).toFixed(2) 
    : precipitationValue.toFixed(1);

  const stats: StatCardProps[] = [
    {
      label: 'Feels Like',
      value: Math.round(data.main.feels_like),
      unit: temperatureSymbol,
    },
    {
      label: 'Humidity',
      value: data.main.humidity,
      unit: '%',
    },
    {
      label: 'Wind Speed',
      value: data.wind.speed,
      unit: windSpeedUnit,
    },
    {
      label: 'Precipitation',
      value: convertedPrecipitation,
      unit: precipitationUnit,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-[30px]">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
