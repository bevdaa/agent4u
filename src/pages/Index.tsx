
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import Hero from "@/components/home/Hero";
import CategoryCard from "@/components/tools/CategoryCard";
import ToolCard from "@/components/tools/ToolCard";
import { categories } from "@/data/tools";
import { Tool, getFeaturedTools } from "@/services/toolsService";

const HomePage = () => {
  const { toast } = useToast();
  const [featuredTools, setFeaturedTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedTools = async () => {
      try {
        const tools = await getFeaturedTools();
        setFeaturedTools(tools);
      } catch (error) {
        console.error("Failed to load featured tools:", error);
        toast({
          title: "Error",
          description: "Failed to load featured tools",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedTools();
  }, [toast]);

  // Display categories
  const displayCategories = categories.slice(0, 8);

  return (
    <>
      <Hero />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Categories</h2>
            <Link to="/tools" className="text-agent-purple hover:underline">
              View All Categories
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayCategories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                description={category.description}
                icon={category.icon}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Tools</h2>
            <Link to="/tools" className="text-agent-purple hover:underline">
              View All Tools
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-6 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} featured />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p>No featured tools available at this time.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default HomePage;
