import { Agent } from '@mastra/core/dist/agent';
import { openai } from '@ai-sdk/openai';
import { supabase } from '../tools/supabase';
import { Employee } from '../tools/supabase';

// Define tool types
type ToolAction<TInput, TOutput, TContext> = {
  parameters: any;
  description?: string;
  execute: (input: TInput, context: TContext) => Promise<TOutput>;
};

export const dataCollectionAgent = new Agent({
  name: 'data-collection',
  model: openai('gpt-4'),
  instructions: 'You are a data collection specialist for the Crystal Portal Soul Staff Blueprint System. Your role is to validate and structure employee data before it\'s stored in the database. Ensure all required fields are present and properly formatted.',
  tools: {
    validateEmployeeData: {
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          birthday: { type: 'string' }
        },
        required: ['name', 'birthday']
      },
      description: 'Validates and stores employee data',
      execute: async (data: any, context: any) => {
        // Validate required fields
        if (!data.name) throw new Error('Name is required');
        if (!data.birthday) throw new Error('Birthday is required');
        
        // Store in Supabase
        const { data: employee, error } = await supabase
          .from('employees')
          .insert([{ name: data.name }])
          .select()
          .single();
        
        if (error) throw error;
        return employee;
      }
    } as ToolAction<any, Employee, any>
  }
}); 