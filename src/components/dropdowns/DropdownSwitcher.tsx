import React, { useState } from "react";
import { Check, ChevronDown, Settings } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { setUnitSystem, UnitSystem } from '@/lib/slices/unitsSlice';

const UnitSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedSystem = useSelector((state: RootState) => state.units.system);

  const unitSystems = {
    imperial: {
      title: "Switch to Imperial",
      units: {
        Temperature: "Fahrenheit (°F)",
        "Wind Speed": "mph",
        Precipitation: "Inches (in)",
      },
    },
    metric: {
      title: "Switch to Metric",
      units: {
        Temperature: "Celsius (°C)",
        "Wind Speed": "km/h",
        Precipitation: "Millimeters (mm)",
      },
    },
  };

  const handleSystemChange = (system: UnitSystem) => {
    dispatch(setUnitSystem(system));
  };

  const currentSystem = unitSystems[selectedSystem];
  const otherSystem = selectedSystem === "imperial" ? "metric" : "imperial";

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-neutral-800 cursor-pointer text-white rounded-lg hover:bg-[#302F4A] transition-colors"
      >
        <Settings />
        Units
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[210px] bg-neutral-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden z-50">
          <div className="p-[6px]">
            {/* Switch Button */}
            <button
              onClick={() => handleSystemChange(otherSystem)}
              className="flex items-center justify-between cursor-pointer w-full py-[10px] px-[8px] text-left hover:bg-[#302F4A] rounded-lg transition-colors"
            >
              <h3 className="text-white font-medium">
                {unitSystems[otherSystem].title}
              </h3>
            </button>

            {/* Units Loop */}
            <div className="space-y-4">
              {Object.keys(unitSystems.imperial.units).map((category) => {
                const imperialUnit =
                  unitSystems.imperial.units[
                    category as keyof typeof unitSystems.imperial.units
                  ];
                const metricUnit =
                  unitSystems.metric.units[
                    category as keyof typeof unitSystems.metric.units
                  ];

                return (
                  <div key={category}>
                    <p className="text-slate-400 text-sm mb-2 px-[8px]">
                      {category}
                    </p>

                    {[metricUnit, imperialUnit].map((unit) => {
                      const isSelected =
                        currentSystem.units[
                          category as keyof typeof currentSystem.units
                        ] === unit;

                      return (
                        <div
                          key={unit}
                          className={
                            "flex items-center justify-between py-[10px] px-[8px]" +
                            (isSelected ? " bg-[#302F4A] rounded-lg" : "")
                          }
                        >
                          <span className="text-white">{unit}</span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default UnitSelector;
