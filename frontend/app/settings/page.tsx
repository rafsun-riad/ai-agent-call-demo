import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <DashboardLayout
      title="Settings"
      subtitle="Configure your AI agent call system preferences"
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            className="text-slate-900 border-slate-300 bg-white hover:bg-slate-100"
          >
            Reset to Defaults
          </Button>
          <Button
            size="sm"
            variant="default"
            className="bg-black text-white hover:bg-slate-800"
          >
            Save Changes
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Basic configuration for your AI agent system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="organization-name">Organization Name</Label>
              <Input
                id="organization-name"
                placeholder="Enter your organization name"
                defaultValue="ADN Telecom"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-language">Default Language</Label>
              <Input
                id="default-language"
                placeholder="e.g., English, Spanish"
                defaultValue="English"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                placeholder="e.g., UTC, EST, PST"
                defaultValue="UTC"
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Agent Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>AI Agent Configuration</CardTitle>
            <CardDescription>
              Settings for AI agent behavior and responses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="response-time">Max Response Time (seconds)</Label>
              <Input
                id="response-time"
                type="number"
                placeholder="5"
                defaultValue="3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-personality">Agent Personality</Label>
              <Input
                id="agent-personality"
                placeholder="e.g., Professional, Friendly, Formal"
                defaultValue="Professional"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Call Recording</Label>
                <p className="text-sm text-slate-500">
                  Automatically record all agent calls
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Call Management */}
        <Card>
          <CardHeader>
            <CardTitle>Call Management</CardTitle>
            <CardDescription>
              Configure call handling and routing preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="max-call-duration">
                  Max Call Duration (minutes)
                </Label>
                <Input
                  id="max-call-duration"
                  type="number"
                  placeholder="30"
                  defaultValue="15"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="concurrent-calls">Max Concurrent Calls</Label>
                <Input
                  id="concurrent-calls"
                  type="number"
                  placeholder="10"
                  defaultValue="5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-answer Calls</Label>
                  <p className="text-sm text-slate-500">
                    Automatically answer incoming calls
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Call Queue</Label>
                  <p className="text-sm text-slate-500">
                    Enable call queuing when agents are busy
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-slate-500">
                    Receive call summaries via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Alerts</Label>
                  <p className="text-sm text-slate-500">
                    Get urgent alerts via SMS
                  </p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notification-email">Notification Email</Label>
              <Input
                id="notification-email"
                type="email"
                placeholder="admin@example.com"
                defaultValue="admin@adntech.com"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
