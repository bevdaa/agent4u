
export interface Tool {
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
  dealType: 'free-trial' | 'referral' | 'credit' | 'discount';
  bonusType: string;
  featured: boolean;
  n8nWorkflow?: {
    steps: string[];
    json: string;
    useCase: string;
  };
}

// Extract unique categories for filtering
export const categories = [
  {
    id: 'ai',
    name: 'AI',
    description: 'Artificial Intelligence tools and solutions',
    icon: '🤖'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Data analysis and reporting tools',
    icon: '📊'
  },
  {
    id: 'content',
    name: 'Content',
    description: 'Content creation and management tools',
    icon: '📝'
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Design and creative tools',
    icon: '🎨'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Marketing automation and campaign tools',
    icon: '📣'
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Tools to enhance workflow and efficiency',
    icon: '⚡'
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'CRM and sales enablement tools',
    icon: '💰'
  },
  {
    id: 'seo',
    name: 'SEO',
    description: 'Search engine optimization tools',
    icon: '🔍'
  },
  {
    id: 'social-media',
    name: 'Social Media',
    description: 'Social media management and analytics',
    icon: '📱'
  },
  {
    id: 'writing',
    name: 'Writing',
    description: 'Writing and editing assistance tools',
    icon: '✍️'
  }
];

// Sample data for featured tools
export const getFeaturedTools = (): Tool[] => {
  return [
    {
      id: "1",
      name: "AI Writer Pro",
      website: "https://example.com/aiwriterpro",
      category: "Writing",
      description: "AI Writer Pro helps you create high-quality content in seconds. It's perfect for bloggers, marketers, and content creators who want to save time while maintaining quality.",
      logo: "/placeholder.svg",
      shortDescription: "Create stunning content with AI",
      referralAvailable: true,
      freeTrial: true,
      affiliateProgram: false,
      deal: {
        title: "7-day free trial + 10% off first month",
        description: "Get started with a 7-day free trial and receive 10% off your first month subscription.",
        details: "No credit card required for trial. Discount applied automatically."
      },
      dealType: "free-trial",
      bonusType: "discount",
      featured: true
    },
    {
      id: "2",
      name: "DataViz Pro",
      website: "https://example.com/datavizpro",
      category: "Analytics",
      description: "DataViz Pro transforms your raw data into beautiful, interactive visualizations. Perfect for businesses looking to make data-driven decisions.",
      logo: "/placeholder.svg",
      shortDescription: "Turn data into actionable insights",
      referralAvailable: false,
      freeTrial: true,
      affiliateProgram: true,
      deal: {
        title: "14-day free trial",
        description: "Experience the full power of DataViz Pro free for 14 days."
      },
      dealType: "free-trial",
      bonusType: "trial",
      featured: true,
      n8nWorkflow: {
        steps: [
          "Connect your data source to n8n",
          "Configure the DataViz Pro node",
          "Set up automatic data refresh",
          "Deploy your visualization dashboard"
        ],
        json: "{\"nodes\":[{\"id\":\"DataVizPro\",\"type\":\"visualization\"}]}",
        useCase: "Automatically generate weekly sales reports and distribute them to your team."
      }
    },
    {
      id: "3",
      name: "SocialBoost",
      website: "https://example.com/socialboost",
      category: "Social Media",
      description: "SocialBoost helps you manage all your social media accounts from one place. Schedule posts, analyze engagement, and grow your following with powerful AI-driven recommendations.",
      logo: "/placeholder.svg",
      shortDescription: "Supercharge your social media presence",
      referralAvailable: true,
      freeTrial: false,
      affiliateProgram: true,
      deal: {
        title: "Get $15 credit for each referral",
        description: "Earn $15 credit for each friend you refer who signs up."
      },
      dealType: "referral",
      bonusType: "credit",
      featured: true
    }
  ];
};
