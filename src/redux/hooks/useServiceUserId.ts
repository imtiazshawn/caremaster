import { useParams } from "react-router-dom";

export const useServiceUserId = () => {
  const { id: serviceUserId } = useParams<{ id: string }>();

  return Number(serviceUserId);
};
