import { Agent } from '@mastra/core/dist/agent';
import { openai } from '@ai-sdk/openai';
import { EmployeeAction } from '../tools/supabase';

// Define tool types
type ToolAction<TInput, TOutput, TContext> = {
  parameters: any;
  description?: string;
  execute: (input: TInput, context: TContext) => Promise<TOutput>;
};

export const notificationAgent = new Agent({
  name: 'notification',
  model: openai('gpt-4'),
  instructions: 'You are a notification specialist for the Crystal Portal Soul Staff Blueprint System. Your role is to manage and deliver notifications at the right time with the right tone. Consider the employee\'s communication style and preferences when crafting messages.',
  tools: {
    sendNotification: {
      parameters: {
        type: 'object',
        properties: {
          action: { type: 'object' }
        },
        required: ['action']
      },
      description: 'Sends a notification for an action',
      execute: async (action: EmployeeAction, context: any) => {
        // Format message based on employee preferences
        const message = `🎉 ${action.title}\n\n${action.message}`;
        
        // In a real implementation, this would integrate with email/SMS/chat
        console.log('Sending notification:', message);
        return { success: true };
      }
    } as ToolAction<EmployeeAction, { success: boolean }, any>,
    scheduleNotification: {
      parameters: {
        type: 'object',
        properties: {
          action: { type: 'object' },
          when: { type: 'string', format: 'date-time' }
        },
        required: ['action', 'when']
      },
      description: 'Schedules a notification for a future time',
      execute: async (input: { action: EmployeeAction; when: Date }, context: any) => {
        const { action, when } = input;
        // Schedule the notification for later
        // In a real implementation, this would use a job queue
        console.log('Scheduling notification for:', when);
        return { success: true };
      }
    } as ToolAction<{ action: EmployeeAction; when: Date }, { success: boolean }, any>
  }
}); 