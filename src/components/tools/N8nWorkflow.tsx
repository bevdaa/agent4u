
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clipboard, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface N8nWorkflowProps {
  steps: string[];
  json: string;
  useCase: string;
}

const N8nWorkflow = ({ steps, json, useCase }: N8nWorkflowProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied!",
          description: "Workflow JSON copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Error",
          description: "Failed to copy to clipboard",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">n8n Integration</h2>
      
      <div className="bg-white shadow-sm rounded-xl border p-6">
        <h3 className="font-semibold text-lg">Step-by-Step Integration Guide</h3>
        <ol className="list-decimal pl-5 mt-3 space-y-2">
          {steps.map((step, index) => (
            <li key={index} className="text-gray-700">{step}</li>
          ))}
        </ol>
        
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3">Workflow JSON Config</h3>
          <div className="relative">
            <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm text-gray-800 font-mono border">
              {json}
            </pre>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyToClipboard}
              className="absolute top-2 right-2"
            >
              {copied ? <Check size={16} /> : <Clipboard size={16} />}
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3">Real-World Use Case</h3>
          <div className="bg-agent-light-purple/10 border border-agent-purple/20 rounded-md p-4 text-gray-700">
            {useCase}
          </div>
        </div>
      </div>
    </div>
  );
};

export default N8nWorkflow;
