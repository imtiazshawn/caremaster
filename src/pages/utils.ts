import { ServiceUser } from "$types/serviceUsers";

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
