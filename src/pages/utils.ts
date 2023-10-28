import { CareWorker } from "$types/careWorkers";
import { ServiceUser } from "$types/serviceUsers";

import { ColumnWorkersTableUnit } from "./CareWorkers";
import { ServiceUsersTableUnit } from "./ServiceUsers";

export const getServiceUsersTableData = (
  data: ServiceUser[],
): ServiceUsersTableUnit[] => {
  return data.map(
    ({
      id,
      preferred_name,
      name,
      food_allergies,
      medicine_allergies,
      created_at,
      date_of_birth,
      banding,
      gender,
    }) => ({
      id,
      preferred_name,
      name,
      food_allergies,
      medicine_allergies,
      created_at,
      date_of_birth,
      banding,
      gender,
    }),
  );
};

export const getCareWorkersTableData = (
  data: CareWorker[],
): ColumnWorkersTableUnit[] => {
  return data.map(
    ({ id, name, created_at, date_of_birth, mobile, status, role }) => ({
      id,
      name,
      created_at,
      date_of_birth,
      mobile,
      status,
      role,
    }),
  );
};
