
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
    id: dbRow.id.toString(),
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
  try {
    // Use the Supabase client instead of direct fetch
    const { data, error } = await supabase
      .from('ai_tools')
      .select('*');
    
    if (error) {
      console.error("Error fetching tools:", error);
      throw new Error(`Error fetching tools: ${error.message}`);
    }
    
    if (!data || data.length === 0) {
      console.log("No tools found");
      return [];
    }
    
    return data.map(mapDbRowToTool);
  } catch (error) {
    console.error("Exception fetching tools:", error);
    throw error;
  }
}

// Function to fetch a single tool by ID
export async function fetchToolById(id: string): Promise<Tool | null> {
  try {
    const { data, error } = await supabase
      .from('ai_tools')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching tool:", error);
      throw new Error(`Error fetching tool: ${error.message}`);
    }
    
    if (!data) {
      return null;
    }
    
    return mapDbRowToTool(data);
  } catch (error) {
    console.error("Exception fetching tool by id:", error);
    throw error;
  }
}

// Function to get featured tools (for homepage)
export const getFeaturedTools = async (): Promise<Tool[]> => {
  try {
    const { data, error } = await supabase
      .from('ai_tools')
      .select('*')
      .limit(3);  // Just show 3 featured tools
    
    if (error) {
      console.error("Error fetching featured tools:", error);
      return [];
    }
    
    return data?.map(mapDbRowToTool) || [];
  } catch (error) {
    console.error("Exception fetching featured tools:", error);
    return [];
  }
};
