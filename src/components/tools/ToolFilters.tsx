
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { categories } from "@/data/tools";

interface ToolFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

const ToolFilters = ({ onSearch, onFilterChange }: ToolFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [referralOnly, setReferralOnly] = useState<boolean>(searchParams.get('referral') === 'true');
  const [affiliateOnly, setAffiliateOnly] = useState<boolean>(searchParams.get('affiliate') === 'true');
  const [freeTrialOnly, setFreeTrialOnly] = useState<boolean>(searchParams.get('freeTrial') === 'true');
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured');
  
  useEffect(() => {
    const filters = {
      category: category === 'all' ? '' : category,
      referralOnly,
      affiliateOnly,
      freeTrialOnly,
      sort
    };
    
    onFilterChange(filters);
    
    // Update search params
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (category !== 'all') params.set('category', category);
    if (referralOnly) params.set('referral', 'true');
    if (affiliateOnly) params.set('affiliate', 'true');
    if (freeTrialOnly) params.set('freeTrial', 'true');
    if (sort !== 'featured') params.set('sort', sort);
    
    setSearchParams(params);
  }, [category, referralOnly, affiliateOnly, freeTrialOnly, sort]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };
  
  const handleReset = () => {
    setSearchQuery('');
    setCategory('all');
    setReferralOnly(false);
    setAffiliateOnly(false);
    setFreeTrialOnly(false);
    setSort('featured');
    setSearchParams({});
    onSearch('');
    onFilterChange({
      category: '',
      referralOnly: false,
      affiliateOnly: false,
      freeTrialOnly: false,
      sort: 'featured'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-20"
          />
          <Button 
            type="submit" 
            variant="ghost" 
            size="sm" 
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            Search
          </Button>
        </div>
      </form>
      
      <div className="space-y-5">
        <div>
          <Label htmlFor="category-select">Category</Label>
          <Select 
            value={category} 
            onValueChange={setCategory}
          >
            <SelectTrigger id="category-select" className="mt-1">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Features</Label>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="referral" 
              checked={referralOnly} 
              onCheckedChange={() => setReferralOnly(!referralOnly)} 
            />
            <Label htmlFor="referral" className="text-sm cursor-pointer">Referral Available</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="affiliate" 
              checked={affiliateOnly} 
              onCheckedChange={() => setAffiliateOnly(!affiliateOnly)} 
            />
            <Label htmlFor="affiliate" className="text-sm cursor-pointer">Affiliate Program</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="free-trial" 
              checked={freeTrialOnly} 
              onCheckedChange={() => setFreeTrialOnly(!freeTrialOnly)} 
            />
            <Label htmlFor="free-trial" className="text-sm cursor-pointer">Free Trial</Label>
          </div>
        </div>
        
        <div>
          <Label htmlFor="sort-select">Sort By</Label>
          <Select 
            value={sort} 
            onValueChange={setSort}
          >
            <SelectTrigger id="sort-select" className="mt-1">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="az">Name (A-Z)</SelectItem>
              <SelectItem value="za">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleReset} 
            className="w-full"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolFilters;
