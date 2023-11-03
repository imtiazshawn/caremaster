import { CareWorkersResponse, CareWorkersTableUnit } from "$types/careWorkers";
import { ServiceUser, ServiceUsersTableUnit } from "$types/serviceUsers";

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
  data: CareWorkersResponse["response"]["data"],
): CareWorkersTableUnit[] => {
  return data.map(
    ({ user: { id, phone, name, email }, created_at, employment_status }) => ({
      id,
      name,
      created_at,
      phone,
      email,
      status: employment_status ?? "",
      // TODO: We have to replace actual role instead of empty string.
      role: "",
    }),
  );
};
