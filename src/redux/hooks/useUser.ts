import { selectUser } from "@redux/selectors/user";
import { useAppSelector } from "@redux/store";

export const useUser = () => {
  return useAppSelector(selectUser);
};
