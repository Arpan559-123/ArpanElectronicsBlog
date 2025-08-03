import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, Clock, ArrowRight, Github, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["/api/projects?limit=20"],
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-600 hover:bg-green-700";
      case "intermediate": return "bg-yellow-600 hover:bg-yellow-700";
      case "advanced": return "bg-red-600 hover:bg-red-700";
      default: return "bg-blue-600 hover:bg-blue-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Electronics Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore hands-on electronics projects with step-by-step tutorials and complete documentation.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-morphism bg-gray-800/50 border-gray-700">
                  <div className="w-full h-48 bg-gray-700 animate-pulse rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-700 rounded mb-3 animate-pulse"></div>
                    <div className="h-6 bg-gray-700 rounded mb-3 animate-pulse"></div>
                    <div className="h-16 bg-gray-700 rounded mb-4 animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: any) => (
                <Card key={project.id} className="glass-morphism bg-gray-800/50 border-gray-700 hover-lift overflow-hidden">
                  {project.featuredImage && (
                    <img 
                      src={project.featuredImage} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getDifficultyColor(project.difficulty)}>
                        {project.difficulty}
                      </Badge>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(project.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                    
                    {project.estimatedTime && (
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <Clock className="w-4 h-4 mr-1" />
                        {project.estimatedTime}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{project.views} views</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a 
                            href={project.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <Link href={`/projects/${project.slug}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                        View Project <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4">No projects yet</h3>
              <p className="text-gray-400 mb-8">Check back soon for amazing electronics projects!</p>
              <Link href="/">
                <a className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                  Back to Home
                </a>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
