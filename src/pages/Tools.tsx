
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/PageHeader";
import AIToolCard from "@/components/tools/AIToolCard";
import AIToolsFilter from "@/components/tools/AIToolsFilter";
import { Tool, fetchAllTools } from "@/services/toolsService";

const ToolsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  
  // Extract unique categories from all tools
  const categories = [...new Set(tools.flatMap(tool => tool.category))].filter(Boolean) as string[];
  
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
      applyFilters(allTools, searchQuery, selectedCategory);
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
    applyFilters(tools, query, selectedCategory);
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };
  
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    applyFilters(tools, searchQuery, category);
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };
  
  const applyFilters = (allTools: Tool[], query: string, category: string | null) => {
    let result = [...allTools];
    
    // Apply search filter
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(lowercaseQuery) || 
        tool.summary.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply category filter
    if (category) {
      result = result.filter(tool => 
        tool.category.some(cat => 
          typeof cat === 'string' && cat.toLowerCase() === category.toLowerCase()
        )
      );
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
            <AIToolsFilter 
              categories={categories}
              onSearch={handleSearch}
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
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
              <h3 className="text-xl font-medium mb-2 text-red-600">Error Loading Tools</h3>
              <p className="text-gray-600">{error}</p>
              <Button onClick={loadTools} className="mt-4">
                Try Again
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
