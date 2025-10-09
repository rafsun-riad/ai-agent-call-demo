import AIAgentDetailsPageContent from "@/components/ai-agent-details-page-content";
import AIAgentDetailsSkeleton from "@/components/ai-agent-details-skeleton";
import ClientOnly from "@/components/client-only";
import DashboardLayout from "@/components/dashboard-layout";
import { Suspense } from "react";

interface AIAgentDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AIAgentDetailsPage({
  params,
}: AIAgentDetailsPageProps) {
  const { id } = await params;

  return (
    <DashboardLayout>
      <ClientOnly>
        <Suspense fallback={<AIAgentDetailsSkeleton />}>
          <AIAgentDetailsPageContent agentId={id} />
        </Suspense>
      </ClientOnly>
    </DashboardLayout>
  );
}
