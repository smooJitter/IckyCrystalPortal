'use client';

import { useState } from 'react';

interface AccommodationPreferencesProps {
  data: {
    type: string; // 'hotel' or 'airbnb'
    priceRange: [number, number]; // min-max price range
  };
  onChange: (data: {
    type: string;
    priceRange: [number, number];
  }) => void;
}

export default function AccommodationPreferences({ data, onChange }: AccommodationPreferencesProps) {
  // Handle accommodation type change
  const handleTypeChange = (type: string) => {
    onChange({
      ...data,
      type
    });
  };

  // Handle price range change (simplified - would typically use a dual range slider)
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value);
    onChange({
      ...data,
      priceRange: [data.priceRange[0], newValue]
    });
  };

  return (
    <div>
      <h3 className="card-title">Accommodation Preferences</h3>
      
      <div className="space-y-6">
        <div>
          <p className="form-label">Accommodation Type</p>
          <div className="flex space-x-4">
            <label className="checkbox-label">
              <input
                type="radio"
                checked={data.type === 'hotel'}
                onChange={() => handleTypeChange('hotel')}
                className="custom-radio mr-2"
                name="accommodation-type"
              />
              <span className="font-['Space_Mono']">Hotel</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="radio"
                checked={data.type === 'airbnb'}
                onChange={() => handleTypeChange('airbnb')}
                className="custom-radio mr-2"
                name="accommodation-type"
              />
              <span className="font-['Space_Mono']">Airbnb</span>
            </label>
          </div>
        </div>
        
        <div>
          <p className="form-label">Select price range</p>
          <div className="select-wrapper">
            <select 
              className="select-input"
              value={data.priceRange[1]}
              onChange={handlePriceRangeChange}
            >
              <option value="100">$100 - $200</option>
              <option value="200">$200 - $300</option>
              <option value="300">$300 - $400</option>
              <option value="400">$400 - $500</option>
              <option value="500">$500+</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 