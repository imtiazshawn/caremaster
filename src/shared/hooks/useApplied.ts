import { useGetApplicantQuery } from "@reducers/api/applicants";
import { useApplicantId } from "@redux/hooks/useApplicantId";

export const useApplicant = () => {
  const id = useApplicantId();
  const { data, ...rest } = useGetApplicantQuery(String(id));
  return { applicant: data, ...rest };
};
