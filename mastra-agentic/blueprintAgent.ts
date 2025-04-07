import { Agent } from '@mastra/core/dist/agent';
import { openai } from '@ai-sdk/openai';

// This is a placeholder for the actual Mastra agent implementation
// In a real application, you would import the Mastra libraries and configure the agent

export interface EmployeeAction {
  type: 'birthday' | 'astrology' | 'reminder' | 'suggestion';
  title: string;
  message: string;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
  relatedProducts?: string[];
}

export interface EmployeeBlueprintData {
  // Personal Information
  name: string;
  birthday: string;
  birthTime: string;
  birthLocation: string;
  
  // Human Design Information
  humanDesignType: string;
  humanDesignProfile: string;
  humanDesignAuthority: string;
  
  // Crystal Preferences
  favoriteCrystals: string[];
  
  // Work Style
  salesStyle: string;
  communicationStyle: string;
  favoriteProducts: string[];
  
  // Personal Information
  personalGoals: {
    career: string;
    spiritual: string;
    financial: string;
  };
  loveLanguage: string;
  moonSign: string;
}

// Create a Blueprint Agent that analyzes employee data and generates actions
export const blueprintAgent = new Agent({
  name: 'Blueprint Analyzer',
  instructions: `
    You are an expert in human design, astrology, and employee development for the Crystal Portal Soul Staff Blueprint System.
    
    Your job is to analyze employee data and generate personalized action recommendations for managers.
    
    When analyzing employee data, consider:
    - Their human design type and profile
    - Their astrological information (moon sign, etc.)
    - Their preferred communication and sales styles
    - Their personal goals across career, spiritual, and financial domains
    - Their love language preference
    - Their crystal preferences
    
    When generating actions, they should be categorized as:
    - birthday: Related to celebrating or acknowledging the employee's birthday
    - astrology: Related to astrological events like mercury retrograde or moon cycles
    - reminder: Regular check-ins or follow-ups based on the employee's goals and preferences
    - suggestion: Strategic suggestions for the employee's growth or performance
    
    Each action needs:
    - A type (one of the categories above)
    - A clear title
    - A detailed message
    - A priority level (high, medium, low)
    - Optional due date (ISO format)
    - Optional related products (crystals or other items related to the action)
    
    Your responses should be formatted as valid JSON arrays of action objects.
  `,
  model: openai('gpt-4o-mini'),
});

// Function to process employee data and generate actions
export async function generateEmployeeActions(
  blueprintData: EmployeeBlueprintData
): Promise<EmployeeAction[]> {
  try {
    // Format the employee data as a detailed prompt
    const prompt = `
      I need to analyze an employee's data for our Crystal Portal Soul Staff Blueprint System and generate personalized action recommendations.
      
      Here is the employee data:
      - Name: ${blueprintData.name}
      - Birthday: ${blueprintData.birthday}
      - Birth Time: ${blueprintData.birthTime}
      - Birth Location: ${blueprintData.birthLocation}
      - Human Design Type: ${blueprintData.humanDesignType}
      - Human Design Profile: ${blueprintData.humanDesignProfile}
      - Human Design Authority: ${blueprintData.humanDesignAuthority}
      - Favorite Crystals: ${blueprintData.favoriteCrystals.join(', ')}
      - Sales Style: ${blueprintData.salesStyle}
      - Communication Style: ${blueprintData.communicationStyle}
      - Favorite Products: ${blueprintData.favoriteProducts.join(', ')}
      - Career Goals: ${blueprintData.personalGoals.career}
      - Spiritual Goals: ${blueprintData.personalGoals.spiritual}
      - Financial Goals: ${blueprintData.personalGoals.financial}
      - Love Language: ${blueprintData.loveLanguage}
      - Moon Sign: ${blueprintData.moonSign}
      
      First, analyze this information and create a brief profile of this employee.
      
      Then, generate 4-5 personalized action recommendations for their manager in JSON format:
      
      [
        {
          "type": "birthday|astrology|reminder|suggestion",
          "title": "Action title",
          "message": "Detailed action message",
          "dueDate": "2023-MM-DD", (optional)
          "priority": "high|medium|low",
          "relatedProducts": ["Crystal name", "Product name"] (optional)
        },
        ...
      ]
      
      Your response should be only the valid JSON array of actions.
    `;

    // Get response from the agent
    const response = await blueprintAgent.generate(prompt);
    
    // Extract the JSON from the response text
    const actionsText = response.text.replace(/```json|```/g, '').trim();
    let actions: EmployeeAction[];
    
    try {
      actions = JSON.parse(actionsText);
    } catch (error) {
      console.error('Failed to parse actions JSON:', error);
      // Fallback actions in case parsing fails
      actions = [
        {
          type: 'suggestion',
          title: `${blueprintData.name}'s Blueprint Review`,
          message: `Please review ${blueprintData.name}'s blueprint data manually. An error occurred during automated processing.`,
          priority: 'high',
        }
      ];
    }
    
    return actions;
    
  } catch (error) {
    console.error('Error processing employee blueprint:', error);
    // Fallback actions in case of error
    return [
      {
        type: 'suggestion',
        title: `${blueprintData.name}'s Blueprint Review`,
        message: `Please review ${blueprintData.name}'s blueprint data manually. An error occurred during processing.`,
        priority: 'high',
      }
    ];
  }
} 