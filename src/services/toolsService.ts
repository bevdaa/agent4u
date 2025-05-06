
import { supabase } from "@/integrations/supabase/client";

// Define a Tool type that maps to our Supabase table structure
export type Tool = {
  id: string;
  name: string;
  website: string;
  logo: string;
  category: string[];
  summary: string;
  offer_detail: string;
  referral_tag: boolean;
  n8n_use_case?: string;
  n8n_workflow_url?: string;
  cta_label: string;
};

// Function to map Supabase data to our frontend Tool type
export function mapDbRowToTool(dbRow: any): Tool {
  return {
    id: dbRow.id,
    name: dbRow.name,
    website: dbRow.tool_url || '',
    logo: dbRow.logo_url || '/placeholder.svg',
    category: Array.isArray(dbRow.category) ? dbRow.category : [dbRow.category || 'general'],
    summary: dbRow.summary || '',
    offer_detail: dbRow.offer_detail || '',
    referral_tag: dbRow.referral_tag || false,
    n8n_use_case: dbRow.n8n_use_case,
    n8n_workflow_url: dbRow.n8n_workflow_url,
    cta_label: dbRow.cta_label || 'View Details'
  };
}

// Function to fetch all tools from Supabase
export async function fetchAllTools(): Promise<Tool[]> {
  const response = await fetch('https://uttyuqzdklcjnivmeszo.supabase.co/rest/v1/ai_tools', {
    method: 'GET',
    headers: {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dHl1cXpka2xjam5pdm1lc3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MTA0ODcsImV4cCI6MjA2MjA4NjQ4N30.DdV0z80AK3ybzqgQTDZtHNUW1na61gkJ4RQiAJsWJWQ',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dHl1cXpka2xjam5pdm1lc3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MTA0ODcsImV4cCI6MjA2MjA4NjQ4N30.DdV0z80AK3ybzqgQTDZtHNUW1na61gkJ4RQiAJsWJWQ'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching tools: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.map(mapDbRowToTool);
}

// Function to fetch a single tool by ID
export async function fetchToolById(id: string): Promise<Tool | null> {
  const response = await fetch(`https://uttyuqzdklcjnivmeszo.supabase.co/rest/v1/ai_tools?id=eq.${id}`, {
    method: 'GET',
    headers: {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dHl1cXpka2xjam5pdm1lc3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MTA0ODcsImV4cCI6MjA2MjA4NjQ4N30.DdV0z80AK3ybzqgQTDZtHNUW1na61gkJ4RQiAJsWJWQ',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dHl1cXpka2xjam5pdm1lc3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MTA0ODcsImV4cCI6MjA2MjA4NjQ4N30.DdV0z80AK3ybzqgQTDZtHNUW1na61gkJ4RQiAJsWJWQ'
    }
  });

  if (!response.ok) {
    throw new Error(`Error fetching tool: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (data.length === 0) {
    return null;
  }
  
  return mapDbRowToTool(data[0]);
}
