'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { useLazySearchCitiesQuery, GeocodingData } from '@/lib/services/weatherApi';
import AutocompleteDropdown from './dropdowns/AutocompleteDropdown';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  error?: string;
}

export default function SearchBar({ onSearch, error }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  
  const [searchCities, { data: cities = [], isLoading }] = useLazySearchCitiesQuery();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Trigger search when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim().length >= 2) {
      searchCities(debouncedSearchTerm);
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [debouncedSearchTerm, searchCities]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm('');
      setIsDropdownOpen(false);
    }
  };

  const handleCitySelect = (city: GeocodingData) => {
    const cityName = city.state ? `${city.name}, ${city.state}, ${city.country}` : `${city.name}, ${city.country}`;
    onSearch(cityName);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full max-w-[520px] mx-auto" ref={searchRef}>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for a place..."
            className="w-full px-4 py-3 pl-14 rounded-lg bg-neutral-800 text-white placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
          <AutocompleteDropdown
            isOpen={isDropdownOpen}
            isLoading={isLoading}
            cities={cities}
            onCitySelect={handleCitySelect}
            searchTerm={searchTerm}
          />
        </div>
        <button
          type="submit"
          className="bg-[#4658D9] hover:bg-white/40 text-white rounded-lg text-xl px-8"
        >
          Search
        </button>
      </form>
    </div>
  );
}