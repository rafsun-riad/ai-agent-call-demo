import { useQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";

export interface PhoneNumber {
  id: string;
  number: string;
  region?: string;
  provider?: string;
  friendly_name?: string;
  raw?: Record<string, unknown>;
}

export function usePhoneNumbers() {
  const { get } = useApi();

  return useQuery({
    queryKey: ["phone-numbers"],
    queryFn: async () => {
      const response = await get(`/v1/phone-numbers/`);
      const responseData = response.data;

      // Normalize common shapes:
      // { phone_numbers: [...] }
      if (
        responseData?.phone_numbers &&
        Array.isArray(responseData.phone_numbers)
      ) {
        type RawPhone = {
          _id?: string;
          id?: string;
          phone_number?: string;
          number?: string;
          sip_infra_region?: string;
          region?: string;
          provider?: string;
          friendly_name?: string;
        };

        return responseData.phone_numbers.map((p: RawPhone) => ({
          id: p._id || p.id || p.phone_number || p.number || "",
          number: p.phone_number || p.number || "",
          region: p.sip_infra_region || p.region,
          provider: p.provider || undefined,
          friendly_name: p.friendly_name || undefined,
          raw: p as Record<string, unknown>,
        })) as PhoneNumber[];
      }

      // { data: [...] }
      if (responseData?.data && Array.isArray(responseData.data)) {
        return responseData.data as PhoneNumber[];
      }

      // If it's already an array
      if (Array.isArray(responseData)) {
        return responseData as PhoneNumber[];
      }

      // Fallback: wrap single object
      if (responseData) {
        return [responseData] as PhoneNumber[];
      }

      return [] as PhoneNumber[];
    },
  });
}
