
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "@/components/ui/PageHeader";
import ToolCard from "@/components/tools/ToolCard";
import ToolFilters from "@/components/tools/ToolFilters";
import { Tool, getAllTools } from "@/data/tools";

const ToolsPage = () => {
  const [searchParams] = useSearchParams();
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  useEffect(() => {
    // Get all tools
    const allTools = getAllTools();
    setTools(allTools);
    
    // Apply initial filters from URL params
    const initialCategory = searchParams.get('category') || '';
    const initialReferral = searchParams.get('referral') === 'true';
    const initialAffiliate = searchParams.get('affiliate') === 'true';
    const initialFreeTrial = searchParams.get('freeTrial') === 'true';
    const initialSort = searchParams.get('sort') || 'featured';
    const initialSearch = searchParams.get('search') || '';
    
    setSearchQuery(initialSearch);
    
    const initialFilters = {
      category: initialCategory,
      referralOnly: initialReferral,
      affiliateOnly: initialAffiliate,
      freeTrialOnly: initialFreeTrial,
      sort: initialSort
    };
    
    applyFilters(allTools, initialFilters, initialSearch);
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(tools, {
      category: searchParams.get('category') || '',
      referralOnly: searchParams.get('referral') === 'true',
      affiliateOnly: searchParams.get('affiliate') === 'true',
      freeTrialOnly: searchParams.get('freeTrial') === 'true',
      sort: searchParams.get('sort') || 'featured'
    }, query);
  };
  
  const handleFilterChange = (filters: any) => {
    applyFilters(tools, filters, searchQuery);
  };
  
  const applyFilters = (allTools: Tool[], filters: any, query: string) => {
    let result = [...allTools];
    
    // Apply search
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(lowercaseQuery) || 
        tool.description.toLowerCase().includes(lowercaseQuery) ||
        tool.category.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(tool => tool.category === filters.category);
    }
    
    // Apply checkbox filters
    if (filters.referralOnly) {
      result = result.filter(tool => tool.referralAvailable);
    }
    
    if (filters.affiliateOnly) {
      result = result.filter(tool => tool.affiliateProgram);
    }
    
    if (filters.freeTrialOnly) {
      result = result.filter(tool => tool.freeTrial);
    }
    
    // Apply sorting
    if (filters.sort === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === 'za') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    // 'featured' is the default and doesn't need sorting as the data comes pre-sorted
    
    setFilteredTools(result);
  };
  
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <PageHeader 
        title="Browse AI & SaaS Tools" 
        description="Discover the best deals and trials for top AI and SaaS tools — no signup required."
      />
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <div className="sticky top-24">
            <ToolFilters 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
        
        <div className="lg:w-3/4">
          {filteredTools.length > 0 ? (
            <>
              <p className="mb-6 text-gray-600">
                Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No tools found</h3>
              <p className="text-gray-600">
                Try changing your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
