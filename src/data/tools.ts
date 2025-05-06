
// Categories for the filter component
export const categories = [
  {
    id: 'ai',
    name: 'AI Tools',
    description: 'Artificial intelligence and machine learning tools',
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
    description: 'Graphic design and creative tools',
    icon: '🎨'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Marketing automation and campaign tools',
    icon: '📢'
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Tools to enhance productivity and efficiency',
    icon: '⚡'
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'Sales enablement and CRM tools',
    icon: '💼'
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
    description: 'Social media management and marketing tools',
    icon: '📱'
  },
  {
    id: 'writing',
    name: 'Writing',
    description: 'Writing and editing tools',
    icon: '✍️'
  }
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
