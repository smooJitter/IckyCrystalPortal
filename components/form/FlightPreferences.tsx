'use client';

import { useState } from 'react';

interface FlightPreferencesProps {
  data: {
    flightTimes: {
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
    };
    flightPriority: number; // 0-100 scale
  };
  onChange: (data: {
    flightTimes: {
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
    };
    flightPriority: number;
  }) => void;
}

export default function FlightPreferences({ data, onChange }: FlightPreferencesProps) {
  // Handle flight time preference change
  const handleFlightTimeChange = (time: 'morning' | 'afternoon' | 'evening') => {
    onChange({
      ...data,
      flightTimes: {
        ...data.flightTimes,
        [time]: !data.flightTimes[time]
      }
    });
  };

  // Handle priority slider change
  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      flightPriority: parseInt(e.target.value)
    });
  };

  return (
    <div>
      <h3 className="card-title">Flight Preferences</h3>
      <p className="text-sm mb-4">Choose your preferred flight options</p>
      
      <div className="space-y-6">
        <div>
          <p className="form-label">Preferred Flight Times</p>
          <div className="flex flex-wrap gap-4">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={data.flightTimes.morning}
                onChange={() => handleFlightTimeChange('morning')}
                className="custom-checkbox mr-2"
              />
              <span className="font-['Space_Mono']">Morning</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={data.flightTimes.afternoon}
                onChange={() => handleFlightTimeChange('afternoon')}
                className="custom-checkbox mr-2"
              />
              <span className="font-['Space_Mono']">Afternoon</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={data.flightTimes.evening}
                onChange={() => handleFlightTimeChange('evening')}
                className="custom-checkbox mr-2"
              />
              <span className="font-['Space_Mono']">Evening</span>
            </label>
          </div>
        </div>
        
        <div>
          <p className="form-label">Price vs. Flight Time Priority</p>
          <div className="flex flex-col mt-2">
            <input
              type="range"
              min="0"
              max="100"
              value={data.flightPriority}
              onChange={handlePriorityChange}
              className="slider"
            />
            
            <div className="flex justify-between mt-2 text-sm font-['Space_Mono']">
              <span>Prioritize Price</span>
              <span>Prioritize Convenience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 