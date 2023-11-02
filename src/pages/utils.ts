import { CareWorker } from "$types/careWorkers";
import { ServiceUser, ServiceUsersTableUnit } from "$types/serviceUsers";

import { ColumnWorkersTableUnit } from "./CareWorkers";

export const mapServiceUsersTableData = (
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
      address,
      postcode,
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
      address,
      postcode,
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
