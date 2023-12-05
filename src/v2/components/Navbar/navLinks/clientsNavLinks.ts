import { CLIENT_ID_PARAM_KEY } from "@/shared/constants/route";
import { settingsNavLink } from "@/v2/components/Navbar/navLinks/defaultNavLinks";
import { NavLink } from "@/v2/types/navLink";
import { ReactComponent as Calendar } from "@assets/calender.svg";
import { ReactComponent as Dashboard } from "@assets/dashboard.svg";
import { ReactComponent as Message } from "@assets/message-circle.svg";
import { ReactComponent as ProfileUser } from "@assets/profile-user.svg";
import { ReactComponent as TickSquare } from "@assets/tick-square.svg";
import { ReactComponent as Training } from "@assets/training.svg";

export const clientNavLinks: (NavLink | "separator" | "spacer")[] = [
  {
    route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/tasks`,
    paramKey: CLIENT_ID_PARAM_KEY,
    icon: TickSquare,
    label: "Tasks",
  },
  {
    route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/basic`,
    paramKey: CLIENT_ID_PARAM_KEY,
    icon: ProfileUser,
    label: "Profile",
    children: [
      {
        route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/basic`,
        paramKey: CLIENT_ID_PARAM_KEY,
        icon: TickSquare,
        label: "Basic",
      },
      {
        route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/identification`,
        paramKey: CLIENT_ID_PARAM_KEY,
        icon: TickSquare,
        label: "Identification",
      },
      {
        route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/background`,
        paramKey: CLIENT_ID_PARAM_KEY,
        icon: TickSquare,
        label: "Background",
      },
      {
        route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/council`,
        paramKey: CLIENT_ID_PARAM_KEY,
        icon: TickSquare,
        label: "Council",
      },
      {
        route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/others`,
        paramKey: CLIENT_ID_PARAM_KEY,
        icon: TickSquare,
        label: "Others",
      },
    ],
  },
  {
    route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/records`,
    paramKey: CLIENT_ID_PARAM_KEY,
    icon: Training,
    label: "Records",
  },
  {
    route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/care-plan`,
    paramKey: CLIENT_ID_PARAM_KEY,
    icon: Dashboard,
    label: "Care Plan",
  },
  {
    route: `/v2/client/:${CLIENT_ID_PARAM_KEY}/rota`,
    paramKey: CLIENT_ID_PARAM_KEY,
    icon: Calendar,
    label: "Rota",
  },
  "spacer",
  {
    route: "/v2/help-and-support",
    icon: Message,
    label: "Help and Support",
  },
  settingsNavLink,
];
