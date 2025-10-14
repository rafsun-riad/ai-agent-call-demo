"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Link as LinkIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

// Mock data for knowledge bases
const mockKnowledgeBases = [
  {
    id: "1",
    name: "Lafarge Surma Cement",
    documentsCount: 3,
    id_display: "68a402...472",
  },
  {
    id: "2",
    name: "MetLife",
    documentsCount: 5,
    id_display: "72b503...583",
  },
];

// Document types
interface Document {
  id: string;
  name: string;
  type: "pdf" | "url";
  size?: string;
  pages?: string;
}

// Mock documents for selected knowledge base
const mockDocuments: Record<string, Document[]> = {
  "1": [
    {
      id: "1",
      name: "FAQ- HMB_Call center.pdf",
      type: "pdf",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "https://www.lafargeholcim.com.bd/contact",
      type: "url",
      pages: "Pages: 1",
    },
    {
      id: "3",
      name: "https://www.lafargeholcim.com.bd/company-profile",
      type: "url",
      pages: "Pages: 1",
    },
  ],
  "2": [
    {
      id: "4",
      name: "MetLife Product Guide.pdf",
      type: "pdf",
      size: "1.8 MB",
    },
    {
      id: "5",
      name: "Claims Process Manual.pdf",
      type: "pdf",
      size: "3.2 MB",
    },
  ],
};

export default function KnowledgeBasePageContent() {
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<
    string | null
  >("1");

  const selectedKB = mockKnowledgeBases.find(
    (kb) => kb.id === selectedKnowledgeBase
  );
  const documents = selectedKnowledgeBase
    ? mockDocuments[selectedKnowledgeBase] || []
    : [];

  const handleDeleteDocument = (documentId: string) => {
    console.log("Delete document:", documentId);
    // TODO: Implement delete functionality
  };

  return (
    <DashboardLayout
      title="Knowledge Base"
      subtitle="Manage your knowledge bases and documents"
    >
      <div className="flex gap-6 h-[calc(100vh-12rem)]">
        {/* Left Side - Knowledge Bases List */}
        <div className="w-80 flex flex-col">
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Knowledge Bases</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {mockKnowledgeBases.map((kb) => (
                  <button
                    key={kb.id}
                    className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 ${
                      selectedKnowledgeBase === kb.id
                        ? "bg-slate-100 border-r-2 border-slate-400"
                        : ""
                    }`}
                    onClick={() => setSelectedKnowledgeBase(kb.id)}
                  >
                    <div className="space-y-1">
                      <div className="font-medium text-slate-900">
                        {kb.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {kb.documentsCount} documents • ID: {kb.id_display}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Knowledge Base Details */}
        <div className="flex-1">
          {selectedKB ? (
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-slate-900">
                      {selectedKB.name}
                    </CardTitle>
                    <p className="text-sm text-slate-600 mt-1">
                      ID: {selectedKB.id_display}
                    </p>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Documents
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0">
                        {doc.type === "pdf" ? (
                          <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                            <FileText className="h-4 w-4 text-red-600" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <LinkIcon className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900 truncate">
                          {doc.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {doc.type === "pdf" ? (
                            <span>application/pdf • {doc.size}</span>
                          ) : (
                            <span>{doc.pages || "URL"}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {documents.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-slate-500">
                      <p className="text-lg font-medium">No documents yet</p>
                      <p className="text-sm mt-1">
                        Add documents to get started with this knowledge base
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-slate-500">
                  <p className="text-lg font-medium">Select a Knowledge Base</p>
                  <p className="text-sm mt-1">
                    Choose a knowledge base from the left to view its details
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
