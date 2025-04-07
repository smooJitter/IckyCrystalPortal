'use client';

import { useState } from 'react';

interface TravelDatesProps {
  data: {
    startDate: Date;
    endDate: Date;
    departureLocation: string;
    arrivalLocation: string;
  };
  onChange: (data: {
    startDate: Date;
    endDate: Date;
    departureLocation: string;
    arrivalLocation: string;
  }) => void;
}

export default function TravelDates({ data, onChange }: TravelDatesProps) {
  const formatDate = (date: Date): string => {
    // Format to match "April 7th, 2025"
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).replace(/\d+/, day + suffix);
  };
  
  // Helper function to get day suffix (st, nd, rd, th)
  const getDaySuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const handleDepartureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...data,
      departureLocation: e.target.value
    });
  };

  const handleArrivalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...data,
      arrivalLocation: e.target.value
    });
  };

  return (
    <div>
      <h3 className="card-title">Travel Info</h3>
      <p className="text-sm mb-4">Select your travel dates and locations</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Start Date</label>
          <div className="date-input flex items-center">
            <span className="mr-2">📅</span>
            {formatDate(data.startDate)}
          </div>
        </div>
        
        <div>
          <label className="form-label">End Date</label>
          <div className="date-input flex items-center">
            <span className="mr-2">📅</span>
            {formatDate(data.endDate)}
          </div>
        </div>
        
        <div>
          <label className="form-label">Departure Location</label>
          <div className="select-wrapper">
            <select 
              className="select-input"
              value={data.departureLocation}
              onChange={handleDepartureChange}
            >
              <option value="">Select airport</option>
              <option value="JFK">New York (JFK)</option>
              <option value="LAX">Los Angeles (LAX)</option>
              <option value="ORD">Chicago (ORD)</option>
              <option value="DFW">Dallas/Fort Worth (DFW)</option>
              <option value="LHR">London (LHR)</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="form-label">Arrival Location</label>
          <div className="select-wrapper">
            <select 
              className="select-input"
              value={data.arrivalLocation}
              onChange={handleArrivalChange}
            >
              <option value="">Select airport</option>
              <option value="CDG">Paris (CDG)</option>
              <option value="NRT">Tokyo (NRT)</option>
              <option value="SYD">Sydney (SYD)</option>
              <option value="DXB">Dubai (DXB)</option>
              <option value="HKG">Hong Kong (HKG)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 