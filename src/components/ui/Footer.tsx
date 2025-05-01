
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-agent-purple">Agent4u</span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-sm">
              Discover AI & SaaS deals that give you an edge. No signup required.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Navigation</h3>
            <div className="mt-4 space-y-2">
              <Link to="/" className="block text-gray-600 hover:text-agent-purple">Home</Link>
              <Link to="/tools" className="block text-gray-600 hover:text-agent-purple">Tools</Link>
              <Link to="/about" className="block text-gray-600 hover:text-agent-purple">About</Link>
              <Link to="/contact" className="block text-gray-600 hover:text-agent-purple">Contact</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Categories</h3>
            <div className="mt-4 space-y-2">
              <Link to="/tools?category=writing" className="block text-gray-600 hover:text-agent-purple">Writing</Link>
              <Link to="/tools?category=automation" className="block text-gray-600 hover:text-agent-purple">Automation</Link>
              <Link to="/tools?category=development" className="block text-gray-600 hover:text-agent-purple">Development</Link>
              <Link to="/tools?category=marketing" className="block text-gray-600 hover:text-agent-purple">Marketing</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between">
          <p>&copy; {new Date().getFullYear()} Agent4u. All rights reserved.</p>
          <div className="mt-2 md:mt-0 space-x-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
