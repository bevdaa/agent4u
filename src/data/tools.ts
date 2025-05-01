
export interface Tool {
  id: string;
  name: string;
  logo: string;
  description: string;
  shortDescription: string;
  category: string;
  dealType: 'free-trial' | 'referral' | 'credit' | 'discount';
  deal: {
    title: string;
    description: string;
    details?: string;
  };
  referralAvailable: boolean;
  affiliateProgram: boolean;
  freeTrial: boolean;
  bonusType: string;
  featured: boolean;
  n8nWorkflow?: {
    steps: string[];
    json: string;
    useCase: string;
  };
  website: string;
}

const tools: Tool[] = [
  {
    id: "notion-ai",
    name: "Notion AI",
    logo: "https://cdn.worldvectorlogo.com/logos/notion-logo-1.svg",
    description: "Notion AI is an AI-powered writing assistant that helps you generate content and ideas within your notes. It can save you hours in drafting documents by providing smart suggestions.",
    shortDescription: "AI-powered writing assistant for your notes",
    category: "writing",
    dealType: "free-trial",
    deal: {
      title: "14-day free trial + $10 signup credit",
      description: "Get a 14-day free trial with full access to all features plus a $10 credit when you sign up.",
      details: "Credit applies to your first billing cycle after the trial ends."
    },
    referralAvailable: true,
    affiliateProgram: true,
    freeTrial: true,
    bonusType: "Credit",
    featured: true,
    n8nWorkflow: {
      steps: [
        "Connect to Notion API using an HTTP Request node",
        "Configure the node to send a prompt to Notion AI",
        "Process the response to extract the generated content",
        "Save the content to your desired location (Google Docs, email, etc.)"
      ],
      json: `{
        "nodes": [
          {
            "name": "Notion API Request",
            "type": "n8n-nodes-base.httpRequest",
            "parameters": {
              "method": "POST",
              "url": "https://api.notion.com/v1/ai/generate",
              "body": "{ \\"prompt\\": \\"Write a blog post about...\\" }"
            }
          },
          {
            "name": "Process Response",
            "type": "n8n-nodes-base.function",
            "parameters": {
              "functionCode": "// Extract the AI-generated content\\nreturn { content: $input.all()[0].json.content };"
            }
          }
        ],
        "connections": {
          "Notion API Request": {
            "main": [
              [
                {
                  "node": "Process Response",
                  "index": 0,
                  "type": "main"
                }
              ]
            ]
          }
        }
      }`,
      useCase: "Automate your content creation – Using Notion AI with n8n, a blogger can generate a draft article every week automatically. The workflow pulls an outline from a Google Sheet, sends it to Notion AI via API to generate content, then saves the draft back to the CMS. This saves the blogger hours of writing time each week."
    },
    website: "https://www.notion.so/product/ai"
  },
  {
    id: "midjourney",
    name: "Midjourney",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Midjourney_Emblem.png",
    description: "Midjourney is an AI-powered image generator that creates stunning visuals from text descriptions. It's perfect for creators, designers, and marketers who need unique imagery quickly.",
    shortDescription: "AI image generation from text descriptions",
    category: "design",
    dealType: "credit",
    deal: {
      title: "25 free image generations for new users",
      description: "New users get 25 free image generations to try the platform with no credit card required."
    },
    referralAvailable: false,
    affiliateProgram: true,
    freeTrial: true,
    bonusType: "Free Usage",
    featured: true,
    website: "https://www.midjourney.com"
  },
  {
    id: "n8n",
    name: "n8n",
    logo: "https://avatars.githubusercontent.com/u/45487711",
    description: "n8n is a workflow automation platform that connects apps, services, and APIs to automate tasks. It's open-source and can be self-hosted or used as a cloud service.",
    shortDescription: "Workflow automation to connect 350+ apps & services",
    category: "automation",
    dealType: "free-trial",
    deal: {
      title: "Free tier with 1,000 executions/month",
      description: "n8n offers a generous free tier with 1,000 workflow executions per month and access to most features."
    },
    referralAvailable: true,
    affiliateProgram: true,
    freeTrial: true,
    bonusType: "Free Tier",
    featured: true,
    website: "https://n8n.io"
  },
  {
    id: "zapier",
    name: "Zapier",
    logo: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg",
    description: "Zapier is an automation platform that connects your apps and services to automate repetitive tasks without coding or relying on developers to build integrations.",
    shortDescription: "Connect apps and automate workflows",
    category: "automation",
    dealType: "free-trial",
    deal: {
      title: "Free starter plan with 100 tasks/month",
      description: "Start automating with a free plan that includes 100 tasks per month and access to basic features."
    },
    referralAvailable: true,
    affiliateProgram: true,
    freeTrial: true,
    bonusType: "Free Tier",
    featured: true,
    website: "https://zapier.com"
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    description: "ChatGPT Plus is a premium subscription offering faster response times, priority access during peak times, and early access to new features and improvements.",
    shortDescription: "Advanced AI chat with GPT-4 access",
    category: "writing",
    dealType: "free-trial",
    deal: {
      title: "First 7 days free with annual subscription",
      description: "Get your first week free when you sign up for an annual ChatGPT Plus subscription."
    },
    referralAvailable: false,
    affiliateProgram: false,
    freeTrial: true,
    bonusType: "Free Trial",
    featured: true,
    website: "https://chat.openai.com/"
  },
  {
    id: "vercel",
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
    description: "Vercel is a cloud platform for static sites and Serverless Functions that fits perfectly with your workflow. It enables developers to host websites and web services that deploy instantly and scale automatically.",
    shortDescription: "Deploy web projects with zero configuration",
    category: "development",
    dealType: "free-trial",
    deal: {
      title: "Generous free tier for personal projects",
      description: "Deploy unlimited projects on the free tier with generous bandwidth and build minutes allowances."
    },
    referralAvailable: false,
    affiliateProgram: false,
    freeTrial: true,
    bonusType: "Free Tier",
    featured: true,
    website: "https://vercel.com"
  }
];

export function getAllTools(): Tool[] {
  return tools;
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(tool => tool.featured);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find(tool => tool.id === id);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(tool => tool.category.toLowerCase() === category.toLowerCase());
}

export const categories = [
  { 
    id: "writing", 
    name: "Writing", 
    description: "AI-powered writing assistants and content generation tools",
    icon: "✏️"
  },
  { 
    id: "automation", 
    name: "Automation", 
    description: "Tools to automate workflows and repetitive tasks",
    icon: "⚙️" 
  },
  { 
    id: "development", 
    name: "Development", 
    description: "Tools for developers to build and deploy applications",
    icon: "💻" 
  },
  { 
    id: "design", 
    name: "Design", 
    description: "AI-powered design and image generation tools",
    icon: "🎨" 
  },
  { 
    id: "marketing", 
    name: "Marketing", 
    description: "Tools to enhance your marketing and grow your audience",
    icon: "📈" 
  }
];
