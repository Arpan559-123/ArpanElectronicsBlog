import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, Clock, Heart } from "lucide-react";
import { Link } from "wouter";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage?: string;
    views: number;
    readTime: number;
    publishedAt: string;
    category?: {
      name: string;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="glass-morphism bg-gray-800/50 border-gray-700 hover-lift overflow-hidden">
      <Link href={`/blog/${post.slug}`}>
        <a>
          {post.featuredImage && (
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          )}
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-blue-600 hover:bg-blue-700">
                {post.category?.name || "Tutorial"}
              </Badge>
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
            <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime} min
                </div>
              </div>
              <Heart className="w-5 h-5 text-red-500" />
            </div>
          </CardContent>
        </a>
      </Link>
    </Card>
  );
}
