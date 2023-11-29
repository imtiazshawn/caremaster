import { STAFF_ID_PARAM_KEY } from "@/shared/constants/route";
import { useParams } from "react-router-dom";

export const useCareWorkerId = () => {
  const { [STAFF_ID_PARAM_KEY]: careWorkerId } = useParams();
  return careWorkerId ? Number(careWorkerId) : null;
};
