import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/hero-section";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight, Microchip, Bolt, GraduationCap, Heart } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: featuredPosts, isLoading: postsLoading } = useQuery({
    queryKey: ["/api/blog/posts?limit=3"],
  });

  const { data: featuredProjects, isLoading: projectsLoading } = useQuery({
    queryKey: ["/api/projects?limit=3"],
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <HeroSection />
      
      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Featured Projects</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Dive into these carefully crafted electronics projects with complete tutorials and downloadable resources.
            </p>
          </div>

          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[...Array(3)].map((_, i) => (
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
          ) : featuredProjects && featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project: any) => (
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
                      <Badge className="bg-blue-600 hover:bg-blue-700">
                        {project.difficulty}
                      </Badge>
                      <span className="text-gray-400 text-sm">{project.difficulty}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{project.views} views</span>
                      </div>
                      <Link href={`/projects/${project.slug}`}>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-green-400">
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No featured projects available yet.</p>
            </div>
          )}

          <div className="text-center">
            <Link href="/projects">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Latest from the Blog</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest electronics trends, tutorials, and industry insights.
            </p>
          </div>

          {postsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="glass-morphism bg-gray-800/50 border-gray-700">
                  <div className="flex">
                    <div className="w-32 h-32 bg-gray-700 animate-pulse"></div>
                    <CardContent className="p-6 flex-1">
                      <div className="h-4 bg-gray-700 rounded mb-3 animate-pulse"></div>
                      <div className="h-6 bg-gray-700 rounded mb-3 animate-pulse"></div>
                      <div className="h-12 bg-gray-700 rounded mb-4 animate-pulse"></div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : featuredPosts && featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {featuredPosts.map((post: any) => (
                <Card key={post.id} className="glass-morphism bg-gray-800/50 border-gray-700 hover-lift overflow-hidden">
                  <div className="flex">
                    {post.featuredImage && (
                      <img 
                        src={post.featuredImage} 
                        alt={post.title}
                        className="w-32 h-32 object-cover"
                      />
                    )}
                    <CardContent className="p-6 flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge className="bg-blue-600 hover:bg-blue-700">Tutorial</Badge>
                        <span className="text-gray-400 text-sm">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{post.readTime} min read</span>
                        <Heart className="w-4 h-4 text-red-500" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No blog posts available yet.</p>
            </div>
          )}

          <div className="text-center">
            <Link href="/blog">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">About Arpan Das</h2>
              <p className="text-lg text-gray-300 mb-6">
                With over 8 years of experience in electronics engineering and repair, I've dedicated my career to 
                sharing knowledge and helping others master the art of electronics. From simple circuits to complex 
                embedded systems, I believe in making electronics accessible to everyone.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                Through AD Electronics, I share detailed project tutorials, repair guides, and industry insights 
                that have helped thousands of electronics enthusiasts and professionals worldwide.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">150+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">5000+</div>
                  <div className="text-gray-400">Students Taught</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">2000+</div>
                  <div className="text-gray-400">Devices Repaired</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">8+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    Get in Touch
                  </Button>
                </Link>
                <Button variant="outline" className="glass-morphism border-gray-600 text-white hover:bg-gray-700">
                  View Resume
                </Button>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600" 
                alt="Arpan Das - Electronics Engineer" 
                className="rounded-2xl shadow-2xl hover-lift w-full"
              />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center animate-float">
                <Microchip className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-green-600 to-cyan-400 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '-3s'}}>
                <Bolt className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-morphism p-6 rounded-2xl hover-lift text-center">
              <Microchip className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">50+ Projects</h3>
              <p className="text-gray-400">Detailed tutorials and schematics</p>
            </div>
            <div className="glass-morphism p-6 rounded-2xl hover-lift text-center">
              <Bolt className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Repair Guides</h3>
              <p className="text-gray-400">Professional repair techniques</p>
            </div>
            <div className="glass-morphism p-6 rounded-2xl hover-lift text-center">
              <GraduationCap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Learn & Grow</h3>
              <p className="text-gray-400">From beginner to expert level</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
