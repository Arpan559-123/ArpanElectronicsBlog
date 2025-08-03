import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, Clock, Heart } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["/api/blog/posts?limit=20"],
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Electronics Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the latest in electronics technology, tutorials, and industry insights.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
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
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Card key={post.id} className="glass-morphism bg-gray-800/50 border-gray-700 hover-lift overflow-hidden">
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
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4">No blog posts yet</h3>
              <p className="text-gray-400 mb-8">Check back soon for amazing electronics tutorials and insights!</p>
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
