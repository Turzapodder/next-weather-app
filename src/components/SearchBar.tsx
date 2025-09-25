'use client';

import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  error?: string;
}

export default function SearchBar({ onSearch, error }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm('');
  };

  return (
    <div className="w-full max-w-[520px] mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a place..."
          className="w-full px-4 py-3 rounded-lg bg-[#262540]  text-white placeholder-white font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="submit"
          className=" bg-[#4658D9] hover:bg-white/40 text-white rounded-lg text-xl px-8"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-200 mt-2 text-sm">{error}</p>}
    </div>
  );
}