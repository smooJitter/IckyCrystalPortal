import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Database Types
export interface Employee {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  birthday: string;
  human_design_type?: string;
  astrological_sign?: string;
  moon_sign?: string;
  rising_sign?: string;
  preferred_communication_style?: string;
  status: 'active' | 'inactive';
  metadata?: Record<string, any>; // For additional employee-specific data
}

export interface EmployeeBlueprint {
  id: string;
  created_at: string;
  updated_at: string;
  employee_id: string;
  human_design_type: string;
  astrological_sign: string;
  moon_sign: string;
  rising_sign: string;
  personal_goals: string[];
  work_style_preferences: string[];
  communication_preferences: string[];
  notes?: string;
  astrological_data?: Record<string, any>; // Detailed astrological chart data
  human_design_data?: Record<string, any>; // Detailed human design chart data
}

export interface EmployeeCrystal {
  id: string;
  created_at: string;
  updated_at: string;
  employee_id: string;
  crystal_name: string;
  crystal_type: string;
  properties: string[];
  benefits: string[];
  recommended_usage: string;
  status: 'active' | 'inactive';
  crystal_data?: Record<string, any>; // Additional crystal-specific data
  usage_history?: Array<{
    date: string;
    purpose: string;
    notes: string;
  }>;
}

export interface EmployeeProduct {
  id: string;
  created_at: string;
  updated_at: string;
  employee_id: string;
  product_name: string;
  product_type: string;
  description: string;
  benefits: string[];
  recommended_usage: string;
  status: 'active' | 'inactive';
  product_data?: Record<string, any>; // Additional product-specific data
  usage_history?: Array<{
    date: string;
    purpose: string;
    notes: string;
  }>;
}

export interface EmployeeGoal {
  id: string;
  created_at: string;
  updated_at: string;
  employee_id: string;
  title: string;
  description: string;
  category: 'personal' | 'professional' | 'spiritual' | 'health';
  priority: 'low' | 'medium' | 'high';
  target_date?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  progress_notes?: string[];
  goal_data?: Record<string, any>; // Additional goal-specific data
  milestones?: Array<{
    title: string;
    target_date: string;
    completed: boolean;
    completed_at?: string;
  }>;
}

export interface EmployeeWorkStyle {
  id: string;
  created_at: string;
  updated_at: string;
  employee_id: string;
  preferred_work_hours: string[];
  preferred_communication_channels: string[];
  work_environment_preferences: string[];
  learning_style: string;
  collaboration_preferences: string[];
  stress_management_techniques: string[];
  productivity_boosters: string[];
  work_style_data?: Record<string, any>; // Additional work style data
  performance_metrics?: Record<string, any>; // Performance tracking data
}

export interface EmployeeAction {
  id: string;
  created_at: string;
  updated_at: string;
  employee_id: string;
  title: string;
  message: string;
  category: 'birthday' | 'goal' | 'crystal' | 'product' | 'work_style' | 'general';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  due_date?: string;
  completed_at?: string;
  notes?: string;
  action_data?: Record<string, any>; // Additional action-specific data
  related_entities?: {
    goal_id?: string;
    crystal_id?: string;
    product_id?: string;
  };
}

export interface EmployeeInsight {
  id: string;
  created_at: string;
  updated_at: string;
  employee_id: string;
  insight_type: 'strength' | 'opportunity' | 'astrological' | 'human_design' | 'crystal_synergy';
  title: string;
  description: string;
  source: 'analysis' | 'action' | 'manual';
  relevance_score: number;
  status: 'active' | 'archived';
  insight_data?: Record<string, any>; // Additional insight-specific data
  related_entities?: {
    action_id?: string;
    goal_id?: string;
    crystal_id?: string;
    product_id?: string;
  };
}

export interface EmployeeNotification {
  id: string;
  created_at: string;
  updated_at: string;
  employee_id: string;
  action_id: string;
  title: string;
  message: string;
  channel: 'email' | 'sms' | 'push' | 'in_app';
  status: 'pending' | 'sent' | 'failed' | 'read';
  scheduled_for?: string;
  sent_at?: string;
  read_at?: string;
  error_message?: string;
  notification_data?: Record<string, any>; // Additional notification-specific data
  delivery_attempts?: Array<{
    timestamp: string;
    status: 'success' | 'failed';
    error_message?: string;
  }>;
}

export interface SOPDocument {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  version: string;
  category: 'general' | 'crystal' | 'product' | 'workflow' | 'training' | 'compliance';
  status: 'draft' | 'review' | 'approved' | 'archived';
  content: Record<string, any>; // Main content of the SOP
  sections: Array<{
    title: string;
    content: string;
    order: number;
  }>;
  metadata?: {
    author: string;
    last_reviewed_by?: string;
    last_reviewed_at?: string;
    next_review_date?: string;
    related_documents?: string[];
  };
  attachments?: Array<{
    name: string;
    type: string;
    url: string;
    size: number;
  }>;
  access_control?: {
    roles: string[];
    departments: string[];
    permissions: string[];
  };
  history?: Array<{
    version: string;
    changed_by: string;
    changed_at: string;
    changes: string[];
  }>;
}

export interface SOPTemplate {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  category: 'general' | 'crystal' | 'product' | 'workflow' | 'training' | 'compliance';
  structure: Record<string, any>; // Template structure
  default_sections: Array<{
    title: string;
    description: string;
    required: boolean;
    order: number;
  }>;
  metadata?: {
    created_by: string;
    last_used_at?: string;
    usage_count: number;
  };
}

// Database Tables
export const TABLES = {
  employees: 'employees',
  employee_blueprints: 'employee_blueprints',
  employee_crystals: 'employee_crystals',
  employee_products: 'employee_products',
  employee_goals: 'employee_goals',
  employee_work_style: 'employee_work_style',
  employee_actions: 'employee_actions',
  employee_insights: 'employee_insights',
  employee_notifications: 'employee_notifications',
  sop_documents: 'sop_documents',
  sop_templates: 'sop_templates',
} as const;

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

// Add helper functions for SOP operations
export async function getSOPDocument(id: string) {
  const { data, error } = await supabase
    .from(TABLES.sop_documents)
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as SOPDocument;
}

export async function getSOPDocumentsByCategory(category: SOPDocument['category']) {
  const { data, error } = await supabase
    .from(TABLES.sop_documents)
    .select('*')
    .eq('category', category)
    .order('title');
  
  if (error) throw error;
  return data as SOPDocument[];
}

export async function createSOPDocument(document: Omit<SOPDocument, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from(TABLES.sop_documents)
    .insert([document])
    .select()
    .single();
  
  if (error) throw error;
  return data as SOPDocument;
}

export async function updateSOPDocument(id: string, updates: Partial<SOPDocument>) {
  const { data, error } = await supabase
    .from(TABLES.sop_documents)
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as SOPDocument;
} 