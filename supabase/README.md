# Supabase Database Setup

This directory contains the database configuration and migrations for the Crystal Portal Soul Staff Blueprint System.

## Database Structure

The database consists of the following tables:

### Core Tables
- `employees`: Stores basic employee information
- `employee_blueprints`: Contains personal and astrological information
- `employee_crystals`: Tracks favorite crystals
- `employee_products`: Records favorite products
- `employee_goals`: Stores career, spiritual, and financial goals
- `employee_actions`: Manages generated actions and recommendations
- `employee_work_style`: Stores work and communication preferences

## Setup Instructions

1. Create a new Supabase project at [https://app.supabase.com](https://app.supabase.com)
2. Go to Project Settings > API to get your:
   - Project URL
   - anon/public key
3. Update your `.env.local` file with these values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
4. Run the initial migration:
   - Go to the SQL Editor in your Supabase dashboard
   - Copy the contents of `migrations/20240101000000_initial_schema.sql`
   - Paste and run the SQL

## Database Features

- UUID primary keys for all tables
- Automatic timestamps (created_at, updated_at)
- Foreign key constraints with CASCADE delete
- Indexes for optimized query performance
- Check constraints for enum values
- Automatic updated_at timestamp updates via triggers

## TypeScript Support

The database schema is fully typed with TypeScript interfaces in `lib/supabase.ts`. These types are used throughout the application to ensure type safety when interacting with the database.

## Security

- Row Level Security (RLS) policies should be implemented based on your application's requirements
- The anon key is safe to use in the browser as it has limited permissions
- Sensitive operations should be performed through server-side functions

## Maintenance

- Regular backups are automatically handled by Supabase
- Database migrations should be version controlled and tested before deployment
- Monitor query performance using Supabase's built-in analytics

## Troubleshooting

If you encounter issues:

1. Check the Supabase dashboard for error logs
2. Verify your environment variables are correctly set
3. Ensure the database migrations have run successfully
4. Check the TypeScript types match your database schema 