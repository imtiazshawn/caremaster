import { useGetCareWorkerQuestionsQuery } from "@reducers/api/careWorkerQuestions";

export const useCareWorkerQuestions = () => {
  const { data: questions, ...rest } = useGetCareWorkerQuestionsQuery(null);
  return { questions, ...rest };
};
