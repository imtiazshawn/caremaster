import { ApiResponse, ApiResponseArray } from "$types/index";

export type CareWorkerAnswer = {
  answer: string;
  question: number;
  care_worker: number;
};

export type CareWorkerAnswersResponse = ApiResponseArray<CareWorkerAnswer>;
export type CareWorkerAnswerResponse = ApiResponse<CareWorkerAnswer>;

export type CreateCareWorkerAnswers = CareWorkerAnswer;
export type CreateCareWorkerAnswersResponse = ApiResponse<string>;
