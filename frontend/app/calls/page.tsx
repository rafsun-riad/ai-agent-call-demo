import CallsPageContent from "@/components/calls-page-content";
import CallsTableSkeleton from "@/components/calls-table-skeleton";
import ClientOnly from "@/components/client-only";
import DashboardLayout from "@/components/dashboard-layout";
import { Suspense } from "react";

export default function CallsPage() {
  return (
    <DashboardLayout
      title="Call History"
      subtitle="View and manage all previous call records"
    >
      <ClientOnly>
        <Suspense fallback={<CallsTableSkeleton />}>
          <CallsPageContent />
        </Suspense>
      </ClientOnly>
    </DashboardLayout>
  );
}
