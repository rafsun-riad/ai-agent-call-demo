import ClientOnly from "@/components/client-only";
import DashboardLayout from "@/components/dashboard-layout";
import KnowledgeBasePageContent from "@/components/knowledge-base-page-content";
import KnowledgeBaseSkeleton from "@/components/knowledge-base-skeleton";
import { Suspense } from "react";

export default function KnowledgeBasePage() {
  return (
    <ClientOnly
      fallback={
        <DashboardLayout
          title="Knowledge Base"
          subtitle="Manage your knowledge bases and documents"
        >
          <KnowledgeBaseSkeleton />
        </DashboardLayout>
      }
    >
      <Suspense
        fallback={
          <DashboardLayout
            title="Knowledge Base"
            subtitle="Manage your knowledge bases and documents"
          >
            <KnowledgeBaseSkeleton />
          </DashboardLayout>
        }
      >
        <KnowledgeBasePageContent />
      </Suspense>
    </ClientOnly>
  );
}
