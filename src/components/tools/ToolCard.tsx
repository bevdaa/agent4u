
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
  featured?: boolean;
}

const ToolCard = ({ tool, featured = false }: ToolCardProps) => {
  return (
    <Card className={`overflow-hidden hover-scale ${featured ? 'border-agent-purple/30 bg-agent-light-purple/10' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 bg-white rounded-md p-1 flex items-center justify-center">
            <img 
              src={tool.logo} 
              alt={`${tool.name} logo`} 
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{tool.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{tool.shortDescription}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
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
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm font-medium">{tool.deal.title}</p>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-gray-50 border-t">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/tools/${tool.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
