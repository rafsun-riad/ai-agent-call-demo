import DashboardLayout from "@/components/dashboard-layout";
import PhoneNumberList from "@/components/phone-number-list";
import { Button } from "@/components/ui/button";

export default function PhoneNumbersPage() {
  return (
    <DashboardLayout
      title="Phone Numbers"
      subtitle="Make calls using your available phone numbers"
      actions={
        <Button variant="outline" size="sm">
          Refresh
        </Button>
      }
    >
      <PhoneNumberList />
    </DashboardLayout>
  );
}
