'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import WeatherStats from '@/components/WeatherStats';
import Forecast from '@/components/Forecast';
import HourlyForecast from '@/components/HourlyForecast';
import { useLazyGetCurrentWeatherQuery, useLazyGetForecastQuery } from '@/lib/services/weatherApi';
import Image from 'next/image';
import { Settings } from 'lucide-react';
import UnitSelector from '@/components/DropdownSwitcher';
export default function Home() {
  const [city, setCity] = useState('');
  const [searchError, setSearchError] = useState('');
  
  const [getCurrentWeather, { data: weatherData, isLoading: isWeatherLoading, error: weatherError }] = useLazyGetCurrentWeatherQuery();
  const [getForecast, { data: forecastData, isLoading: isForecastLoading, error: forecastError }] = useLazyGetForecastQuery();

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchError('Please enter a city name');
      return;
    }

    setSearchError('');
    setCity(searchTerm);
    
    try {
      await getCurrentWeather(searchTerm).unwrap();
      await getForecast(searchTerm).unwrap();
    } catch (error) {
      setSearchError('City not found. Please try again.');
    }
  };

  const isLoading = isWeatherLoading || isForecastLoading;
  const hasError = weatherError || forecastError || searchError;
  const hasData = weatherData && forecastData;

  return (
    <main className=" bg-[#02012C] text-white">
      <div className="container min-h-screen mx-auto flex flex-col items-center justify-start py-12">
        <div className='top-section flex justify-between w-full'>
          <Image src='/assets/Logo.svg' alt='logo' width={200} height={150} />
          <div className='flex items-center'>
            <UnitSelector />
          </div>
        </div>
        <h1 className='text-[52px] font-bold mb-8 mt-8'>
          How’s the sky looking today?
        </h1>
        <SearchBar onSearch={handleSearch} error={searchError} />
        
        {isLoading && (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        
        {hasError && !isLoading && (
          <div className="text-center mt-10">
            <p className="text-xl">{searchError || 'Something went wrong. Please try again.'}</p>
          </div>
        )}
        
        {!hasData && !isLoading && !hasError && (
          <div className="text-center mt-10">
            <p className="text-xl">Search for a city to see the weather forecast</p>
          </div>
        )}
        
        {hasData && !isLoading && (
          <div className="mt-8 space-y-8">
            <CurrentWeather data={weatherData} />
            <WeatherStats data={weatherData} />
            <HourlyForecast data={forecastData} />
            <Forecast data={forecastData} />
          </div>
        )}
      </div>
    </main>
  );
}
