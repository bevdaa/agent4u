
import { Link } from "react-router-dom";
import Hero from "@/components/home/Hero";
import CategoryCard from "@/components/tools/CategoryCard";
import ToolCard from "@/components/tools/ToolCard";
import { categories, getFeaturedTools } from "@/data/tools";

const HomePage = () => {
  const featuredTools = getFeaturedTools();
  
  return (
    <div>
      <Hero />
      
      {/* Categories Section */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Browse by Category</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the perfect AI and SaaS tools for your specific needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                description={category.description}
                icon={category.icon}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Tools Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Tools</h2>
              <p className="mt-3 text-lg text-gray-600">
                Explore our handpicked selection of top AI and SaaS deals
              </p>
            </div>
            
            <Link 
              to="/tools" 
              className="text-agent-purple hover:text-agent-purple/80 font-medium hidden md:block"
            >
              View All Tools →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured={true} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link 
              to="/tools" 
              className="text-agent-purple hover:text-agent-purple/80 font-medium"
            >
              View All Tools →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
