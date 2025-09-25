'use client';

import { GeocodingData } from '@/lib/services/weatherApi';

interface AutocompleteDropdownProps {
  isOpen: boolean;
  isLoading: boolean;
  cities: GeocodingData[];
  onCitySelect: (city: GeocodingData) => void;
  searchTerm: string;
}

export default function AutocompleteDropdown({ 
  isOpen, 
  isLoading, 
  cities, 
  onCitySelect, 
  searchTerm 
}: AutocompleteDropdownProps) {
  if (!isOpen || !searchTerm.trim()) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-[#262540] rounded-lg shadow-xl border border-slate-700 overflow-hidden z-50 max-h-[300px] overflow-y-auto">
      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-2 text-white">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            <span className="text-sm">Search in progress</span>
          </div>
        </div>
      ) : cities.length > 0 ? (
        <div className="p-2">
          {cities.map((city, index) => (
            <button
              key={`${city.lat}-${city.lon}-${index}`}
              onClick={() => onCitySelect(city)}
              className="w-full px-4 py-3 text-left hover:bg-[#302F4A] rounded-md cursor-pointer transition-colors text-white flex flex-col"
            >
              <div className="font-medium">
                {city.name}
                {city.state && `, ${city.state}`}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-4 py-3 text-slate-400 text-sm">
          No cities found
        </div>
      )}
    </div>
  );
}