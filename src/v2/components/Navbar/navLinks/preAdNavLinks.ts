import { ReactComponent as Message } from "@assets/message-circle.svg";
import { ReactComponent as ProfileUser } from "@assets/profile-user.svg";
import { ReactComponent as TickSquare } from "@assets/tick-square.svg";

import { CLIENT_ID_PARAM_KEY } from "@/shared/constants/route";
import { settingsNavLink } from "@/v2/components/Navbar/navLinks/defaultNavLinks";
import { NavLink } from "@/v2/types/navLink";

export const preAdClientNavLinks: (NavLink | "separator" | "spacer")[] = [
  {
    route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/profile`,
    paramKey: CLIENT_ID_PARAM_KEY,
    icon: ProfileUser,
    label: "Profile",
  },
  {
    route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/risk-assessment`,
    paramKey: CLIENT_ID_PARAM_KEY,
    icon: ProfileUser,
    label: "Risk Assessments",
    children: [
      {
        route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/generic`,
        paramKey: CLIENT_ID_PARAM_KEY,
        icon: TickSquare,
        label: "Generic",
      },
      {
        route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/mca`,
        paramKey: CLIENT_ID_PARAM_KEY,
        icon: TickSquare,
        label: "MCA",
      },
      {
        route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/medicine`,
        paramKey: CLIENT_ID_PARAM_KEY,
        icon: TickSquare,
        label: "Medicine",
      },
    ],
  },
  "spacer",
  {
    route: "/v2/help-and-support",
    icon: Message,
    label: "Help and Support",
  },
  settingsNavLink,
];
