import AIAgentsPageContent from "@/components/ai-agents-page-content";
import AIAgentsTableSkeleton from "@/components/ai-agents-skeleton";
import ClientOnly from "@/components/client-only";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Suspense } from "react";

export default function AIAgentsPage() {
  return (
    <ClientOnly
      fallback={
        <DashboardLayout
          title="AI Agents"
          subtitle="Manage your AI agents for call handling"
          actions={
            <Button className="bg-black text-white hover:bg-slate-800">
              <Plus className="h-4 w-4 mr-2" />
              Create Agent
            </Button>
          }
        >
          <AIAgentsTableSkeleton />
        </DashboardLayout>
      }
    >
      <Suspense
        fallback={
          <DashboardLayout
            title="AI Agents"
            subtitle="Manage your AI agents for call handling"
            actions={
              <Button className="bg-black text-white hover:bg-slate-800">
                <Plus className="h-4 w-4 mr-2" />
                Create Agent
              </Button>
            }
          >
            <AIAgentsTableSkeleton />
          </DashboardLayout>
        }
      >
        <AIAgentsPageContent />
      </Suspense>
    </ClientOnly>
  );
}
