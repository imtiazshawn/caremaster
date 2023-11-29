import { ReactComponent as Message } from "@assets/message-circle.svg";
import { ReactComponent as ProfileUser } from "@assets/profile-user.svg";
import { ReactComponent as Settings } from "@assets/settings.svg";
import { ReactComponent as TickSquare } from "@assets/tick-square.svg";

import { STAFF_ID_PARAM_KEY } from "@/shared/constants/route";

import { NavLink } from "@/v2/types/navLink";

export const staffNavLinks: (NavLink | "separator" | "spacer")[] = [
  {
    route: `/v2/staff/:${STAFF_ID_PARAM_KEY}/profile`,
    paramKey: STAFF_ID_PARAM_KEY,
    icon: ProfileUser,
    label: "Profile",
  },
  {
    route: `/v2/staff/:${STAFF_ID_PARAM_KEY}/basic`,
    paramKey: STAFF_ID_PARAM_KEY,
    icon: ProfileUser,
    label: "Profile",
    children: [
      {
        route: `/v2/staff/:${STAFF_ID_PARAM_KEY}/basic`,
        paramKey: STAFF_ID_PARAM_KEY,
        icon: TickSquare,
        label: "Basic Info",
      },
      {
        route: `/v2/staff/:${STAFF_ID_PARAM_KEY}/identification`,
        paramKey: STAFF_ID_PARAM_KEY,
        icon: TickSquare,
        label: "Identification",
      },
      {
        route: `/v2/staff/:${STAFF_ID_PARAM_KEY}/background`,
        paramKey: STAFF_ID_PARAM_KEY,
        icon: TickSquare,
        label: "Background",
      },
      {
        route: `/v2/staff/:${STAFF_ID_PARAM_KEY}/council`,
        paramKey: STAFF_ID_PARAM_KEY,
        icon: TickSquare,
        label: "Council",
      },
      {
        route: `/v2/staff/:${STAFF_ID_PARAM_KEY}/others`,
        paramKey: STAFF_ID_PARAM_KEY,
        icon: TickSquare,
        label: "Others",
      },
    ],
  },
  "spacer",
  {
    route: "/v2/help-and-support",
    icon: Message,
    label: "Help and Support",
  },
  {
    route: "/v2/settings",
    icon: Settings,
    label: "Settings",
  },
];
