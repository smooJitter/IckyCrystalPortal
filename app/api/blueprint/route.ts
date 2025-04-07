import { NextRequest, NextResponse } from 'next/server';
import { processEmployeeBlueprint } from '@/mastra-agentic/workflows/workflow';

// Configure OpenAI API key for Mastra agent
if (!process.env.OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY environment variable is not set. The Mastra agent may not work properly.');
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const blueprintData = await request.json();

    // Validate required fields
    if (!blueprintData.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Process the blueprint using our multi-agent workflow
    const result = await processEmployeeBlueprint(blueprintData);

    if (!result.success) {
      console.error('Error processing blueprint:', result.error);
      return NextResponse.json(
        { error: 'Failed to process blueprint' },
        { status: 500 }
      );
    }

    // Return the generated actions
    return NextResponse.json({ actions: result.actions });
  } catch (error) {
    console.error('Error in blueprint API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// This is a placeholder for the Mastra agent workflow configuration
// In a real application, you would configure the Mastra agent workflow here 