# Mastra Agentic System

The Mastra Agentic System is a sophisticated AI-powered framework for managing employee data, generating insights, and automating personalized actions within the Crystal Portal Soul Staff Blueprint System.

## Directory Structure

```
mastra-agentic/
├── agents/           # Individual agent implementations
│   ├── dataCollectionAgent.ts
│   ├── analysisAgent.ts
│   ├── actionGenerationAgent.ts
│   ├── notificationAgent.ts
│   └── index.ts
├── tools/           # Shared tools and utilities
│   └── supabase.ts  # Database schema and operations
├── workflows/       # Workflow orchestration
│   └── workflow.ts  # Main workflow implementation
└── README.md        # This file
```

## Database Schema

The system uses Supabase with the following main tables:

### Core Tables
- `employees`: Basic employee information
- `employee_blueprints`: Astrological and human design data
- `employee_crystals`: Crystal assignments and usage
- `employee_products`: Product assignments and usage
- `employee_goals`: Personal and professional goals
- `employee_work_style`: Work preferences and styles
- `employee_actions`: Generated actions and recommendations
- `employee_insights`: AI-generated insights
- `employee_notifications`: Notification management

### Documentation Tables
- `sop_documents`: Standard Operating Procedures
- `sop_templates`: Templates for creating SOPs

## Features

### Data Collection
- Employee profile management
- Astrological and human design data
- Crystal and product assignments
- Goal tracking
- Work style preferences

### Analysis
- AI-powered employee data analysis
- Pattern recognition
- Strength and opportunity identification
- Astrological and human design insights
- Crystal synergy analysis

### Action Generation
- Personalized action recommendations
- Goal-based actions
- Birthday celebrations
- Crystal and product usage suggestions
- Work style optimizations

### Notification Management
- Multi-channel notifications (email, SMS, push, in-app)
- Scheduled notifications
- Delivery tracking
- Error handling

### Documentation
- SOP management
- Version control
- Access control
- Review process
- Attachments support

## Getting Started

1. Install dependencies:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Set up environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Initialize the database:
   ```sql
   -- Run the SQL migration script to create tables
   ```

4. Start using the agents:
   ```typescript
   import { processEmployeeBlueprint } from '@/mastra-agentic/workflows/workflow';
   
   // Process employee data
   const result = await processEmployeeBlueprint(employeeId);
   ```

## Contributing

1. Follow the directory structure
2. Add appropriate TypeScript types
3. Include error handling
4. Document new features
5. Update this README as needed

## License

[Your License Here] 