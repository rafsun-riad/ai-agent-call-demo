"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallDetails } from "@/hooks/useCallDetails";
import { format } from "date-fns";
import { Copy, Download, Phone, X } from "lucide-react";

interface CallDetailsModalProps {
  callId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CallDetailsModal({
  callId,
  isOpen,
  onClose,
}: CallDetailsModalProps) {
  const { data: call, isLoading, error } = useCallDetails(callId);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "ended":
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            Ended
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "abandoned":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Abandoned</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        showCloseButton={false}
      >
        <div className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">
                {call?.call_start_time
                  ? format(new Date(call.call_start_time), "dd/MM/yyyy HH:mm")
                  : "Loading..."}{" "}
                {call?.call_type === "web_call" ? "web_call" : call?.call_type}
              </DialogTitle>
              {call && (
                <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                  <span>
                    Agent: {call.ai_agent_id.slice(0, 8)}...
                    {call.ai_agent_id.slice(-2)}
                  </span>
                  <span>
                    Call ID: {call._id.slice(0, 8)}...{call._id.slice(-2)}
                  </span>
                  <span>
                    Duration: {formatDuration(call.call_duration_seconds)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-sm text-slate-600">Loading call details...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-600 mb-2">Failed to load call details</p>
              <p className="text-sm text-slate-600">Please try again later</p>
            </div>
          </div>
        )}

        {call && (
          <>
            {/* Call Analysis Section */}
            <Card>
              <CardHeader>
                <CardTitle>Conversation Analysis</CardTitle>
                <CardDescription>
                  Call outcome and status information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Call Successful</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm capitalize">
                      {call.call_finish_reason?.replace(/_/g, " ") ||
                        "Unknown reason"}
                    </span>
                  </div>
                </div>

                {/* Status and Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-1">
                      Status
                    </p>
                    {getStatusBadge(call.call_status)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-1">
                      Direction
                    </p>
                    <p className="text-sm text-slate-900 capitalize">
                      {call.direction}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-1">
                      Type
                    </p>
                    <p className="text-sm text-slate-900">
                      {call.call_type === "phone_call"
                        ? "Phone"
                        : call.call_type === "web_call"
                        ? "Web"
                        : call.call_type}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Tab Navigation and Content */}
            <Tabs defaultValue="transcription" className="flex flex-col flex-1">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transcription">Transcription</TabsTrigger>
                <TabsTrigger value="details">Detail Logs</TabsTrigger>
              </TabsList>

              <TabsContent
                value="transcription"
                className="flex-1 overflow-auto mt-4"
              >
                <div className="space-y-4 pb-4">
                  {call.messages?.length > 0 ? (
                    call.messages.map((message, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium capitalize">
                            {message.role === "agent" ? "Agent" : "User"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-900">
                            {message.content}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-sm text-slate-600 text-center">
                          No transcription available
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value="details"
                className="flex-1 overflow-auto mt-4"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Raw Call Data</CardTitle>
                    <CardDescription>
                      Complete JSON representation of the call object
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-auto">
                      <pre>{JSON.stringify(call, null, 2)}</pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Footer Actions */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex space-x-2">
                {call.recorded_call_audio_url && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Audio
                  </Button>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(call._id)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Call ID
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
