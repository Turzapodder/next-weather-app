import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UnitSystem } from '../slices/unitsSlice';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL;

if (!API_KEY || !BASE_URL) {
  throw new Error('Missing required environment variables: NEXT_PUBLIC_OPENWEATHER_API_KEY and NEXT_PUBLIC_OPENWEATHER_BASE_URL');
}

export interface WeatherData {
  coord: { lon: number; lat: number };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  rain?: { '1h': number; '3h': number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: { all: number };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: { '3h': number };
    sys: { pod: string };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface GeocodingData {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<WeatherData, { city: string; units: UnitSystem }>({
      query: ({ city, units }) => `weather?q=${city}&appid=${API_KEY}&units=${units}`,
    }),
    getForecast: builder.query<ForecastData, { city: string; units: UnitSystem }>({
      query: ({ city, units }) => `forecast?q=${city}&appid=${API_KEY}&units=${units}`,
    }),
    searchCities: builder.query<GeocodingData[], string>({
      query: (query) => 
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,
    }),
  }),
});

export const { 
  useGetCurrentWeatherQuery, 
  useGetForecastQuery,
  useSearchCitiesQuery,
  useLazyGetCurrentWeatherQuery,
  useLazyGetForecastQuery,
  useLazySearchCitiesQuery
} = weatherApi;