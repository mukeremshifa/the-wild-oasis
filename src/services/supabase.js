import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://hvypioacspohpcjdedsl.supabase.co';
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eXBpb2Fjc3BvaHBjamRlZHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MDI5OTIsImV4cCI6MjA1NzQ3ODk5Mn0.gq3q7cxNu0a8lAKR2zXExVG81t_KUHiP3LDxIghvxfk`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
