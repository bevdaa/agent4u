
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "@/components/ui/PageHeader";

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon!",
      });
      
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <PageHeader
        title="Contact Us"
        description="Questions or suggestions? Get in touch with us"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white shadow-sm rounded-xl border p-6">
          <h2 className="text-xl font-bold mb-4">Send us a message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1"
                rows={5}
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-agent-purple hover:bg-agent-purple/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
        
        <div className="bg-white shadow-sm rounded-xl border p-6">
          <h2 className="text-xl font-bold mb-4">Direct Contact</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-700">contact@agent4u.ai</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Response Time</h3>
              <p className="text-gray-700">
                We usually reply within 24-48 hours.
              </p>
            </div>
          </div>
          
          <div className="border-t mt-6 pt-6">
            <h3 className="font-semibold mb-2">Have a deal to suggest?</h3>
            <p className="text-gray-700 mb-4">
              Know of a great AI or SaaS tool that should be featured? Let us know through the form or email us directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
