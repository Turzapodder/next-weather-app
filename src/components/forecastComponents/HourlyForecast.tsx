'use client';

import { ForecastData } from '@/lib/services/weatherApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import WeekdayDropdown from '../dropdowns/WeekdayDropdown';

interface HourlyForecastProps {
  data: ForecastData;
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  const units = useSelector((state: RootState) => state.units.system);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const getTemperatureSymbol = () => {
    return units === 'metric' ? '°C' : '°F';
  };

  // Filter forecast data based on selected weekday
  const filteredForecast = useMemo(() => {
  const allHours: typeof data.list = [];

  // Collect forecast entries until we have 8
  for (let i = 0; i < data.list.length && allHours.length < 8; i++) {
    const item = data.list[i];
    const date = new Date(item.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (dayName === selectedDay || allHours.length > 0) {
      allHours.push(item);
    }
  }

  return allHours;
}, [data, selectedDay]);


  return (
    <div className="bg-neutral-800 backdrop-blur-md rounded-xl p-4 sm:p-6 min-w-0 w-full">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-bold">Hourly Forecast</h3>
        <WeekdayDropdown 
          selectedDay={selectedDay}
          onDaySelect={setSelectedDay}
        />
      </div>
      <div className="flex flex-col space-y-3 sm:space-y-[16px]">
        {filteredForecast.map((hour, index) => {
          const time = new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          });

          return (
            <div
              key={index}
              className="flex items-center justify-between w-full bg-[#302F4A] py-2 sm:py-[10px] px-3 sm:px-[16px] rounded-lg"
            >
              <div className="flex gap-1 sm:gap-2 items-center">
                <Image
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt={hour.weather[0].description}
                  width={40}
                  height={40}
                  className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                />
                <span className="font-medium text-base sm:text-lg lg:text-[20px]">{time}</span>
              </div>
              <span className="text-base sm:text-lg lg:text-[20px]">
                {Math.round(hour.main.temp)}{getTemperatureSymbol()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
