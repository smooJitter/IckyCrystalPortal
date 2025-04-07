import { NextRequest, NextResponse } from 'next/server';
import { generateTravelPlan, TravelFormData } from '@/lib/agents/travelAgent';
// AI package would be imported like this:
// import { StreamingTextResponse } from 'ai';

export async function POST(request: NextRequest) {
  try {
    const formData: TravelFormData = await request.json();
    
    // Validate the form data (minimal validation for now)
    if (!formData.departureLocation || !formData.arrivalLocation) {
      return NextResponse.json(
        { error: 'Departure and arrival locations are required' },
        { status: 400 }
      );
    }
    
    // Generate travel plan using the Mastra agent
    const travelPlan = await generateTravelPlan(formData);
    
    // Return the generated plan
    return NextResponse.json({ plan: travelPlan });
  } catch (error) {
    console.error('Error processing travel plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate travel plan' },
      { status: 500 }
    );
  }
}

// This is a placeholder for the Mastra agent workflow configuration
// In a real application, you would configure the Mastra agent workflow here 