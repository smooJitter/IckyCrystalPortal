'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Form sections
import TravelDates from './form/TravelDates';
import TripGoals from './form/TripGoals';
import FlightPreferences from './form/FlightPreferences';
import AccommodationPreferences from './form/AccommodationPreferences';
import AttractionPreferences from './form/AttractionPreferences';

export default function TravelForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    startDate: new Date(2025, 3, 7),  // April 7th, 2025
    endDate: new Date(2025, 3, 8),    // April 8th, 2025
    departureLocation: '',
    arrivalLocation: '',
    tripGoals: '',
    flightTimes: {
      morning: false,
      afternoon: false,
      evening: false
    },
    flightPriority: 50,
    accommodationType: 'hotel',
    accommodationPriceRange: [100, 300] as [number, number],
    interests: {
      museums: false,
      sports: false,
      nightlife: false,
      food: false,
      shopping: false,
      nature: false,
      history: false
    }
  });

  // Handler for form changes
  const handleChange = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('Submitting form data:', formData);
      alert('Your trip is being planned! This would normally call the Mastra agent.');
    } catch (error) {
      console.error('Error planning trip:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      {/* Top Nav Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="bg-black px-3 py-2 rounded">
          <span className="text-white font-['Space_Mono'] font-bold">✈️ TravelAI</span>
        </div>
        <div className="flex items-center">
          <div className="bg-[#FF69B4] text-white px-3 py-1 rounded-md mr-2 font-['Space_Mono']">
            Agent Example ▼
          </div>
          <div className="bg-[#00FF00] border-2 border-black w-8 h-8 flex items-center justify-center text-black font-bold rounded-sm">?</div>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center mb-10">
        <div className="bg-black inline-block px-4 py-2">
          <span className="text-white font-['Space_Mono'] text-3xl font-bold">TravelAI</span>
        </div>
        <div className="bg-[#FF69B4] text-white px-2 py-1 text-sm rounded inline-block ml-2 font-['Space_Mono']">
          Agent
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="travel-card-green">
          <TravelDates 
            data={{ 
              startDate: formData.startDate, 
              endDate: formData.endDate,
              departureLocation: formData.departureLocation,
              arrivalLocation: formData.arrivalLocation
            }}
            onChange={(data) => handleChange('dates', data)}
          />
        </div>
        
        <div className="travel-card-pink">
          <TripGoals 
            goals={formData.tripGoals}
            onChange={(goals) => handleChange('tripGoals', goals)}
          />
        </div>
        
        <div className="travel-card-blue">
          <FlightPreferences 
            data={{
              flightTimes: formData.flightTimes,
              flightPriority: formData.flightPriority
            }}
            onChange={(data) => handleChange('flightPreferences', data)}
          />
        </div>
        
        <div className="travel-card-orange">
          <AccommodationPreferences 
            data={{
              type: formData.accommodationType,
              priceRange: formData.accommodationPriceRange
            }}
            onChange={(data) => handleChange('accommodationPreferences', data)}
          />
        </div>
        
        <div className="travel-card-green">
          <AttractionPreferences 
            interests={formData.interests}
            onChange={(interests) => handleChange('interests', interests)}
          />
        </div>
        
        <button type="submit" className="submit-button">
          PLAN MY TRIP!
        </button>
      </form>
    </div>
  );
} 