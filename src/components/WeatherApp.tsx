"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/forecastComponents/CurrentWeather";
import WeatherStats from "@/components/forecastComponents/WeatherStats";
import Forecast from "@/components/forecastComponents/Forecast";
import HourlyForecast from "@/components/forecastComponents/HourlyForecast";
import UnitSelector from "@/components/dropdowns/DropdownSwitcher";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import {
  useLazyGetCurrentWeatherQuery,
  useLazyGetForecastQuery,
} from "@/lib/services/weatherApi";
import { Ban } from "lucide-react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [searchError, setSearchError] = useState("");
  const units = useSelector((state: RootState) => state.units.system);

  const [
    getCurrentWeather,
    { data: weatherData, isLoading: isWeatherLoading, error: weatherError },
  ] = useLazyGetCurrentWeatherQuery();
  const [
    getForecast,
    { data: forecastData, isLoading: isForecastLoading, error: forecastError },
  ] = useLazyGetForecastQuery();

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchError("Please enter a city name");
      return;
    }
    setSearchError("");
    setCity(searchTerm);

    try {
      await getCurrentWeather({ city: searchTerm, units }).unwrap();
      await getForecast({ city: searchTerm, units }).unwrap();
    } catch (error) {
      console.warn(error);
      setSearchError("No search result found!");
    }
  };

  // Effect to refetch data when units change
  useEffect(() => {
    if (city) {
      getCurrentWeather({ city, units });
      getForecast({ city, units });
    }
  }, [units, city, getCurrentWeather, getForecast]);

  const isLoading = isWeatherLoading || isForecastLoading;
  const hasError = weatherError || forecastError || searchError;
  const hasData = weatherData && forecastData;

  return (
    <>
      <div className="top-section flex justify-between items-center w-full gap-4 px-4">
        <Image src="/assets/Logo.svg" alt="logo" width={200} height={150} className="w-32 h-24 sm:w-[200px] sm:h-[150px]" />
        <UnitSelector />
      </div>

      <h1 className="font-display text-center text-[28px] sm:text-[40px] lg:text-[52px] font-bold mb-6 sm:mb-8 mt-6 sm:mt-8 px-4">
        How&apos;s the sky looking today?
      </h1>

      <SearchBar onSearch={handleSearch} error={searchError} />

      {isLoading && <LoadingSkeleton />}

      {hasError &&
        !isLoading &&
        (!searchError ? (
          <div className="text-center mt-10 flex justify-center flex-col items-center">
            <Ban className="w-[60px] h-[60px] mb-8 text-white/70" />
            <h1 className=" font-bold font-display text-[52px] mb-8">
              Something went wrong.
            </h1>
            <p className="text-[20px]">
              We couldn&apos;t connect to the server (API error). Please try
              again in a few moments.
            </p>
          </div>
        ) : (
          <h1 className=" font-bold font-display text-[20px] mt-10 mb-8">
            {searchError}
          </h1>
        ))}

      {!hasData && !isLoading && !hasError && (
        <div className="text-center mt-10">
          <p className="text-[20px]">
            Search for a city to see the weather forecast
          </p>
        </div>
      )}

      {hasData && !isLoading && !searchError && (
        <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-[48px] mt-10 lg:mt-20 px-4 lg:px-0">
          <div className="w-full lg:w-[1000px] space-y-6 lg:space-y-8">
            <CurrentWeather data={weatherData} />
            <WeatherStats data={weatherData} />
            <Forecast data={forecastData} />
          </div>
          <div className="w-full lg:w-auto flex-1">
            <HourlyForecast data={forecastData} />
          </div>
        </div>
      )}
    </>
  );
}
