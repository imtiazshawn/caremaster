import { useGetServiceUserQuery } from "@reducers/api/serviceUsers";
import { useParams } from "react-router-dom";

export const useServiceUser = () => {
  const id = useParams().id;
  const { data, ...rest } = useGetServiceUserQuery(String(id));
  return { serviceUser: data, ...rest };
};
