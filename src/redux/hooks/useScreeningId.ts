import { SCREENING_ID_PARAM_KEY } from "@/shared/constants/route";
import { useParams } from "react-router-dom";

export const useScreeningId = () => {
  const { [SCREENING_ID_PARAM_KEY]: screeningId } = useParams();
  return screeningId;
};
