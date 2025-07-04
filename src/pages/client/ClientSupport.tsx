import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientSupport() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Central de Atendimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Sistema de atendimento e suporte em desenvolvimento...
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}