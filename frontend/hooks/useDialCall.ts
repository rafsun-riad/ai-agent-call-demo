import { useMutation } from "@tanstack/react-query";
import { useApi } from "./useApi";

export interface DialCallRequest {
  from_number: string;
  to_number: string;
}

export interface DialCallResponse {
  call_id?: string;
  status?: string;
  message?: string;
  [key: string]: unknown;
}

export function useDialCall() {
  const { post } = useApi();

  return useMutation({
    mutationFn: async (data: DialCallRequest): Promise<DialCallResponse> => {
      const response = await post("/v1/calls/dial-outbound-phone-call", data);
      return response.data as DialCallResponse;
    },
  });
}
