import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";

export const useCareWorkersMap = () => {
  const { data: careWorkers } = useGetCareWorkersQuery();

  const careWorkersMap = careWorkers?.reduce(
    (acc, careWorker) => {
      acc[careWorker.id!] = careWorker;
      return acc;
    },
    {} as Record<string, any>,
  );

  return careWorkersMap;
};
