import { NextRequest, NextResponse } from 'next/server';
import { generateEmployeeActions, EmployeeBlueprintData } from '@/lib/agents/blueprintAgent';

export async function POST(request: NextRequest) {
  try {
    const blueprintData: EmployeeBlueprintData = await request.json();
    
    // Validate the data (minimal validation for now)
    if (!blueprintData.name) {
      return NextResponse.json(
        { error: 'Employee name is required' },
        { status: 400 }
      );
    }
    
    // Generate actions using the Mastra agent
    const actions = await generateEmployeeActions(blueprintData);
    
    // Return the generated actions
    return NextResponse.json({ actions });
  } catch (error) {
    console.error('Error processing employee blueprint:', error);
    return NextResponse.json(
      { error: 'Failed to process employee blueprint' },
      { status: 500 }
    );
  }
}

// This is a placeholder for the Mastra agent workflow configuration
// In a real application, you would configure the Mastra agent workflow here 