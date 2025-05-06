
// Categories for the filter component
export const categories = [
  'ai',
  'analytics',
  'content',
  'design',
  'marketing',
  'productivity',
  'sales',
  'seo',
  'social-media',
  'writing'
];

// This type is kept for backward compatibility with components that haven't been updated yet
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

// Legacy function to maintain compatibility with existing components
export const getFeaturedTools = (): Tool[] => {
  return [
    {
      id: "1",
      name: "AI Writer Pro",
      website: "https://example.com/aiwriterpro",
      category: "writing",
      description: "AI Writer Pro helps you create high-quality content in seconds.",
      logo: "/placeholder.svg",
      shortDescription: "Create stunning content with AI",
      referralAvailable: true,
      freeTrial: true,
      affiliateProgram: false,
      deal: {
        title: "7-day free trial + 10% off",
        description: "Get started with a 7-day free trial and 10% off.",
      },
      dealType: "free-trial",
      bonusType: "discount",
      featured: true
    },
    {
      id: "2",
      name: "DataViz Pro",
      website: "https://example.com/datavizpro",
      category: "analytics",
      description: "Transform raw data into beautiful visualizations.",
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
      featured: true
    },
    {
      id: "3",
      name: "SocialBoost",
      website: "https://example.com/socialboost",
      category: "social-media",
      description: "Manage all your social media accounts from one place.",
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
