"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
        className="max-w-[95vw] w-[95vw] min-w-[1200px] max-h-[95vh] overflow-hidden flex flex-col p-0 sm:max-w-[95vw]"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="flex flex-row items-center justify-between px-6 py-4 border-b bg-slate-50/50">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-slate-900">
                {call?.call_start_time
                  ? format(
                      new Date(call.call_start_time),
                      "MMM dd, yyyy • HH:mm"
                    )
                  : "Loading..."}{" "}
                {call?.call_type === "web_call"
                  ? "• Web Call"
                  : call?.call_type
                  ? `• ${call.call_type}`
                  : ""}
              </DialogTitle>
              {call && (
                <div className="flex items-center space-x-6 text-sm text-slate-600 mt-1">
                  <span className="flex items-center space-x-1">
                    <span className="font-medium">Agent:</span>
                    <span>
                      {call.ai_agent_id.slice(0, 8)}...
                      {call.ai_agent_id.slice(-4)}
                    </span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="font-medium">Duration:</span>
                    <span>{formatDuration(call.call_duration_seconds)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="font-medium">ID:</span>
                    <span className="font-mono">
                      {call._id.slice(0, 8)}...{call._id.slice(-4)}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 overflow-y-auto px-6">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading call details...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-red-600 mb-2 font-medium">
                  Failed to load call details
                </p>
                <p className="text-sm text-slate-600">Please try again later</p>
              </div>
            </div>
          )}

          {call && (
            <>
              {/* Post Call Analysis Section */}
              <div className="py-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Post Call Analysis
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Call Summary */}
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center space-x-2">
                        <span className="text-lg">📝</span>
                        <span>call_summary</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-slate-700 leading-relaxed">
                        <p className="mb-3">
                          <strong>Summary:</strong> Summarize the conversation
                          in a{" "}
                          <strong>
                            clear, concise paragraph under 1500 characters
                          </strong>
                          , including:
                        </p>
                        <ul className="space-y-1 text-slate-600 mb-3">
                          <li>
                            • <strong>Purpose of the call</strong> •{" "}
                            <strong>
                              Whether the call was completed or not
                            </strong>{" "}
                            • <strong>Payment status</strong> •{" "}
                            <strong>
                              Date within which they want to make the payment
                            </strong>{" "}
                            • <strong>Any clarifications made</strong> If the
                            call was incomplete...
                          </li>
                        </ul>
                        <div className="mt-4 p-3 bg-slate-50 rounded-lg border">
                          <p className="text-sm text-slate-800">
                            {
                              "The call was incomplete and no valid conversation took place, as the user did not provide any information regarding payment, vehicles, or the purpose of the call."
                            }
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Feedback */}
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center space-x-2">
                        <span className="text-lg">📝</span>
                        <span>customer_feedback</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-slate-700 leading-relaxed">
                        <p className="mb-3 text-slate-600">
                          If there is any customer feedback regarding the
                          service then extract and summarize that feedback
                          within 2 to 3 lines.
                        </p>
                        <div className="mt-4 p-3 bg-slate-50 rounded-lg border">
                          <p className="text-sm text-slate-800">
                            {
                              "There is no customer feedback regarding the service in the provided conversation. The customer has not shared any opinion or experience about the service yet."
                            }
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Call Status Grid */}
                <Card className="border-slate-200 shadow-sm mb-6">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-600">
                          Status
                        </p>
                        {getStatusBadge(call.call_status)}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-600">
                          Direction
                        </p>
                        <p className="text-sm font-medium text-slate-900 capitalize">
                          {call.direction ||
                            "No direction because of the web call."}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-600">
                          Type
                        </p>
                        <p className="text-sm font-medium text-slate-900">
                          {call.call_type === "phone_call"
                            ? "Phone"
                            : call.call_type === "web_call"
                            ? "Web"
                            : call.call_type}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-600">
                          Outcome
                        </p>
                        <p className="text-sm font-medium text-slate-900 capitalize">
                          {call.call_finish_reason?.replace(/_/g, " ") ||
                            "Unknown"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Audio Player Section */}
              {call.recorded_call_audio_url && (
                <Card className="border-slate-200 shadow-sm mb-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center space-x-2">
                      <span className="text-lg">🎵</span>
                      <span>Call Recording</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <audio
                            controls
                            className="w-full h-10"
                            preload="metadata"
                          >
                            <source
                              src={call.recorded_call_audio_url}
                              type="audio/ogg"
                            />
                            <source
                              src={call.recorded_call_audio_url}
                              type="audio/mpeg"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = call.recorded_call_audio_url;
                            link.download = `call-recording-${call._id}.ogg`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          className="h-9 shrink-0"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">
                        File: {call.recorded_call_audio_url}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Main Content Tabs */}
              <Tabs
                defaultValue="transcription"
                className="flex flex-col flex-1 min-h-0"
              >
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger
                    value="transcription"
                    className="text-sm font-medium"
                  >
                    Transcription
                  </TabsTrigger>
                  <TabsTrigger value="details" className="text-sm font-medium">
                    Detail Logs
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="transcription"
                  className="flex-1 min-h-0 mt-0"
                >
                  <Card className="border-slate-200 shadow-sm">
                    <CardContent className="max-h-[400px] overflow-y-auto pt-6">
                      {call.messages?.length > 0 ? (
                        <div className="space-y-4">
                          {call.messages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex ${
                                message.role === "agent"
                                  ? "justify-start"
                                  : "justify-end"
                              }`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                                  message.role === "agent"
                                    ? "bg-blue-50 border border-blue-200"
                                    : "bg-slate-100 border border-slate-200"
                                }`}
                              >
                                <div className="flex items-center space-x-2 mb-1">
                                  <span
                                    className={`text-xs font-semibold uppercase tracking-wide ${
                                      message.role === "agent"
                                        ? "text-blue-700"
                                        : "text-slate-700"
                                    }`}
                                  >
                                    {message.role === "agent"
                                      ? "AI Agent"
                                      : "Caller"}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-900 leading-relaxed">
                                  {message.content}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-32">
                          <div className="text-center">
                            <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Phone className="h-6 w-6 text-slate-400" />
                            </div>
                            <p className="text-slate-600 font-medium">
                              No transcription available
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                              This call may not have been transcribed
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details" className="flex-1 min-h-0 mt-0">
                  <Card className="border-slate-200 shadow-sm">
                    <CardContent className="max-h-[400px] overflow-y-auto pt-6">
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs leading-relaxed">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(call, null, 2)}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>

        {/* Fixed Footer */}
        {call && (
          <div className="flex justify-between items-center px-6 py-4 border-t bg-white">
            <div className="flex space-x-3">
              {/* Audio controls moved to dedicated section above */}
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(call._id)}
                className="h-9"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Call ID
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="h-9"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
