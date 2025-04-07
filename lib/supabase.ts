import { createClient } from '@supabase/supabase-js';

// Define types for our database tables
export type Employee = {
  id: string;
  name: string;
  email?: string;
  created_at: string;
  updated_at: string;
};

export type EmployeeBlueprint = {
  id: string;
  employee_id: string;
  birthday?: string;
  birth_time?: string;
  birth_location?: string;
  human_design_type?: string;
  human_design_profile?: string;
  human_design_authority?: string;
  moon_sign?: string;
  love_language?: string;
  created_at: string;
  updated_at: string;
};

export type EmployeeCrystal = {
  id: string;
  employee_id: string;
  crystal_name: string;
  position: number;
  meaning?: string;
  created_at: string;
};

export type EmployeeProduct = {
  id: string;
  employee_id: string;
  product_name: string;
  position: number;
  created_at: string;
};

export type EmployeeGoal = {
  id: string;
  employee_id: string;
  category: 'career' | 'spiritual' | 'financial';
  goal_text: string;
  created_at: string;
  updated_at: string;
};

export type EmployeeAction = {
  id: string;
  employee_id: string;
  title: string;
  message: string;
  category: 'birthday' | 'astrological' | 'checkin' | 'strategic';
  priority: 'high' | 'medium' | 'low';
  due_date?: string;
  related_product?: string;
  status: 'pending' | 'completed' | 'snoozed';
  created_at: string;
  updated_at: string;
};

export type EmployeeWorkStyle = {
  id: string;
  employee_id: string;
  sales_style?: string;
  communication_style?: string;
  created_at: string;
  updated_at: string;
};

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations
export async function getEmployeeByEmail(email: string) {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) throw error;
  return data as Employee;
}

export async function getEmployeeBlueprint(employeeId: string) {
  const { data, error } = await supabase
    .from('employee_blueprints')
    .select('*')
    .eq('employee_id', employeeId)
    .single();
  
  if (error) throw error;
  return data as EmployeeBlueprint;
}

export async function getEmployeeCrystals(employeeId: string) {
  const { data, error } = await supabase
    .from('employee_crystals')
    .select('*')
    .eq('employee_id', employeeId)
    .order('position');
  
  if (error) throw error;
  return data as EmployeeCrystal[];
}

export async function getEmployeeProducts(employeeId: string) {
  const { data, error } = await supabase
    .from('employee_products')
    .select('*')
    .eq('employee_id', employeeId)
    .order('position');
  
  if (error) throw error;
  return data as EmployeeProduct[];
}

export async function getEmployeeGoals(employeeId: string) {
  const { data, error } = await supabase
    .from('employee_goals')
    .select('*')
    .eq('employee_id', employeeId);
  
  if (error) throw error;
  return data as EmployeeGoal[];
}

export async function getEmployeeActions(employeeId: string) {
  const { data, error } = await supabase
    .from('employee_actions')
    .select('*')
    .eq('employee_id', employeeId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as EmployeeAction[];
}

export async function getEmployeeWorkStyle(employeeId: string) {
  const { data, error } = await supabase
    .from('employee_work_style')
    .select('*')
    .eq('employee_id', employeeId)
    .single();
  
  if (error) throw error;
  return data as EmployeeWorkStyle;
} 