import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Activity, TrendingUp, DollarSign } from "lucide-react";

const mockClients = [
  { id: 1, name: "João Silva", email: "joao@empresa.com", status: "ativo", plan: "Premium" },
  { id: 2, name: "Maria Santos", email: "maria@empresa.com", status: "inativo", plan: "Basic" },
  { id: 3, name: "Pedro Costa", email: "pedro@empresa.com", status: "ativo", plan: "Premium" },
  { id: 4, name: "Ana Oliveira", email: "ana@empresa.com", status: "pendente", plan: "Basic" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total de Clientes"
            value="1,234"
            description="Clientes ativos"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            variant="success"
          />
          <MetricCard
            title="Receita Mensal"
            value="R$ 45.2K"
            description="Este mês"
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
            variant="success"
          />
          <MetricCard
            title="Taxa de Conversão"
            value="24.8%"
            description="Últimos 30 dias"
            icon={TrendingUp}
            trend={{ value: -2, isPositive: false }}
            variant="warning"
          />
          <MetricCard
            title="Tickets Abertos"
            value="142"
            description="Pendentes"
            icon={Activity}
            trend={{ value: 15, isPositive: false }}
            variant="destructive"
          />
        </div>

        {/* Tabela de Clientes */}
        <Card>
          <CardHeader>
            <CardTitle>Clientes Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.plan}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          client.status === "ativo"
                            ? "default"
                            : client.status === "inativo"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}