import { Agent } from '@mastra/core/dist/agent';
import { openai } from '@ai-sdk/openai';
import { supabase } from '../tools/supabase';
import { EmployeeAction } from '../tools/supabase';

// Define tool types
type ToolAction<TInput, TOutput, TContext> = {
  parameters: any;
  description?: string;
  execute: (input: TInput, context: TContext) => Promise<TOutput>;
};

export const actionGenerationAgent = new Agent({
  name: 'action-generation',
  model: openai('gpt-4'),
  instructions: 'You are an action generation specialist for the Crystal Portal Soul Staff Blueprint System. Your role is to create personalized actions and recommendations based on employee data and analysis. Consider birthdays, astrological events, and personal goals when generating actions.',
  tools: {
    generateActions: {
      parameters: {
        type: 'object',
        properties: {
          employeeId: { type: 'string' },
          analysis: { type: 'object' }
        },
        required: ['employeeId', 'analysis']
      },
      description: 'Generates personalized actions for an employee',
      execute: async (input: { employeeId: string; analysis: any }, context: any) => {
        const { employeeId, analysis } = input;
        
        // Generate actions based on analysis
        const actions: Omit<EmployeeAction, 'id' | 'created_at' | 'updated_at'>[] = [
          {
            employee_id: employeeId,
            title: 'Birthday Celebration',
            message: 'Time to celebrate!',
            category: 'birthday',
            priority: 'high',
            status: 'pending'
          }
          // Add more actions based on analysis
        ];

        // Store actions in Supabase
        const { data: insertedActions, error } = await supabase
          .from('employee_actions')
          .insert(actions)
          .select();

        if (error) throw error;
        return insertedActions as EmployeeAction[];
      }
    } as ToolAction<{ employeeId: string; analysis: any }, EmployeeAction[], any>
  }
}); 