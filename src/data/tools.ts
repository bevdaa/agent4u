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
  'AI',
  'Analytics',
  'Content',
  'Design',
  'Marketing',
  'Productivity',
  'Sales',
  'SEO',
  'Social Media',
  'Writing'
];
