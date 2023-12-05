import { TEMPLATE_ID_PARAM_KEY } from "@/shared/constants/route";
import { useParams } from "react-router-dom";

export const useTemplateId = () => {
  const { [TEMPLATE_ID_PARAM_KEY]: id } = useParams();
  return id ? Number(id) : null;
};
