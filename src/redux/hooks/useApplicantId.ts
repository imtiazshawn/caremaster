import { APPLICANT_ID_PARAM_KEY } from "@/shared/constants/route";
import { useParams } from "react-router-dom";

export const useApplicantId = () => {
  const { [APPLICANT_ID_PARAM_KEY]: applicantId } = useParams();
  return applicantId;
};
