import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Configurações administrativas em desenvolvimento...
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}