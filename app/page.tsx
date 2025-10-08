import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function Icon(props: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center h-5 w-5 text-slate-500">
      {props.children}
    </span>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r shadow-sm flex flex-col">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">ADN</h1>
              <p className="text-xs text-slate-500 mt-1">AI Calls Dashboard</p>
            </div>
          </div>
        </div>

        <Separator />

        <nav className="px-2 py-4 flex-1 space-y-1">
          <Button asChild variant="ghost" className="w-full justify-start px-4">
            <Link
              href="/"
              className="flex items-center gap-3 w-full text-slate-700"
            >
              <Icon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                </svg>
              </Icon>
              Dashboard
            </Link>
          </Button>

          <Button asChild variant="ghost" className="w-full justify-start px-4">
            <Link
              href="#"
              className="flex items-center gap-3 w-full text-slate-700"
            >
              <Icon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 6.5a2.5 2.5 0 0 0-2.5-2.5H5.5A2.5 2.5 0 0 0 3 6.5v11A2.5 2.5 0 0 0 5.5 20h13A2.5 2.5 0 0 0 21 17.5v-11zM7 9h10M7 13h6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Icon>
              Calls
            </Link>
          </Button>

          <Button asChild variant="ghost" className="w-full justify-start px-4">
            <Link
              href="#"
              className="flex items-center gap-3 w-full text-slate-700"
            >
              <Icon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM2 22a10 10 0 0 1 20 0H2z"
                    fill="currentColor"
                  />
                </svg>
              </Icon>
              AI Agents
            </Link>
          </Button>

          <Button asChild variant="ghost" className="w-full justify-start px-4">
            <Link
              href="#"
              className="flex items-center gap-3 w-full text-slate-700"
            >
              <Icon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zM19.4 19a8 8 0 0 0-14.8 0"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Icon>
              Settings
            </Link>
          </Button>
        </nav>

        <div className="px-6 py-4 border-t">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold">
              AD
            </div>
            <div>
              <div className="text-sm font-medium">Admin</div>
              <div className="text-xs text-slate-500">admin@adn.ai</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Dashboard
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Overview of AI-powered calls and agents
              </p>
            </div>
            <div className="flex items-center gap-3">
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
            </div>
          </div>

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
                  This dashboard helps you oversee live call sessions powered by
                  AI agents. View real-time transcripts, agent availability,
                  call quality metrics, and start new calls directly.
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
                    Available to handle conversations
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
