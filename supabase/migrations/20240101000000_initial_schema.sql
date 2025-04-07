-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create employees table
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create employee_blueprints table
CREATE TABLE employee_blueprints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  birthday DATE,
  birth_time TIME,
  birth_location TEXT,
  human_design_type TEXT,
  human_design_profile TEXT,
  human_design_authority TEXT,
  moon_sign TEXT,
  love_language TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create employee_crystals table
CREATE TABLE employee_crystals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  crystal_name TEXT NOT NULL,
  position INTEGER NOT NULL,
  meaning TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create employee_products table
CREATE TABLE employee_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create employee_goals table
CREATE TABLE employee_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('career', 'spiritual', 'financial')),
  goal_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create employee_actions table
CREATE TABLE employee_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('birthday', 'astrological', 'checkin', 'strategic')),
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  due_date DATE,
  related_product TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'snoozed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create employee_work_style table
CREATE TABLE employee_work_style (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  sales_style TEXT,
  communication_style TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_employee_blueprints_employee_id ON employee_blueprints(employee_id);
CREATE INDEX idx_employee_crystals_employee_id ON employee_crystals(employee_id);
CREATE INDEX idx_employee_products_employee_id ON employee_products(employee_id);
CREATE INDEX idx_employee_goals_employee_id ON employee_goals(employee_id);
CREATE INDEX idx_employee_actions_employee_id ON employee_actions(employee_id);
CREATE INDEX idx_employee_work_style_employee_id ON employee_work_style(employee_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_blueprints_updated_at
  BEFORE UPDATE ON employee_blueprints
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_goals_updated_at
  BEFORE UPDATE ON employee_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_actions_updated_at
  BEFORE UPDATE ON employee_actions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_work_style_updated_at
  BEFORE UPDATE ON employee_work_style
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 