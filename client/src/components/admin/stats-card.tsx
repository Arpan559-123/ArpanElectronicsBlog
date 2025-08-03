import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  color: "blue" | "green" | "cyan" | "purple";
}

const colorClasses = {
  blue: "bg-blue-600",
  green: "bg-green-600", 
  cyan: "bg-cyan-400",
  purple: "bg-purple-600",
};

export default function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
  const isPositiveTrend = trend && trend > 0;
  
  return (
    <Card className="glass-morphism bg-gray-800/50 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        
        {trend && (
          <div className="flex items-center text-sm">
            {isPositiveTrend ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={isPositiveTrend ? "text-green-500" : "text-red-500"}>
              {Math.abs(trend)}%
            </span>
            <span className="text-gray-400 ml-1">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
