import { CLIENT_ID_PARAM_KEY } from "@/shared/constants/route";
import { useParams } from "react-router-dom";

export const useServiceUserId = () => {
  const { [CLIENT_ID_PARAM_KEY]: serviceUserId } = useParams();
  return serviceUserId ? Number(serviceUserId) : null;
};
