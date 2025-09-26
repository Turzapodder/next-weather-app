'use client';

import { useState, useRef, useEffect } from 'react';

interface WeekdayDropdownProps {
  selectedDay: string;
  onDaySelect: (day: string) => void;
}

export default function WeekdayDropdown({ selectedDay, onDaySelect }: WeekdayDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDaySelect = (day: string) => {
    onDaySelect(day);
    setIsOpen(false);
  };

  // Available weekdays
  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 justify-between cursor-pointer px-4 py-2 bg-[#262540] text-white rounded-lg border border-slate-700 hover:bg-[#302F4A] transition-colors min-w-[120px]"
      >
        <span className="text-sm font-medium">{selectedDay}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-[#262540] rounded-lg shadow-xl border border-slate-700 overflow-hidden z-50 min-w-[200px] p-2">
          <div>
            {availableDays.map((day) => (
              <button
                key={day}
                onClick={() => handleDaySelect(day)}
                className={`w-full px-2 py-2 mb-2 text-left text-sm transition-colors cursor-pointer rounded-md ${
                  selectedDay === day
                    ? 'bg-[#302F4A] text-white'
                    : 'text-white hover:bg-[#302F4A]'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}