
import React, { useState } from "react";
import { ExternalLink, ChevronDown } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tool } from "@/services/toolsService";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AIToolCardProps {
  tool: Tool;
}

const AIToolCard = ({ tool }: AIToolCardProps) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 flex-grow">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 bg-white rounded-md p-1 flex items-center justify-center border">
            <img 
              src={tool.logo} 
              alt={`${tool.name} logo`} 
              className="w-10 h-10 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{tool.name}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{tool.summary}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {tool.category.map((cat, index) => (
                <Badge key={index} variant="outline" className="bg-agent-light-purple/30 text-agent-dark-purple border-agent-purple/20">
                  {typeof cat === 'string' ? cat.charAt(0).toUpperCase() + cat.slice(1) : 'General'}
                </Badge>
              ))}
              
              {tool.referral_tag && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Referral Available
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {tool.offer_detail && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium">{tool.offer_detail}</p>
          </div>
        )}
        
        {tool.n8n_use_case && (
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="workflow">
              <AccordionTrigger className="text-sm font-medium py-2">
                n8n Workflow Use Case
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-sm text-gray-700">
                  <p className="mb-2">{tool.n8n_use_case}</p>
                  {tool.n8n_workflow_url && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-2 text-xs"
                      asChild
                    >
                      <a 
                        href={tool.n8n_workflow_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        View Workflow
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-gray-50 border-t mt-auto">
        <Button asChild className="w-full" variant="default">
          <a href={tool.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
            {tool.cta_label}
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIToolCard;
