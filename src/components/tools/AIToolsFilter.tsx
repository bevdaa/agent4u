
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AIToolsFilterProps {
  categories: string[];
  onSearch: (query: string) => void;
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
}

const AIToolsFilter = ({ 
  categories, 
  onSearch, 
  onCategorySelect,
  selectedCategory 
}: AIToolsFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="mb-8 space-y-6">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2" size="sm">
          Search
        </Button>
      </form>

      <div>
        <h3 className="font-medium mb-3 text-sm text-gray-600">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Badge 
            onClick={() => onCategorySelect(null)}
            variant={selectedCategory === null ? "default" : "outline"}
            className={`cursor-pointer ${selectedCategory === null ? 'bg-agent-purple text-white' : 'hover:bg-gray-100'}`}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              onClick={() => onCategorySelect(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer ${selectedCategory === category ? 'bg-agent-purple text-white' : 'hover:bg-gray-100'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIToolsFilter;
