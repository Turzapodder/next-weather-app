import React, { useState } from 'react';
import { Check, ChevronDown, Settings } from 'lucide-react';

const UnitSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState('imperial');

  const unitSystems = {
    imperial: {
      title: 'Switch to Imperial',
      temperature: { unit: 'Fahrenheit (°F)', selected: true },
      windSpeed: { unit: 'mph', selected: true },
      precipitation: { unit: 'Inches (in)', selected: true }
    },
    metric: {
      title: 'Switch to Metric',
      temperature: { unit: 'Celsius (°C)', selected: true },
      windSpeed: { unit: 'km/h', selected: true },
      precipitation: { unit: 'Millimeters (mm)', selected: true }
    }
  };

  const handleSystemChange = (system: 'imperial' | 'metric') => {
    setSelectedSystem(system);
    setIsOpen(false);
  };

  const currentSystem = unitSystems[selectedSystem as keyof typeof unitSystems];
  const otherSystem = selectedSystem === 'imperial' ? 'metric' : 'imperial';

  return (

      <div className="relative">
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-[#262540] text-white rounded-lg hover:bg-[#3C3B5E] cursor-pointer transition-colors"
        >
            <Settings/>
          Units
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden z-50">
            <div className="p-4">
              {/* Clickable Title for Switching */}
              <button
                onClick={() => handleSystemChange(otherSystem)}
                className="flex items-center justify-between mb-4 w-full text-left hover:bg-slate-700 p-2 rounded-lg transition-colors"
              >
                <h3 className="text-white font-medium">{currentSystem.title}</h3>
              </button>
              
              <div className="space-y-4">
                {/* Temperature Section */}
                <div>
                  <p className="text-slate-400 text-sm mb-2">Temperature</p>
                  <div className="flex items-center justify-between py-1">
                    <span className={selectedSystem === 'imperial' ? 'text-white' : 'text-slate-400'}>
                      Celsius (°C)
                    </span>
                    {selectedSystem === 'metric' && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className={selectedSystem === 'imperial' ? 'text-white' : 'text-slate-400'}>
                      Fahrenheit (°F)
                    </span>
                    {selectedSystem === 'imperial' && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>

                {/* Wind Speed Section */}
                <div>
                  <p className="text-slate-400 text-sm mb-2">Wind Speed</p>
                  <div className="flex items-center justify-between py-1">
                    <span className={selectedSystem === 'metric' ? 'text-white' : 'text-slate-400'}>
                      km/h
                    </span>
                    {selectedSystem === 'metric' && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className={selectedSystem === 'imperial' ? 'text-white' : 'text-slate-400'}>
                      mph
                    </span>
                    {selectedSystem === 'imperial' && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>

                {/* Precipitation Section */}
                <div>
                  <p className="text-slate-400 text-sm mb-2">Precipitation</p>
                  <div className="flex items-center justify-between py-1">
                    <span className={selectedSystem === 'metric' ? 'text-white' : 'text-slate-400'}>
                      Millimeters (mm)
                    </span>
                    {selectedSystem === 'metric' && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className={selectedSystem === 'imperial' ? 'text-white' : 'text-slate-400'}>
                      Inches (in)
                    </span>
                    {selectedSystem === 'imperial' && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
   
  );
};

export default UnitSelector;