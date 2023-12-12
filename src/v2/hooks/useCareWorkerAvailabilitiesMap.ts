import { useGetCareWorkerAvailabilitiesQuery } from "@reducers/api/availability";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";

export const useCareWorkerAvailabilitiesMap = () => {
  const { data: careWorkers } = useGetCareWorkersQuery();
  const { data: availabilities } =
    useGetCareWorkerAvailabilitiesQuery(undefined);

  const careWorkersMap =
    careWorkers?.reduce(
      (acc, careWorker) => {
        acc[careWorker.id!] =
          availabilities?.filter(
            (availability) => availability.careworker === careWorker.id,
          ) ?? [];
        return acc;
      },
      {} as Record<string, any>,
    ) ?? {};

  return careWorkersMap;
};
