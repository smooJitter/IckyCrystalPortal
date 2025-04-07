'use client';

import { useState } from 'react';

interface TripGoalsProps {
  goals: string;
  onChange: (goals: string) => void;
}

export default function TripGoals({ goals, onChange }: TripGoalsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <h3 className="card-title">Trip Goals</h3>
      
      <div>
        <label className="form-label">What are your goals for this trip?</label>
        <textarea 
          className="form-input min-h-[100px] font-['Space_Mono']"
          value={goals}
          onChange={handleChange}
          placeholder="Tell us about your trip goals..."
        />
      </div>
    </div>
  );
} 