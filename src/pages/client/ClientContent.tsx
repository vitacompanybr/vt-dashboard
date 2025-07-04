import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientContent() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestão de Conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ferramentas de criação e gestão de conteúdo em desenvolvimento...
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}