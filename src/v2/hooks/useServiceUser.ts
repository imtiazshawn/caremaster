import { useGetServiceUserQuery } from "@reducers/api/serviceUsers";
import { useServiceUserId } from "@redux/hooks/useServiceUserId";

export const useServiceUser = () => {
  const id = useServiceUserId();
  const { data, ...rest } = useGetServiceUserQuery(String(id));
  return { serviceUser: data, ...rest };
};
