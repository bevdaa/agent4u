
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Define a Tool type that maps to our Supabase table structure
export type Tool = {
  id: string;
  name: string;
  website: string;
  category: string;
  description: string;
  logo: string;
  shortDescription: string;
  referralAvailable: boolean;
  freeTrial: boolean;
  affiliateProgram: boolean;
  deal: {
    title: string;
    description: string;
    details?: string;
  };
  n8nWorkflow?: {
    steps: string[];
    json: string;
    useCase: string;
  };
};

// This function maps a database row to our frontend Tool type
export function mapDbRowToTool(
  dbRow: Database['public']['Tables']['ai_tools']['Row']
): Tool {
  return {
    id: dbRow.id,
    name: dbRow.tool_name,
    website: dbRow.tool_url,
    category: dbRow.category || 'general',
    description: dbRow.description || '',
    logo: dbRow.logo_url || '/placeholder.svg',
    shortDescription: dbRow.description?.substring(0, 120) + '...' || '',
    referralAvailable: !!dbRow.referral_link,
    freeTrial: !!dbRow.trial_benefit,
    affiliateProgram: !!dbRow.affiliate_program,
    deal: {
      title: dbRow.trial_benefit || dbRow.signup_bonus || 'Special Offer',
      description: dbRow.description?.substring(0, 150) + '...' || 'Check website for details',
      details: dbRow.referral_bonus || undefined
    },
    n8nWorkflow: dbRow.n8n_json ? {
      steps: ((dbRow.n8n_json as any)?.steps || []).map(String),
      json: JSON.stringify(dbRow.n8n_json, null, 2),
      useCase: (dbRow.n8n_json as any)?.useCase || dbRow.use_case || 'Automate workflows with this tool'
    } : undefined
  };
}

// Function to fetch all tools from Supabase
export async function fetchAllTools(): Promise<Tool[]> {
  const { data, error } = await supabase.from('ai_tools').select('*');
  
  if (error) {
    console.error("Error fetching tools:", error);
    return [];
  }
  
  return data.map(mapDbRowToTool);
}

// Function to fetch a tool by ID
export async function fetchToolById(id: string): Promise<Tool | null> {
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error || !data) {
    console.error("Error fetching tool:", error);
    return null;
  }
  
  return mapDbRowToTool(data);
}
