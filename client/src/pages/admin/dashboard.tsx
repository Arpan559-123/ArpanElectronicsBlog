import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import AdminSidebar from "@/components/admin/sidebar";
import StatsCard from "@/components/admin/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  FileText, 
  FolderOpen, 
  MessageSquare, 
  Plus,
  Upload,
  BarChart3,
  Edit,
  Trash2
} from "lucide-react";

export default function AdminDashboard() {
  const [, navigate] = useLocation();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["/api/admin/analytics"],
    enabled: !!localStorage.getItem("token"),
  });

  const { data: recentPosts, isLoading: postsLoading } = useQuery({
    queryKey: ["/api/admin/posts?limit=5"],
    enabled: !!localStorage.getItem("token"),
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        <AdminSidebar onLogout={handleLogout} />
        
        {/* Main Content */}
        <main className="flex-1 p-8 ml-64">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
            <p className="text-gray-400">Welcome back! Here's what's happening with your site.</p>
          </div>

          {/* Stats Grid */}
          {analyticsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="glass-morphism bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-8 bg-gray-700 rounded mb-4"></div>
                      <div className="h-4 bg-gray-700 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : analytics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Posts"
                value={analytics.totalPosts}
                icon={FileText}
                trend={12}
                color="blue"
              />
              <StatsCard
                title="Total Views"
                value={analytics.totalViews.toLocaleString()}
                icon={TrendingUp}
                trend={8}
                color="green"
              />
              <StatsCard
                title="Active Projects"
                value={analytics.totalProjects}
                icon={FolderOpen}
                trend={5}
                color="cyan"
              />
              <StatsCard
                title="Messages"
                value={analytics.totalContacts}
                icon={MessageSquare}
                trend={15}
                color="purple"
              />
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Failed to load analytics data.</p>
            </div>
          )}

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-morphism bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                {postsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-700 rounded mb-2"></div>
                            <div className="h-3 bg-gray-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentPosts && recentPosts.length > 0 ? (
                  <div className="space-y-4">
                    {recentPosts.map((post: any) => (
                      <div key={post.id} className="flex items-center space-x-4">
                        {post.featuredImage ? (
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-1">{post.title}</h4>
                          <p className="text-sm text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:text-blue-300">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No posts yet.</p>
                )}
              </CardContent>
            </Card>

            <Card className="glass-morphism bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 p-4 h-auto flex-col space-y-2">
                    <Plus className="w-8 h-8" />
                    <div className="text-center">
                      <div className="font-medium">New Post</div>
                      <div className="text-sm opacity-80">Create a blog post</div>
                    </div>
                  </Button>
                  <Button className="bg-gradient-to-r from-green-600 to-cyan-400 hover:from-green-700 hover:to-cyan-500 p-4 h-auto flex-col space-y-2">
                    <FolderOpen className="w-8 h-8" />
                    <div className="text-center">
                      <div className="font-medium">New Project</div>
                      <div className="text-sm opacity-80">Add a project</div>
                    </div>
                  </Button>
                  <Button className="bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 p-4 h-auto flex-col space-y-2">
                    <Upload className="w-8 h-8" />
                    <div className="text-center">
                      <div className="font-medium">Upload Media</div>
                      <div className="text-sm opacity-80">Add images/videos</div>
                    </div>
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-4 h-auto flex-col space-y-2">
                    <BarChart3 className="w-8 h-8" />
                    <div className="text-center">
                      <div className="font-medium">View Analytics</div>
                      <div className="text-sm opacity-80">Check performance</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
