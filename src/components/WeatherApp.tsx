"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherStats from "@/components/WeatherStats";
import Forecast from "@/components/Forecast";
import HourlyForecast from "@/components/HourlyForecast";
import UnitSelector from "@/components/dropdowns/DropdownSwitcher";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import {
  useLazyGetCurrentWeatherQuery,
  useLazyGetForecastQuery,
} from "@/lib/services/weatherApi";

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
      <div className="top-section flex justify-between w-full">
        <Image src="/assets/Logo.svg" alt="logo" width={200} height={150} />
        <UnitSelector />
      </div>

      <h1 className="font-display text-[52px] font-bold mb-8 mt-8">
        How&apos;s the sky looking today?
      </h1>

      <SearchBar onSearch={handleSearch} error={searchError} />

      {isLoading && <LoadingSkeleton />}

      {hasError && !isLoading && (
        <div className="text-center mt-10">
          <p className="text-[28px] font-bold">
            {searchError || "Something went wrong. Please try again."}
          </p>
        </div>
      )}

      {!hasData && !isLoading && !hasError && (
        <div className="text-center mt-10">
          <p className="text-[28px] font-bold">
            Search for a city to see the weather forecast
          </p>
        </div>
      )}

      {hasData && !isLoading && (
        <div className="flex gap-[48px] mt-20 space-y-8">
          <div className="w-[800px] space-y-8">
            <CurrentWeather data={weatherData} />
            <WeatherStats data={weatherData} />
            <Forecast data={forecastData} />
          </div>
          <div>
            <HourlyForecast data={forecastData} />
          </div>
        </div>
      )}
    </>
  );
}
