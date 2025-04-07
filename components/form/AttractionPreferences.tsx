'use client';

import { useState } from 'react';

interface AttractionPreferencesProps {
  interests: {
    museums: boolean;
    sports: boolean;
    nightlife: boolean;
    food: boolean;
    shopping: boolean;
    nature: boolean;
    history: boolean;
  };
  onChange: (interests: {
    museums: boolean;
    sports: boolean;
    nightlife: boolean;
    food: boolean;
    shopping: boolean;
    nature: boolean;
    history: boolean;
  }) => void;
}

export default function AttractionPreferences({ interests, onChange }: AttractionPreferencesProps) {
  const interestLabels = {
    museums: 'Museums & Culture',
    sports: 'Sports & Recreation',
    nightlife: 'Nightlife & Entertainment',
    food: 'Food & Dining',
    shopping: 'Shopping',
    nature: 'Nature & Outdoors',
    history: 'Historical Sites'
  };

  // Handle interest toggle
  const handleInterestToggle = (interest: keyof typeof interests) => {
    onChange({
      ...interests,
      [interest]: !interests[interest]
    });
  };

  return (
    <div>
      <h3 className="card-title">Attraction Preferences</h3>
      
      <div>
        <p className="form-label">Interests</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(interestLabels).map(([key, label]) => (
            <label key={key} className="checkbox-label inline-flex items-center">
              <input
                type="checkbox"
                checked={interests[key as keyof typeof interests]}
                onChange={() => handleInterestToggle(key as keyof typeof interests)}
                className="custom-checkbox mr-2"
              />
              <span className="font-['Space_Mono'] text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 