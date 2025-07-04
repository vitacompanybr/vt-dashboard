import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientSettings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Configurações pessoais e preferências em desenvolvimento...
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}