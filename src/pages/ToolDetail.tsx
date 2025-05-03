import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tool, fetchToolById } from "@/services/toolsService";
import N8nWorkflow from "@/components/tools/N8nWorkflow";

const ToolDetailPage = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadTool = async () => {
      if (!toolId) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const foundTool = await fetchToolById(toolId);
        
        if (foundTool) {
          setTool(foundTool);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Error loading tool:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    
    loadTool();
  }, [toolId]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-12"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }
  
  if (notFound) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Tool Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the tool you're looking for.</p>
        <Button asChild>
          <Link to="/tools">Browse All Tools</Link>
        </Button>
      </div>
    );
  }
  
  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-12"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-6">
        <Link to="/tools" className="text-agent-purple hover:text-agent-purple/80">
          ← Back to all tools
        </Link>
      </div>
      
      {/* Tool Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
        <div className="w-20 h-20 bg-white rounded-lg shadow-sm p-2 flex items-center justify-center">
          <img 
            src={tool.logo} 
            alt={`${tool.name} logo`} 
            className="w-16 h-16 object-contain"
          />
        </div>
        
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{tool.name}</h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-agent-light-purple/30 text-agent-dark-purple border-agent-purple/20">
              {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
            </Badge>
            
            {tool.freeTrial && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Free Trial
              </Badge>
            )}
            
            {tool.referralAvailable && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Referral Bonus
              </Badge>
            )}
            
            {tool.affiliateProgram && (
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                Affiliate Program
              </Badge>
            )}
          </div>
        </div>
        
        <div className="md:ml-auto">
          <Button asChild className="bg-agent-purple hover:bg-agent-purple/90 w-full md:w-auto">
            <a href={tool.website} target="_blank" rel="noopener noreferrer">
              Visit Site
            </a>
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Tool Description */}
          <div className="bg-white shadow-sm rounded-xl border p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">About {tool.name}</h2>
            <p className="text-gray-700">{tool.description}</p>
          </div>
          
          {/* N8n Workflow */}
          {tool.n8nWorkflow && (
            <N8nWorkflow 
              steps={tool.n8nWorkflow.steps}
              json={tool.n8nWorkflow.json}
              useCase={tool.n8nWorkflow.useCase}
            />
          )}
        </div>
        
        <div>
          {/* Deal Details */}
          <div className="bg-white shadow-sm rounded-xl border p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Deal Details</h2>
            
            <div className="bg-agent-light-purple/20 border border-agent-purple/30 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-lg">{tool.deal.title}</h3>
              <p className="mt-2 text-gray-700">{tool.deal.description}</p>
              {tool.deal.details && (
                <p className="mt-2 text-sm text-gray-600">{tool.deal.details}</p>
              )}
            </div>
            
            <div className="space-y-4">
              {tool.freeTrial && (
                <div>
                  <h4 className="font-medium">Free Trial</h4>
                  <p className="text-sm text-gray-700">
                    This tool offers a free trial period to test all features.
                  </p>
                </div>
              )}
              
              {tool.referralAvailable && (
                <div>
                  <h4 className="font-medium">Referral Program</h4>
                  <p className="text-sm text-gray-700">
                    Earn rewards by referring friends to this tool.
                  </p>
                </div>
              )}
              
              {tool.affiliateProgram && (
                <div>
                  <h4 className="font-medium">Affiliate Program</h4>
                  <p className="text-sm text-gray-700">
                    Earn commissions by promoting this tool.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6 space-y-3">
              <Button asChild className="w-full">
                <a href={tool.website} target="_blank" rel="noopener noreferrer">
                  Claim Deal
                </a>
              </Button>
              
              {tool.n8nWorkflow && (
                <Button variant="outline" className="w-full">
                  Try n8n Workflow
                </Button>
              )}
            </div>
            
            <p className="mt-4 text-xs text-gray-500 text-center">
              No login required. Click to access deal directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailPage;
