import { AppState } from "@redux/store";

export const selectUser = (state: AppState) => state.auth.user;
