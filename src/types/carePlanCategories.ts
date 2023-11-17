import { ApiResponse, ApiResponseArray } from "$types/index";

export type CarePlanCategory = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateCarePlanCategory = {
  name: string;
};

export type CarePlanCategoriesResponse = ApiResponseArray<CarePlanCategory>;
export type CarePlanCategoryResponse = ApiResponse<CarePlanCategory>;

export type CreateCarePlanCategoryResponse = ApiResponse<string>;
