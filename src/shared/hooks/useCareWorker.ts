import { useGetCareWorkerQuery } from "@reducers/api/careWorkers";
import { useCareWorkerId } from "@redux/hooks/useCareWorkerId";

export const useCareWorker = () => {
  const id = useCareWorkerId();
  const { data, ...rest } = useGetCareWorkerQuery(String(id));
  return { careWorker: data, ...rest };
};
