import { useGetCareWorkerQuery } from "@reducers/api/careWorkers";
import { useScreeningId } from "@redux/hooks/useScreeningId";

export const useScreening = () => {
  const id = useScreeningId();
  const { data, ...rest } = useGetCareWorkerQuery(String(id));
  return { screening: data, ...rest };
};
