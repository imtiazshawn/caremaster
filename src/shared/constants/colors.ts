import { ENROLLMENT_STATUS } from "$types/serviceUsers";

export * as muiColors from "@mui/material/colors";

export enum COLORS {
  BACKGROUND = "#F7F7FB",
  WHITE = "#FFFFFF",
  TEXT = "#000000",
  ICON_COLOR = "darkgray",
  ICON_ACTIVE_COLOR = "#4F4F50",
  TAB_INACTIVE_COLOR = "#94A3B8",
  BLUE = "#2563EB",
  LIGHT_BLUE = "#3883fc",
  COMPLETED = "#1ba81b",
  INCOMPLETE = "#c1c1c1",
  GREY = "#a2a2a2",
  LIGHT_GREY = "#585858",
  RED = "#990000",
  DARK_RED = "#800000",
  TOPHEADER_BACKGROUND = "#082F3C",
}

export const EnrollmentStatusColors: Record<ENROLLMENT_STATUS, string> = {
  [ENROLLMENT_STATUS.LIVE]: "#4CAF50",
  [ENROLLMENT_STATUS.PRE_ADMISSION]: "#FFC107",
  [ENROLLMENT_STATUS.ARCHIVED]: "#F44336",
  [ENROLLMENT_STATUS.Hospitalized]: "#F44336",
  [ENROLLMENT_STATUS.ON_HOLD]: "#F44336",
  [ENROLLMENT_STATUS.ARCHIVED_PRE_ADMISSION]: "#F44336",
};
