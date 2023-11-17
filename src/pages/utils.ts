import { CarePlanTableUnit, CarePlansResponse } from "$types/carePlans";
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
    ({ id, user: { phone, name, email }, created_at, employment_status }) => ({
      id: id!,
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
export const getCarePlanTableData = (
  data: CarePlansResponse["response"]["data"],
): CarePlanTableUnit[] => {
  return data.map(({ id, title, category_name, instruction, updated_at }) => ({
    id: id,
    title,
    instruction,
    updated_at,
    category: category_name,
  }));
};
