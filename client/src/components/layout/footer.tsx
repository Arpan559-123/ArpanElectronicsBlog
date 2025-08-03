import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Microchip } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: (email: string) => apiRequest("POST", "/api/newsletter", { email }),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Microchip className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">AD Electronics</h3>
                <p className="text-xs text-gray-400">by Arpan Das</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for electronics projects, repair guides, and cutting-edge circuit designs.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 glass-morphism rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300">
                <i className="fab fa-twitter text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 glass-morphism rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300">
                <i className="fab fa-linkedin text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 glass-morphism rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300">
                <i className="fab fa-github text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 glass-morphism rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300">
                <i className="fab fa-youtube text-sm"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Home</a></Link></li>
              <li><Link href="/projects"><a className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Projects</a></Link></li>
              <li><Link href="/blog"><a className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Blog</a></Link></li>
              <li><Link href="/contact"><a className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Contact</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Arduino Projects</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">PCB Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Repair Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Circuit Analysis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">IoT Projects</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Stay updated with the latest projects and tutorials.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={newsletterMutation.isPending}
              >
                {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 AD Electronics by Arpan Das. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
