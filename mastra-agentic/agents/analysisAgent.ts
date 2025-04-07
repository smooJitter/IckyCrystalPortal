import { Agent } from '@mastra/core/dist/agent';
import { openai } from '@ai-sdk/openai';
import { supabase } from '../tools/supabase';

// Define tool types
type ToolAction<TInput, TOutput, TContext> = {
  parameters: any;
  description?: string;
  execute: (input: TInput, context: TContext) => Promise<TOutput>;
};

export const analysisAgent = new Agent({
  name: 'analysis',
  model: openai('gpt-4'),
  instructions: 'You are an expert analyst for the Crystal Portal Soul Staff Blueprint System. Your role is to analyze employee data and identify patterns, strengths, and opportunities. Consider astrological influences, human design, and personal goals in your analysis.',
  tools: {
    analyzeEmployeeData: {
      parameters: {
        type: 'object',
        properties: {
          employeeId: { type: 'string' }
        },
        required: ['employeeId']
      },
      description: 'Analyzes employee data and generates insights',
      execute: async (employeeId: string, context: any) => {
        // Fetch all relevant data
        const [blueprint, crystals, products, goals, workStyle] = await Promise.all([
          supabase.from('employee_blueprints').select('*').eq('employee_id', employeeId).single(),
          supabase.from('employee_crystals').select('*').eq('employee_id', employeeId),
          supabase.from('employee_products').select('*').eq('employee_id', employeeId),
          supabase.from('employee_goals').select('*').eq('employee_id', employeeId),
          supabase.from('employee_work_style').select('*').eq('employee_id', employeeId).single()
        ]);

        // Return structured analysis
        return {
          strengths: [],
          opportunities: [],
          astrologicalInsights: [],
          humanDesignInsights: [],
          crystalSynergies: []
        };
      }
    } as ToolAction<string, any, any>
  }
}); 