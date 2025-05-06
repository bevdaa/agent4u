
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/PageHeader";
import AIToolCard from "@/components/tools/AIToolCard";
import ToolFilters from "@/components/tools/ToolFilters";
import { Tool, fetchAllTools } from "@/services/toolsService";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ReloadIcon } from "@radix-ui/react-icons";

const ToolsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    referralOnly: searchParams.get('referral') === 'true',
    affiliateOnly: searchParams.get('affiliate') === 'true',
    freeTrialOnly: searchParams.get('freeTrial') === 'true',
    sort: searchParams.get('sort') || 'featured'
  });
  
  useEffect(() => {
    loadTools();
  }, []);
  
  const loadTools = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const allTools = await fetchAllTools();
      setTools(allTools);
      
      // Apply initial filters
      applyFilters(allTools);
    } catch (err) {
      console.error("Error loading tools:", err);
      setError("Failed to load tools. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to load tools. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(tools);
  };
  
  const handleFilterChange = (newFilters: any) => {
    setFilters({...filters, ...newFilters});
    applyFilters(tools);
  };
  
  const applyFilters = (allTools: Tool[]) => {
    let result = [...allTools];
    
    // Apply search filter
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(lowercaseQuery) || 
        tool.summary.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(tool => 
        tool.category.some(cat => 
          typeof cat === 'string' && cat.toLowerCase() === filters.category.toLowerCase()
        )
      );
    }
    
    // Apply feature filters
    if (filters.referralOnly) {
      result = result.filter(tool => tool.referral_tag);
    }
    
    // Add sort logic
    if (filters.sort === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === 'za') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredTools(result);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <PageHeader 
        title="AI & SaaS Tools" 
        description="Discover the best AI and SaaS tools with exclusive offers and trials."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <ToolFilters 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border rounded-lg p-6 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
              <Button onClick={loadTools} className="mt-4" variant="default">
                <ReloadIcon className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </div>
          ) : filteredTools.length > 0 ? (
            <>
              <p className="mb-6 text-gray-600">
                Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTools.map((tool) => (
                  <AIToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No tools found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
