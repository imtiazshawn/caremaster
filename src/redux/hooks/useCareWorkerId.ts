import { useParams } from "react-router-dom";

export const useCareWorkerId = () => {
  const { id: careWorkerId } = useParams<{ id: string }>();

  return Number(careWorkerId);
};
