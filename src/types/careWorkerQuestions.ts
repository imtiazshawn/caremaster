import { ApiResponse, ApiResponseArray } from "$types/index";

export type CareWorkerQuestion = {
  id: number;
  question: string;
  section: string;
  created_at: Date;
  updated_at: Date;
};

export type CareWorkerQuestionsResponse = ApiResponseArray<CareWorkerQuestion>;
export type CareWorkerQuestionResponse = ApiResponse<CareWorkerQuestion>;
