import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Overview of AI-powered calls and agents"
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            className="text-slate-900 border-slate-300 bg-white hover:bg-slate-100"
          >
            Call Logs
          </Button>
          <Button
            size="sm"
            variant="default"
            className="bg-black text-white hover:bg-slate-800"
          >
            Start Call
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Welcome to ADN Calls</CardTitle>
            <CardDescription>
              Control and monitor AI-driven calls from here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              This dashboard helps you oversee live call sessions powered by AI
              agents. View real-time transcripts, agent availability, call
              quality metrics, and start new calls directly.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">8</div>
              <div className="text-sm text-slate-500">Live calls</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Online AI Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">12</div>
              <div className="text-sm text-slate-500">
                Available to handle calls
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
