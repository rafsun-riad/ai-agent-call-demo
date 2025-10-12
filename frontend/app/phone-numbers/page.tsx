import DashboardLayout from "@/components/dashboard-layout";
import PhoneNumberList from "@/components/phone-number-list";
import { Button } from "@/components/ui/button";

export default function PhoneNumbersPage() {
  return (
    <DashboardLayout title="Phone Numbers" subtitle="Manage outbound numbers">
      <div className="grid grid-cols-1 gap-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Available numbers</h3>
          <div>
            <Button size="sm" variant="outline">
              Refresh
            </Button>
          </div>
        </div>

        <PhoneNumberList />
      </div>
    </DashboardLayout>
  );
}
