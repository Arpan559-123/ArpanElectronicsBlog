import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, Clock, ArrowRight, Github, ExternalLink } from "lucide-react";
import { Link } from "wouter";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    slug: string;
    description: string;
    featuredImage?: string;
    difficulty: string;
    views: number;
    estimatedTime?: string;
    publishedAt: string;
    githubUrl?: string;
    demoUrl?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-600 hover:bg-green-700";
      case "intermediate": return "bg-yellow-600 hover:bg-yellow-700";
      case "advanced": return "bg-red-600 hover:bg-red-700";
      default: return "bg-blue-600 hover:bg-blue-700";
    }
  };

  return (
    <Card className="glass-morphism bg-gray-800/50 border-gray-700 hover-lift overflow-hidden">
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
  );
}
