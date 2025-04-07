import { dataCollectionAgent, analysisAgent, actionGenerationAgent, notificationAgent } from '../agents';

// Main Workflow
export async function processEmployeeBlueprint(data: any) {
  try {
    // 1. Data Collection
    const employee = await dataCollectionAgent.tools.validateEmployeeData.execute(data, {
      toolCallId: 'validate-employee-data',
      messages: []
    });
    
    // 2. Analysis
    const analysis = await analysisAgent.tools.analyzeEmployeeData.execute(employee.id, {
      toolCallId: 'analyze-employee-data',
      messages: []
    });
    
    // 3. Action Generation
    const actions = await actionGenerationAgent.tools.generateActions.execute(
      { employeeId: employee.id, analysis },
      {
        toolCallId: 'generate-actions',
        messages: []
      }
    );
    
    // 4. Notification Scheduling
    for (const action of actions) {
      if (action.due_date) {
        await notificationAgent.tools.scheduleNotification.execute(
          { action, when: new Date(action.due_date) },
          {
            toolCallId: 'schedule-notification',
            messages: []
          }
        );
      } else {
        await notificationAgent.tools.sendNotification.execute(action, {
          toolCallId: 'send-notification',
          messages: []
        });
      }
    }
    
    return { success: true, actions };
  } catch (error) {
    console.error('Error in workflow:', error);
    return { success: false, error };
  }
} 