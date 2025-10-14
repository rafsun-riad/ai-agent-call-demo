import { useQuery } from "@tanstack/react-query";

export interface KnowledgeBase {
  id: string;
  name: string;
  id_display: string;
  documentsCount?: number;
  created_at?: string;
  updated_at?: string;
}

export interface KnowledgeBasesResponse {
  knowledge_bases: KnowledgeBase[];
  total: number;
}

const fetchKnowledgeBases = async (): Promise<KnowledgeBasesResponse> => {
  const response = await fetch("/api/v2/knowledge-bases/");

  if (!response.ok) {
    throw new Error("Failed to fetch knowledge bases");
  }

  return response.json();
};

export const useKnowledgeBases = () => {
  return useQuery({
    queryKey: ["knowledge-bases"],
    queryFn: fetchKnowledgeBases,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
