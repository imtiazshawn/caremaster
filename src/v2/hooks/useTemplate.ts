import { useGetTemplateQuery } from "@reducers/api/templates";
import { useTemplateId } from "@redux/hooks/useTemplateId";

export const useTemplate = () => {
  const id = useTemplateId();
  const { data, ...rest } = useGetTemplateQuery(id ?? 0);
  return { template: data, ...rest };
};
