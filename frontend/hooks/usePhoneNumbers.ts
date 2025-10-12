import { useQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";

export interface PhoneNumber {
  id: string;
  number: string;
  region?: string;
  provider?: string;
}

export function usePhoneNumbers() {
  const { get } = useApi();

  return useQuery({
    queryKey: ["phone-numbers"],
    queryFn: async () => {
      const response = await get(`/v1/phone-numbers/`);
      // Expecting response.data to be an array or { data: [...] }
      const responseData = response.data;
      if (responseData?.data) return responseData.data as PhoneNumber[];
      return responseData as PhoneNumber[];
    },
  });
}
