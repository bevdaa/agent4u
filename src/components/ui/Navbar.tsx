
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-agent-purple">Agent4u</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-agent-purple font-medium">
            Home
          </Link>
          <Link to="/tools" className="text-gray-700 hover:text-agent-purple font-medium">
            Tools
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-agent-purple font-medium">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-agent-purple font-medium">
            Contact
          </Link>
          <Button asChild className="bg-agent-purple hover:bg-agent-purple/90">
            <Link to="/tools">Browse Deals</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2 text-gray-700">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link 
              to="/" 
              className="py-2 text-gray-700 hover:text-agent-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/tools" 
              className="py-2 text-gray-700 hover:text-agent-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Tools
            </Link>
            <Link 
              to="/about" 
              className="py-2 text-gray-700 hover:text-agent-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="py-2 text-gray-700 hover:text-agent-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button 
              asChild 
              className="bg-agent-purple hover:bg-agent-purple/90 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/tools">Browse Deals</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
