import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, MessageSquare, Eye, ThumbsUp } from "lucide-react";

export default function ClientDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Métricas Coloridas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Leads Captados"
            value="186"
            description="Este mês"
            icon={UserPlus}
            trend={{ value: 18, isPositive: true }}
            variant="success"
          />
          <MetricCard
            title="Tickets Resolvidos"
            value="42"
            description="Esta semana"
            icon={MessageSquare}
            trend={{ value: 7, isPositive: true }}
            variant="default"
          />
          <MetricCard
            title="Visualizações"
            value="3.2K"
            description="Conteúdo publicado"
            icon={Eye}
            trend={{ value: 22, isPositive: true }}
            variant="warning"
          />
          <MetricCard
            title="Engajamento"
            value="94%"
            description="Taxa de satisfação"
            icon={ThumbsUp}
            trend={{ value: 3, isPositive: true }}
            variant="success"
          />
        </div>

        {/* Gráficos de Tendência */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Captação de Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Gráfico de tendência em desenvolvimento...
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance de Atendimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Gráfico de performance em desenvolvimento...
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo de Atividades */}
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Novo lead captado via formulário</p>
                  <p className="text-xs text-muted-foreground">há 2 minutos</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Ticket #1234 resolvido</p>
                  <p className="text-xs text-muted-foreground">há 15 minutos</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Conteúdo publicado no blog</p>
                  <p className="text-xs text-muted-foreground">há 1 hora</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}