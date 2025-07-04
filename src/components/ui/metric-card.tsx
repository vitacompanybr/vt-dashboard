import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "destructive";
  className?: string;
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: MetricCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-gradient-to-br from-success/5 to-success/10";
      case "warning":
        return "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10";
      case "destructive":
        return "border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10";
      default:
        return "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "destructive":
        return "text-destructive";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", getVariantStyles(), className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className={cn("h-4 w-4", getIconColor())} />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {value}
        </div>
        {(description || trend) && (
          <div className="flex items-center justify-between mt-2">
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
            {trend && (
              <p className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}