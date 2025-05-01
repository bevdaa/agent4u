
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
          Discover AI Deals <span className="text-agent-purple">That Give You an Edge</span> 💡
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
          Free trials, referral rewards & affiliate tools — no signup required.
          Access the best AI & SaaS deals without barriers.
        </p>
        
        <div className="mt-10 animate-fade-in" style={{animationDelay: "0.4s"}}>
          <Button asChild size="lg" className="bg-agent-purple hover:bg-agent-purple/90 rounded-full px-8 py-6 text-lg">
            <Link to="/tools">Browse Deals</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
