import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden circuit-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10 pt-20">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Electronics Projects & Repair
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore innovative electronics projects, detailed repair guides, and cutting-edge circuit designs. 
            Your go-to resource for electronics expertise.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link href="/projects">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-8 py-4 text-lg font-semibold hover-lift">
                Explore Projects
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" className="glass-morphism border-gray-600 text-white hover:bg-gray-700 px-8 py-4 text-lg font-semibold hover-lift">
                Read Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-gray-400" />
      </div>
    </section>
  );
}
